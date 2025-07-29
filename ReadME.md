# NF REAL MUSIC API

Express API to retrieve data about NF's music.

# Setup

## Clone the repository

```bash
git clone https://github.com/your-username/nf-api.git
cd nf-api
```

## Install dependencies

```
npm install
```

## Start the server

```
node index.js
```

**The API will be available at:**

```
http://localhost:3000/api/musiques
```

## 📌 Endpoints

### `GET /api/musiques`

Returns all music tracks.

Optional query filters:

- `annee` → filter by year  
  Example: `/api/musiques?annee=2019`

- `album` → filter by album name (case-insensitive)  
  Example: `/api/musiques?album=hope`

- `titre` → filter by track title (case-insensitive)  
  Example: `/api/musiques?titre=leave`

### `GET /api/musiques/:id`

Returns a specific track by its `id`.  
Example: `/api/musiques/2`

### `GET /api/musiques/random`

Returns a random track

---

## 🔧 Update dependencies

To update project dependencies:

```bash
npm update
```

## ➕ Add new tracks

Edit the musiques.json file and add new entries using the following structure:

```json
[
  {
    "id": 0,
    "titre": "Leave Me Alone",
    "album": "The Search",
    "annee": 2019
  }
]
```

# 📄 License

Free to use, modify, and share.
