# 🎮 FamilyPlaces - Benutzungs Cheat Sheet

## ⚡ Schnelle Kommandos & Tipps

---

## 🚀 STARTEN

| Aktion | Wie | Dauer |
|--------|-----|-------|
| **Frontend öffnen** | Doppelklick `family-places.html` | 2s |
| **Backend starten** | `npm install` dann `npm start` | 30s |
| **Auf Server öffnen** | Browser: `http://localhost:3000` | 5s |

---

## 🗺️ KARTE BEDIENEN

| Aktion | Wie |
|--------|-----|
| **Zoomen (rein)** | Scroll ⬆️ mit Mouse-Wheel |
| **Zoomen (raus)** | Scroll ⬇️ mit Mouse-Wheel |
| **Verschieben** | Klick + Drag mit Maus |
| **Ort anklicken** | Klick auf Emoji-Marker |
| **Info schließen** | Klick ✕ oder außerhalb Panel |
| **Auf München zentrieren** | Öffne Seite neu |

---

## 👤 BENUTZER

| Aktion | Schritte |
|--------|----------|
| **Registrieren** | 1. [Login] → 2. [Registrieren] → 3. Felder ausfüllen → 4. [Registrieren] |
| **Anmelden** | 1. [Login] → 2. Email+Pass → 3. [Login] |
| **Abmelden** | Klick auf dein Name oben rechts → Logout |
| **Daten anschauen** | Browser F12 → Application → LocalStorage |

---

## ⭐ BEWERTUNGEN ABGEBEN

```
1. Klick Marker auf Karte
2. Info-Panel öffnet sich
3. Klick [⭐ Bewerten]
4. Rating Modal öffnet sich

Nun für jede Altersgruppe:
  - Klick auf Sterne (1-5)
  - ⭐ wird gelb = aktiv

5. (Optional) Schreib Kommentar
6. Klick [Bewertung absenden]
7. ✅ Fertig! Seite aktualisiert
```

**Stern-Bedeutung:**
- ⭐ = Sehr ungeeignet
- ⭐⭐ = Wenig geeignet
- ⭐⭐⭐ = Okay
- ⭐⭐⭐⭐ = Gut geeignet
- ⭐⭐⭐⭐⭐ = Perfekt geeignet

---

## ❤️ FAVORITEN VERWALTEN

| Aktion | Wie |
|--------|-----|
| **Zu Favoriten** | 1. Klick Marker → 2. [🤍 Favorit] → wird zu [❤️ Favorit] |
| **Favorit entfernen** | 1. [❤️ Favorit] oder 2. Favoriten-Sektion → [Entfernen] |
| **Alle Favoriten sehen** | Scroll zu "❤️ MEINE FAVORITEN" |
| **Favorit öffnen in Karte** | Klick auf Favorit-Karte |

---

## 🏷️ KATEGORIEN FILTERN

```
Klick auf einen Button:

[Alle]      ← Alle Orte sichtbar
[🍽️ Rests] ← Nur Restaurants
[🎨 Akt]   ← Nur Aktivitäten
[⚽ Sport]  ← Nur Sport
[🌳 Parks]  ← Nur Parks

Nicht geklickte Marker werden grau = weniger Fokus
```

---

## 📍 MARKER TYPEN

| Emoji | Kategorie | Beispiel |
|-------|-----------|----------|
| 🍽️ | Restaurant | Pizza Luigi, Burger Family |
| 🎨 | Aktivität | Kindermuseum, Spielplatz |
| ⚽ | Sport | Fitnesscenter, Fußballplatz |
| 🌳 | Park | Stadtpark, Grünfläche |

---

## 🔄 BEWERTUNGEN SEHEN

```
1. Klick einen Marker
2. Info-Panel öffnet sich
3. Scroll nach unten

Du siehst:
- Durchschnittsbewertungen
- Einzelne Bewertungen von anderen
  ├─ Name des Bewerters
  ├─ Ratings pro Altersgruppe
  └─ Kommentar (falls vorhanden)
```

