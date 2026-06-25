# 🎉 FamilyPlaces - Familienfreundliche Orte & Aktivitäten

Eine bunte und interaktive Webseite zum Entdecken und Bewerten familienfreundlicher Orte wie Restaurants, Parks, Aktivitäten und Sportmöglichkeiten.

## 🌟 Features

### 🗺️ Interaktive Karte
- Eingebunden mit OpenStreetMap (Leaflet)
- Bunte Emoji-Marker für verschiedene Kategorien
- Zoomen und Pannen auf der Karte
- Automatische Zentrierung auf München

### 👨‍👩‍👧‍👦 Altersgerechte Bewertungen
- **👶 Kleinkind (1-5 Jahre)**
- **👧 Kind (6-13 Jahre)**
- **👦 Teenager (14+ Jahre)**

Jede Altersgruppe kann separat bewertet werden, um zu zeigen, wie gut der Ort für diese Gruppe geeignet ist.

### 🏷️ Kategorien
- 🍽️ **Restaurants** - Familienfreundliche Essplätze
- 🎨 **Aktivitäten** - Museen, Spielplätze, Workshops
- ⚽ **Sport** - Fitnesscenter, Sportkurse, Trainingsmöglichkeiten
- 🌳 **Parks** - Grünflächen, Wanderwege, Picknickplätze

### ❤️ Favoriten System
- Speichere deine Lieblingsorte
- Persönliche Favoritenliste pro Benutzer
- Mit Login verknüpft

### ⭐ Bewertungssystem
- Jeder angemeldete Nutzer kann Bewertungen hinterlassen
- Separate Ratings für jede Altersgruppe
- Optionale Kommentare
- Alle Bewertungen sichtbar für alle Nutzer
- Durchschnittsbewertungen angezeigt

### 👤 Benutzerautentifizierung
- **Registrierung** mit Name, Email und Passwort
- **Login** für bestehende Benutzer
- Local Storage für schnellen Zugriff
- Logout Funktionalität

### 🎨 Design Features
- **Buntes, fröhliches Design** mit Gradienten
- Responsive auf Desktop und Mobilgeräten
- Smooth Animationen und Übergänge
- Benutzerfreundliche Modals für Login und Bewertung
- Touch-freundliche Bedienung

## 📁 Projektstruktur

```
.
├── family-places.html           # Hauptseite
├── family-places-styles.css     # CSS Styling (bunte Farben)
├── family-places-app.js         # Frontend JavaScript (LocalStorage)
├── server.js                    # Backend (Express.js)
├── package.json                 # NPM Dependencies
└── FAMILY_PLACES_README.md      # Diese Datei
```

## 🚀 Installation & Start

### Frontend (mit LocalStorage)
Öffne einfach `family-places.html` im Browser. Alle Daten werden lokal gespeichert.

### Backend Setup (Optional, für echte DB)

1. **Node.js installieren** (von nodejs.org)

2. **Dependencies installieren:**
```bash
npm install
```

3. **Backend starten:**
```bash
npm start
```
Der Server läuft dann auf `http://localhost:3000`

4. **Öffne im Browser:**
```
http://localhost:3000/family-places.html
```

## 🎯 Verwendung

### 1️⃣ Erste Schritte
- Öffne die Webseite
- Schau dir die Karte an
- Klick auf Marker um Details zu sehen

### 2️⃣ Login/Registrierung
- Klick auf "Login" Button oben rechts
- Wechsel zwischen Login und Registrierung
- Erstelle dein Konto oder melde dich an

### 3️⃣ Favoriten
- Klick das Herz-Icon bei einem Ort um ihn zu favorisieren
- Alle Favoriten erscheinen im "Favoriten" Bereich
- Nur für angemeldete Benutzer sichtbar

### 4️⃣ Bewertungen
- Klick "⭐ Bewerten" bei einem Ort
- Bewerte für jede Altersgruppe getrennt (1-5 Sterne)
- Schreib optional einen Kommentar
- Absenden - deine Bewertung wird sofort sichtbar

### 5️⃣ Filter
- Nutze die Kategoriebuttons zum Filtern
- Nur relevante Marker werden hervorgehoben

## 🛠️ API Endpoints (Backend)

### Authentifizierung
- `POST /api/auth/register` - Neue Benutzer registrieren
- `POST /api/auth/login` - Benutzer anmelden

### Orte
- `GET /api/places` - Alle Orte abrufen
- `GET /api/places/:id` - Spezifischer Ort
- `POST /api/places` - Neuen Ort hinzufügen (Admin)

### Bewertungen
- `GET /api/ratings/place/:placeId` - Bewertungen für einen Ort
- `GET /api/ratings/average/:placeId` - Durchschnittsbewertungen
- `POST /api/ratings` - Neue Bewertung hinzufügen
- `GET /api/favorites` - Meine Favoriten

## 🎨 Farben & Design

Das Design nutzt freundliche, bunte Farben:
- **Pink** (#FF6B9D) - Primärfarbe
- **Blau** (#4A90E2) - Sekundärfarbe
- **Grün** (#7ED321) - Akzent
- **Gelb** (#FFC107) - Hervorhebung
- **Lila** (#9B59B6) - Gradients

## 💾 Datenspeicherung

### LocalStorage Version (Standard)
- Alle Daten werden im Browser gespeichert
- Funktioniert offline
- Daten gehen verloren wenn Cache gelöscht wird

### Backend Version (mit server.js)
- Daten werden auf dem Server gespeichert
- Persistieren über Browserneustart
- Mehrere Geräte können die gleichen Daten sehen

## 🗺️ Karte

Die Webseite nutzt **OpenStreetMap** mit **Leaflet.js**:
- Kostenlos und Open Source
- Keine API Keys erforderlich
- Offline möglich
- Schnelle Performance

## 📱 Responsive Design

Die Seite funktioniert auf:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (< 768px)

## 🔒 Sicherheit

Beachte für Production:
- Nutze **bcrypt** statt Base64 für Passwörter
- HTTPS aktivieren
- CORS konfigurieren
- Rate Limiting hinzufügen
- Input Validierung verstärken
- Database wie MongoDB verwenden

## 🐛 Bekannte Limitationen

- Passwörter werden mit Base64 gehashed (nur für Demo)
- Keine echte Datenbankverbindung im Frontend-Mode
- Keine Email-Verifikation
- Keine Admin-Funktionen für Ortsverwaltung

## 🚀 Zukünftige Features

- [ ] Google Maps Integration
- [ ] Suchfunktion
- [ ] Filterung nach Altersgruppe
- [ ] Standortverfolgung (GPS)
- [ ] Fotos von Nutzern hinzufügen
- [ ] Social Sharing
- [ ] Admin-Dashboard
- [ ] Email-Benachrichtigungen

## 📝 Lizenz

MIT

## 👨‍💻 Autor

Stefan - Vibe Coding Kurs 2026

---

**Viel Spaß beim Erkunden familienfreundlicher Orte! 🎉🏠**
