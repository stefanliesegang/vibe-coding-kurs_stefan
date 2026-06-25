/* ==================== FAMILY PLACES BACKEND ==================== */
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Data files
const USERS_FILE = 'data/users.json';
const PLACES_FILE = 'data/places.json';
const RATINGS_FILE = 'data/ratings.json';

// Initialize data files
function initializeDataFiles() {
    if (!fs.existsSync('data')) {
        fs.mkdirSync('data');
    }

    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, JSON.stringify([]));
    }

    if (!fs.existsSync(PLACES_FILE)) {
        const places = [
            {
                id: 1,
                name: "Stadtpark Grün",
                category: "park",
                lat: 48.1351,
                lng: 11.5820,
                description: "Großer Park mit Spielplatz, Wiese und Bächen",
                address: "Parkweg 5, München"
            },
            {
                id: 2,
                name: "Pizza Luigi",
                category: "restaurant",
                lat: 48.1372,
                lng: 11.5755,
                description: "Familienfreundliche italienische Pizzeria",
                address: "Marienplatz 1, München"
            }
        ];
        fs.writeFileSync(PLACES_FILE, JSON.stringify(places, null, 2));
    }

    if (!fs.existsSync(RATINGS_FILE)) {
        fs.writeFileSync(RATINGS_FILE, JSON.stringify([]));
    }
}

// Helper functions
function readJSON(file) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJSON(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

/* ==================== USER ROUTES ==================== */

// Register
app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, Email und Passwort erforderlich' });
    }

    const users = readJSON(USERS_FILE);

    if (users.find(u => u.email === email)) {
        return res.status(409).json({ error: 'Email bereits registriert' });
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password: hashPassword(password),
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeJSON(USERS_FILE, users);

    res.json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser.id)
    });
});

// Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    const users = readJSON(USERS_FILE);
    const user = users.find(u => u.email === email);

    if (!user || !verifyPassword(password, user.password)) {
        return res.status(401).json({ error: 'Email oder Passwort falsch' });
    }

    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id)
    });
});

/* ==================== PLACE ROUTES ==================== */

// Get all places
app.get('/api/places', (req, res) => {
    const places = readJSON(PLACES_FILE);
    res.json(places);
});

// Get place by ID
app.get('/api/places/:id', (req, res) => {
    const places = readJSON(PLACES_FILE);
    const place = places.find(p => p.id === parseInt(req.params.id));

    if (!place) {
        return res.status(404).json({ error: 'Ort nicht gefunden' });
    }

    res.json(place);
});

// Add new place (admin)
app.post('/api/places', authenticate, (req, res) => {
    const { name, category, lat, lng, description, address } = req.body;

    if (!name || !category || lat === undefined || lng === undefined) {
        return res.status(400).json({ error: 'Erforderliche Felder fehlen' });
    }

    const places = readJSON(PLACES_FILE);
    const newPlace = {
        id: places.length > 0 ? Math.max(...places.map(p => p.id)) + 1 : 1,
        name,
        category,
        lat,
        lng,
        description,
        address,
        createdBy: req.userId,
        createdAt: new Date().toISOString()
    };

    places.push(newPlace);
    writeJSON(PLACES_FILE, places);

    res.status(201).json(newPlace);
});

/* ==================== RATING ROUTES ==================== */

// Get all ratings for a place
app.get('/api/ratings/place/:placeId', (req, res) => {
    const ratings = readJSON(RATINGS_FILE);
    const placeRatings = ratings.filter(r => r.placeId === parseInt(req.params.placeId));
    res.json(placeRatings);
});

// Get user favorites
app.get('/api/favorites', authenticate, (req, res) => {
    const ratings = readJSON(RATINGS_FILE);
    const places = readJSON(PLACES_FILE);
    
    // Get favorites (marked with isFavorite = true)
    const favorites = ratings
        .filter(r => r.userId === req.userId && r.isFavorite)
        .map(r => places.find(p => p.id === r.placeId))
        .filter(p => p);

    res.json(favorites);
});

// Add rating
app.post('/api/ratings', authenticate, (req, res) => {
    const { placeId, toddlerRating, childRating, teenRating, comment, isFavorite } = req.body;

    if (!placeId) {
        return res.status(400).json({ error: 'placeId erforderlich' });
    }

    const ratings = readJSON(RATINGS_FILE);
    const users = readJSON(USERS_FILE);
    const user = users.find(u => u.id === req.userId);

    const newRating = {
        id: Date.now(),
        placeId,
        userId: req.userId,
        userName: user.name,
        toddlerRating: toddlerRating || 0,
        childRating: childRating || 0,
        teenRating: teenRating || 0,
        comment: comment || '',
        isFavorite: isFavorite || false,
        timestamp: new Date().toISOString()
    };

    ratings.push(newRating);
    writeJSON(RATINGS_FILE, ratings);

    res.status(201).json(newRating);
});

// Get average ratings for place
app.get('/api/ratings/average/:placeId', (req, res) => {
    const ratings = readJSON(RATINGS_FILE);
    const placeRatings = ratings.filter(r => r.placeId === parseInt(req.params.placeId));

    if (placeRatings.length === 0) {
        return res.json({
            toddlerRating: 0,
            childRating: 0,
            teenRating: 0,
            count: 0
        });
    }

    const avg = {
        toddlerRating: placeRatings.reduce((sum, r) => sum + (r.toddlerRating || 0), 0) / placeRatings.length,
        childRating: placeRatings.reduce((sum, r) => sum + (r.childRating || 0), 0) / placeRatings.length,
        teenRating: placeRatings.reduce((sum, r) => sum + (r.teenRating || 0), 0) / placeRatings.length,
        count: placeRatings.length
    };

    res.json(avg);
});

/* ==================== AUTHENTICATION MIDDLEWARE ==================== */
function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token erforderlich' });
    }

    try {
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
        req.userId = decoded.userId;
        next();
    } catch {
        res.status(401).json({ error: 'Token ungültig' });
    }
}

/* ==================== HELPER FUNCTIONS ==================== */
function hashPassword(password) {
    // In production use bcrypt!
    return Buffer.from(password).toString('base64');
}

function verifyPassword(password, hash) {
    return hashPassword(password) === hash;
}

function generateToken(userId) {
    return Buffer.from(JSON.stringify({ userId })).toString('base64');
}

/* ==================== SERVER START ==================== */
const PORT = process.env.PORT || 3000;

initializeDataFiles();

app.listen(PORT, () => {
    console.log(`🎉 FamilyPlaces Server läuft auf http://localhost:${PORT}`);
});