---

## 🛠️ CODE ÄNDERUNGEN

### Neue Orte hinzufügen

**Datei:** `family-places-app.js` (Zeile ~35)

```javascript
const samplePlaces = [
    {
        id: 1,
        name: "Dein Ort Name",
        category: "restaurant",  // restaurant, activity, sport, park
        lat: 48.1351,            // Breitengrad
        lng: 11.5820,            // Längengrad
        description: "Beschreibung hier",
        address: "Adresse hier"
    },
    // ... mehr Orte hier
];
```

**Koordinaten finden:**
1. Öffne https://maps.google.com
2. Such deinen Ort
3. Rechtsklick → Koordinaten kopiert!
4. Einfügen in Code

### Farben ändern

**Datei:** `family-places-styles.css` (Zeile ~10-16)

```css
:root {
    --primary-pink: #FF6B9D;        /* Ändere diese Farbe */
    --primary-blue: #4A90E2;        /* Oder diese */
    --primary-green: #7ED321;       /* Oder diese */
    --primary-yellow: #FFC107;
    --primary-purple: #9B59B6;
}
```

**Farben finder:** https://htmlcolorcodes.com

### Text ändern

**Datei:** `family-places.html`

```html
<h1>Meine eigene Überschrift</h1>
<p>Mein eigener Text</p>
```

### Karte auf andere Stadt

**Datei:** `family-places-app.js` (Zeile ~120)

```javascript
// München ändern:
map = L.map('map-container').setView([48.1351, 11.5820], 13);
                                       ^^^^^^^^  ^^^^^^^
                                      Breitengrad Längengrad

// Beliebige Stadt einsetzen:
// Berlin: [52.5200, 13.4050]
// Hamburg: [53.5511, 10.0194]
// Köln: [50.9365, 6.9589]
// Frankfurt: [50.1109, 8.6821]
```

---

## 🐛 FEHLER BEHEBEN

### Browser Console öffnen
```
Windows: F12 oder Ctrl+Shift+J
Mac: Cmd+Option+J
```

### Häufige Fehler

| Fehler | Ursache | Lösung |
|--------|--------|--------|
| Karte zeigt nichts | Keine Internet | Verbinde dich mit Internet |
| Marker nicht sichtbar | Zoom falsch | Scroll zum Zoomen |
| Login funktioniert nicht | Feld leer | Alle Felder ausfüllen |
| LocalStorage leer | Browser Cache | F12 → Application → Clear |
| Server läuft nicht | Port 3000 belegt | `npm start` mit Fehler? Anderen Port nutzen: `$env:PORT = 8000; npm start` |

---

## 📊 DATENANSICHT (Browser DevTools)

### LocalStorage anschauen

```
F12 → Application Tab → LocalStorage → http://localhost (oder deine URL)

Du siehst:
- currentUser
- userFavorites  
- allRatings
```

### JSON ansehen

```
Rechtsklick auf Wert → Copy as JSON
In Editor einfügen → Formatiert anschauen
```

---

## 🎯 TIPPS & TRICKS

### Schneller testen

1. **Mehrere Browser öffnen**
   - Account 1 in Chrome
   - Account 2 in Firefox
   - Vorteil: Test Login & Bewertungen parallel

2. **DevTools für schnellenTest**
   - F12 öffnen → Console
   - Befehle eingeben: `localStorage.clear()`
   - Alles zurückgesetzt!

3. **Offline testen (nur Frontend)**
   - Internet trennen
   - family-places.html funktioniert noch!
   - (Nur Karte lädt nicht wegen OpenStreetMap)

4. **Local Spiegel erstellen**
   ```bash
   # Kopiere kompletten Ordner
   # Test mit verschiedenen Änderungen
   # Hast du 2 Versionen zum Vergleichen
   ```

---

