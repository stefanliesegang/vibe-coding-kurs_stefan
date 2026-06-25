/* ==================== GLOBAL STATE ==================== */
let currentUser = null;
let currentPlace = null;
let map = null;
let markers = {};
let allPlaces = [];
let userFavorites = [];
let allRatings = [];

/* ==================== SAMPLE DATA ==================== */
const samplePlaces = [
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
    },
    {
        id: 3,
        name: "Kindermuseum Spielwelt",
        category: "activity",
        lat: 48.1400,
        lng: 11.5850,
        description: "Interaktives Museum für Kinder",
        address: "Ludwigstr. 45, München"
    },
    {
        id: 4,
        name: "Sportclub Fit Familia",
        category: "sport",
        lat: 48.1320,
        lng: 11.5900,
        description: "Fitnesscenter mit Kinderbetreuung",
        address: "Sportweg 10, München"
    },
    {
        id: 5,
        name: "Burger Family",
        category: "restaurant",
        lat: 48.1450,
        lng: 11.5700,
        description: "Burger Restaurant mit großem Spielbereich",
        address: "Zentrum 22, München"
    },
    {
        id: 6,
        name: "Kletterwald Adventure",
        category: "activity",
        lat: 48.1290,
        lng: 11.6050,
        description: "Hochseilgarten für Familien",
        address: "Waldstr. 30, München"
    }
];

/* ==================== INITIALIZATION ==================== */
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    allPlaces = [...samplePlaces];
    loadFromLocalStorage();
    setupEventListeners();
    initializeMap();
    displayFavorites();
}

/* ==================== LOCAL STORAGE ==================== */
function loadFromLocalStorage() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        updateNavBar();
    }

    const favoritesData = localStorage.getItem('userFavorites');
    if (favoritesData) {
        userFavorites = JSON.parse(favoritesData);
    }

    const ratingsData = localStorage.getItem('allRatings');
    if (ratingsData) {
        allRatings = JSON.parse(ratingsData);
    }
}

function saveToLocalStorage() {
    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
    localStorage.setItem('allRatings', JSON.stringify(allRatings));
}

/* ==================== EVENT LISTENERS ==================== */
function setupEventListeners() {
    // Navigation
    document.getElementById('loginBtn').addEventListener('click', openLoginModal);
    
    // Category Filters
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', filterByCategory);
    });

    // Modal controls
    setupModalControls('loginModal');
    setupModalControls('ratingModal');

    // Auth Tabs
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
        btn.addEventListener('click', switchAuthTab);
    });

    // Forms
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('ratingForm').addEventListener('submit', handleRatingSubmit);

    // Info Panel
    document.getElementById('closeInfoBtn').addEventListener('click', closeInfoPanel);

    // Star Rating
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', selectRating);
        star.addEventListener('mouseover', hoverRating);
    });
}

