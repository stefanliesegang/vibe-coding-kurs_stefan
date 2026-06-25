# 🚀 FamilyPlaces - Installationsanleitung

## Option 1: Einfach nur Frontend (Empfohlen für Anfänger)

### ✅ Das reicht aus!
- Öffne einfach `family-places.html` im Browser
- Alles funktioniert sofort
- Daten werden lokal im Browser gespeichert

### 💡 Vorteile
- Keine Installation nötig
- Funktioniert offline
- Sofort einsatzbereit

### ⚠️ Nachteile
- Daten nur auf diesem Computer
- Daten gehen verloren bei Browser Cache löschen

---

## Option 2: Mit Backend Server (Für echte Datenspeicherung)

### Schritt 1: Node.js installieren

1. Gehe zu https://nodejs.org/
2. Lade die LTS Version herunter
3. Installiere sie (Standard-Einstellungen)
4. Öffne PowerShell und prüfe die Installation:

```powershell
node --version
npm --version
```

### Schritt 2: Projekt vorbereiten

1. Öffne PowerShell im Projektordner
2. Installiere die erforderlichen Packages:

```powershell
npm install
```

Das erstellt einen `node_modules` Ordner und `package-lock.json`

### Schritt 3: Backend starten

```powershell
npm start
```

Du solltest sehen:
```
🎉 FamilyPlaces Server läuft auf http://localhost:3000
```

### Schritt 4: Im Browser öffnen

Öffne diese URL im Browser:
```
http://localhost:3000/family-places.html
```

### 🎉 Fertig!

Der Server läuft jetzt und speichert alle Daten persistent!

---

## 🛑 Server stoppen

Drücke in der PowerShell: `Ctrl + C`

---

## 🔄 Neuen Terminal um anderen Code zu schreiben

Während der Server läuft, kannst du einen **neuen PowerShell Terminal öffnen**:

1. In VS Code: Klick `Terminal` → `New Terminal`
2. Oder: `Ctrl + ß` (neue PowerShell)

Jetzt kannst du Git Commands usw. ausführen während der Server läuft.

---

## 📂 Projektstruktur (mit Backend)

```
family-places-projekt/
├── family-places.html          # Hauptseite
├── family-places-styles.css    # CSS
├── family-places-app.js        # Frontend Logic
├── server.js                   # Backend Logic
├── package.json                # Dependencies
├── package-lock.json           # Lock file (auto)
├── node_modules/               # Dependencies (auto)
└── data/                        # Wird auto erstellt
    ├── users.json
    ├── places.json
    └── ratings.json
```

---

## 🐛 Fehlersuche

### "npm: Der Begriff "npm" ist nicht erkannt"
→ Node.js nicht richtig installiert. Neuladen und neu installieren.

### "Address already in use :3000"
→ Ein anderer Prozess nutzt Port 3000. Entweder:
1. Port ändern: `$env:PORT = 8000; npm start`
2. Oder anderen Prozess beenden

### Seite lädt nicht auf localhost:3000
→ Der Server läuft nicht. Starte ihn mit `npm start`

---

## 🚀 Deployment (Online stellen)

### Kostenlos auf GitHub Pages (nur Frontend)
1. Pushe auf GitHub
2. Aktiviere GitHub Pages in Repo Settings
3. Öffne die GitHub Pages URL

### Mit Heroku (mit Backend)
1. Erstelle Heroku Account
2. `heroku create family-places`
3. `git push heroku main`

---

## 📖 Nächste Schritte

### Frontend verstehen
- Öffne `family-places-app.js` und studiere:
  - Login/Register System
  - Map Initialisierung
  - Rating System

### Backend erweitern
- Nutze echte Datenbank (MongoDB, PostgreSQL)
- Passwort Hashing mit bcrypt
- Email Verifikation
- Admin Dashboard

### Deployment
- Mit GitHub Pages online stellen
- Mit Heroku oder AWS deployen
- Custom Domain konfigurieren

---

## 💬 Fragen?

Schreib mich an oder check die Dokumentation in `FAMILY_PLACES_README.md`

**Viel Spaß! 🎉**