## ⌨️ TASTATUR SHORTCUTS

| Taste | Effekt |
|-------|--------|
| **F5** | Seite neu laden |
| **F12** | Developer Tools öffnen |
| **Ctrl+Shift+Delete** | Browser Cache löschen |
| **Escape** | Modal schließen |

---

## 🚀 SCHNELLE COMMANDS

### Terminal (PowerShell)

```powershell
# Backend starten
npm start

# Dependencies installieren
npm install

# Bestimmten Port nutzen
$env:PORT = 8000; npm start

# Seite im Browser öffnen
start http://localhost:3000
```

### Git Commands

```bash
# Alle Änderungen committen
git add .
git commit -m "Meine Änderungen"

# Auf GitHub pushen
git push origin main

# Status anschauen
git status

# Letzte Commits anschauen
git log --oneline
```

---

## 📱 MOBILE TIPPS

### Auf Handy testen

```
1. Öffne Terminal
2. Starte: npm start
3. Finde IP-Adresse: ipconfig
   (Suche nach IPv4 Address, z.B. 192.168.x.x)
4. Im Handy-Browser öffnen:
   http://192.168.x.x:3000/family-places.html
5. Teste auf Mobile!
```

### Touch-Gesten

| Geste | Effekt |
|-------|--------|
| **Tippen** | Klick |
| **Zwei-Finger-Pinch** | Zoom |
| **Drag** | Karte verschieben |
| **Doppel-Tap** | Zoom in |

---

## 🎓 LERNEN AUS CODE

### Wichtige JavaScript Funktionen

```javascript
// Benutzer-Login
handleLogin()          // Seite: family-places-app.js ~200

// Ort zu Favoriten
toggleFavorite()       // Seite: family-places-app.js ~350

// Bewertung absenden
handleRatingSubmit()   // Seite: family-places-app.js ~420

// Marker auf Karte
addMarkerToMap()       // Seite: family-places-app.js ~150

// LocalStorage speichern
saveToLocalStorage()   // Seite: family-places-app.js ~80
```

### Wichtige CSS Klassen

```css
/* Navigation */
.navbar { ... }
.nav-links { ... }

/* Karte */
.map-section { ... }
.info-panel { ... }

/* Buttons */
.btn-primary { ... }
.btn-secondary { ... }

/* Favoriten */
.favorite-card { ... }
.favorites-grid { ... }
```

---

## 🔗 LINKS

| Ressource | URL |
|-----------|-----|
| **HTML Referenz** | https://developer.mozilla.org/en-US/docs/Web/HTML |
| **CSS Referenz** | https://developer.mozilla.org/en-US/docs/Web/CSS |
| **JavaScript** | https://developer.mozilla.org/en-US/docs/Web/JavaScript |
| **Leaflet Docs** | https://leafletjs.com/ |
| **OpenStreetMap** | https://www.openstreetmap.org/ |
| **Koordinaten Finder** | https://maps.google.com |
| **Farben Picker** | https://htmlcolorcodes.com |

---

## 🎯 HÄUFIGE AUFGABEN (Schnell-Referenz)

| Aufgabe | Datei | Zeile | Was ändern |
|---------|-------|-------|-----------|
| Orte hinzufügen | family-places-app.js | ~35 | samplePlaces Array |
| Farben ändern | family-places-styles.css | ~10 | :root Variablen |
| Karte Position | family-places-app.js | ~120 | setView() Koordinaten |
| Überschrift ändern | family-places.html | ~28 | `<h1>` Text |
| Navigation ändern | family-places.html | ~15 | `<a>` Links |
| kategorien filttern | family-places-app.js | ~300 | filterByCategory() |

---

<div align="center">

## 🎉 SCHNELL REFERENZIEREN!

**Druck diesen Cheat Sheet aus oder speichere ihn lokal!**

---

**Noch Fragen? Siehe: QUICKSTART.md oder INDEX.md**

</div>