/* ==================== MAP INITIALIZATION ==================== */
function initializeMap() {
    // München Koordinaten
    map = L.map('map-container').setView([48.1351, 11.5820], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // Marker hinzufügen
    allPlaces.forEach(place => {
        addMarkerToMap(place);
    });
}

function addMarkerToMap(place) {
    const icon = getCategoryIcon(place.category);
    
    const marker = L.marker([place.lat, place.lng], {
        title: place.name,
        icon: L.divIcon({
            html: `<div class="map-marker">${icon}</div>`,
            iconSize: [40, 40],
            className: 'custom-marker'
        })
    }).addTo(map);

    marker.on('click', () => showPlaceInfo(place));
    markers[place.id] = marker;
}

function getCategoryIcon(category) {
    const icons = {
        restaurant: '🍽️',
        activity: '🎨',
        sport: '⚽',
        park: '🌳'
    };
    return icons[category] || '📍';
}

/* ==================== PLACE INFO PANEL ==================== */
function showPlaceInfo(place) {
    currentPlace = place;
    const infoPanel = document.querySelector('.info-panel');
    const placeDetails = document.getElementById('place-details');

    // Get ratings for this place
    const placeRatings = allRatings.filter(r => r.placeId === place.id);
    
    let html = `
        <div class="place-info-item">
            <label>📍 Adresse</label>
            <span>${place.address}</span>
        </div>
        <div class="place-info-item">
            <label>ℹ️ Beschreibung</label>
            <span>${place.description}</span>
        </div>
    `;

    if (placeRatings.length > 0) {
        const avgRatings = calculateAverageRatings(placeRatings);
        html += `
            <div class="rating-summary">
                <h4>Durchschnittliche Bewertungen:</h4>
                <div class="age-rating-display">
                    <span>👶 Kleinkind: ${avgRatings.toddler.toFixed(1)} ⭐</span>
                </div>
                <div class="age-rating-display">
                    <span>👧 Kind: ${avgRatings.child.toFixed(1)} ⭐</span>
                </div>
                <div class="age-rating-display">
                    <span>👦 Teenager: ${avgRatings.teen.toFixed(1)} ⭐</span>
                </div>
            </div>
        `;
    }

    const isFavorite = userFavorites.some(f => f.id === place.id);

    html += `
        <div class="action-buttons">
            <button class="btn-secondary" onclick="toggleFavorite(${place.id})">
                ${isFavorite ? '❤️ Favorit' : '🤍 Favorit'}
            </button>
            ${currentUser ? 
                `<button class="btn-primary" onclick="openRatingModal()">⭐ Bewerten</button>` 
                : 
                `<button class="btn-primary" onclick="openLoginModal()">Login</button>`
            }
        </div>
    `;

    placeDetails.innerHTML = html;
    infoPanel.classList.add('active');
}

function closeInfoPanel() {
    document.querySelector('.info-panel').classList.remove('active');
}

function calculateAverageRatings(ratings) {
    const avg = {
        toddler: 0,
        child: 0,
        teen: 0
    };

    if (ratings.length === 0) return avg;

    ratings.forEach(rating => {
        avg.toddler += rating.toddlerRating || 0;
        avg.child += rating.childRating || 0;
        avg.teen += rating.teenRating || 0;
    });

    avg.toddler /= ratings.length;
    avg.child /= ratings.length;
    avg.teen /= ratings.length;

    return avg;
}

/* ==================== CATEGORY FILTER ==================== */
function filterByCategory(e) {
    const category = e.target.dataset.category;
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');

    // Filter markers
    Object.keys(markers).forEach(placeId => {
        const place = allPlaces.find(p => p.id === parseInt(placeId));
        if (category === 'all' || place.category === category) {
            markers[placeId].setOpacity(1);
        } else {
            markers[placeId].setOpacity(0.3);
        }
    });
}

/* ==================== FAVORITES ==================== */
function toggleFavorite(placeId) {
    if (!currentUser) {
        openLoginModal();
        return;
    }

    const place = allPlaces.find(p => p.id === placeId);
    const index = userFavorites.findIndex(f => f.id === placeId);

    if (index > -1) {
        userFavorites.splice(index, 1);
    } else {
        userFavorites.push(place);
    }

    saveToLocalStorage();
    
    // Update UI
    if (currentPlace && currentPlace.id === placeId) {
        showPlaceInfo(currentPlace);
    }
    displayFavorites();
}

function displayFavorites() {
    const favoritesList = document.getElementById('favorites-list');

    if (userFavorites.length === 0) {
        favoritesList.innerHTML = '<div class="empty-favorites">Noch keine Favoriten gespeichert. Füge einen Ort hinzu!</div>';
        return;
    }

    favoritesList.innerHTML = userFavorites.map(place => `
        <div class="favorite-card">
            <h3>${getCategoryIcon(place.category)} ${place.name}</h3>
            <span class="category-tag">${place.category}</span>
            <p>${place.description}</p>
            <small>${place.address}</small>
            <div style="margin-top: 1rem;">
                <button class="btn-secondary" onclick="removeFavorite(${place.id})" style="width: 100%;">Entfernen</button>
            </div>
        </div>
    `).join('');
}

function removeFavorite(placeId) {
    userFavorites = userFavorites.filter(f => f.id !== placeId);
    saveToLocalStorage();
    displayFavorites();
}

/* ==================== AUTHENTICATION ==================== */
function openLoginModal() {
    if (currentUser) {
        // Logout
        currentUser = null;
        localStorage.removeItem('currentUser');
        updateNavBar();
        alert('Du wurdest abgemeldet!');
        return;
    }
    
    document.getElementById('loginModal').classList.add('active');
}

function switchAuthTab(e) {
    const tab = e.target.dataset.tab;
    
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.auth-tab-content').forEach(content => {
        content.classList.remove('active');
    });

    e.target.classList.add('active');
    document.getElementById(`${tab}-tab`).classList.add('active');
}

function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    // Simulate login (in real app, send to backend)
    currentUser = {
        id: Date.now(),
        email: email,
        name: email.split('@')[0]
    };

    saveToLocalStorage();
    updateNavBar();
    document.getElementById('loginModal').classList.remove('active');
    alert(`Willkommen ${currentUser.name}!`);
    form.reset();
}

function handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;

    currentUser = {
        id: Date.now(),
        email: email,
        name: name
    };

    saveToLocalStorage();
    updateNavBar();
    document.getElementById('loginModal').classList.remove('active');
    alert(`Willkommen ${name}! Dein Konto wurde erstellt.`);
    form.reset();
}

function updateNavBar() {
    const loginBtn = document.getElementById('loginBtn');
    
    if (currentUser) {
        loginBtn.textContent = `👤 ${currentUser.name} (Logout)`;
    } else {
        loginBtn.textContent = 'Login';
    }
}

/* ==================== RATING SYSTEM ==================== */
function openRatingModal() {
    if (!currentUser) {
        openLoginModal();
        return;
    }

    if (!currentPlace) return;

    document.getElementById('rating-place-name').textContent = currentPlace.name;
    document.getElementById('ratingModal').classList.add('active');
    document.getElementById('ratingForm').reset();
    
    // Reset star ratings
    document.querySelectorAll('.star').forEach(star => {
        star.classList.remove('active');
    });
}

let selectedRatings = {
    toddler: 0,
    child: 0,
    teen: 0
};

function selectRating(e) {
    const star = e.target;
    const rating = parseInt(star.dataset.rating);
    const parent = star.parentElement;
    const ageGroup = parent.parentElement.parentElement;
    
    let ageType;
    if (ageGroup.querySelector('label').textContent.includes('Kleinkind')) {
        ageType = 'toddler';
    } else if (ageGroup.querySelector('label').textContent.includes('Kind')) {
        ageType = 'child';
    } else {
        ageType = 'teen';
    }

    selectedRatings[ageType] = rating;

    // Update visual
    parent.querySelectorAll('.star').forEach((s, index) => {
        if (index < rating) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });

    ageGroup.querySelector('input[type="hidden"]').value = rating;
}

function hoverRating(e) {
    const rating = parseInt(e.target.dataset.rating);
    const parent = e.target.parentElement;

    parent.querySelectorAll('.star').forEach((star, index) => {
        if (index < rating) {
            star.style.opacity = '1';
        } else {
            star.style.opacity = '0.3';
        }
    });
}

function handleRatingSubmit(e) {
    e.preventDefault();

    const comment = document.getElementById('comment').value;

    const newRating = {
        id: Date.now(),
        placeId: currentPlace.id,
        userId: currentUser.id,
        userName: currentUser.name,
        toddlerRating: selectedRatings.toddler,
        childRating: selectedRatings.child,
        teenRating: selectedRatings.teen,
        comment: comment,
        timestamp: new Date().toISOString()
    };

    allRatings.push(newRating);
    saveToLocalStorage();

    alert('Danke für deine Bewertung!');
    document.getElementById('ratingModal').classList.remove('active');

    // Refresh place info
    if (currentPlace) {
        showPlaceInfo(currentPlace);
    }
}

/* ==================== MODAL CONTROLS ==================== */
function setupModalControls(modalId) {
    const modal = document.getElementById(modalId);
    const closeBtn = modal.querySelector('.close-modal');

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

/* ==================== STYLING FOR MARKERS ==================== */
const style = document.createElement('style');
style.textContent = `
    .custom-marker {
        background: none !important;
        border: none !important;
        display: flex;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
    }

    .map-marker {
        font-size: 32px;
        animation: bounce 0.6s ease;
    }

    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    .leaflet-marker-icon {
        background-color: transparent !important;
    }
`;
document.head.appendChild(style);
