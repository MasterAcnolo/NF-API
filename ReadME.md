# NF REAL MUSIC API

Express API to retrieve data about NF's music. Available at:

```
https://nf-api-c24p.onrender.com/api/musiques
```

# Setup

## Clone the repository

```bash
git clone https://github.com/MasterAcnolo/nf-api.git
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

You can change the port by editing the `port` constant in index.js

```js
  const port = process.env.PORT || 3000;
```

## Endpoints

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

## ID Format

Each track has an `id` in the format `XYY`:

- `X` represents the album ID.
- `YY` represents the track number within that album (with leading zeros if needed).

### Example:

If **"Hope"** is the 1st track on the album **"Hope"**, its ID would be `801`:

- `8` → Album ID for _Hope_
- `01` → 1st track in the album

### Album ID Reference

| Album                | ID  |
| -------------------- | --- |
| Moments              | 1   |
| NF (EP)              | 2   |
| Mansion              | 3   |
| Therapy Session      | 4   |
| Perception           | 5   |
| The Search           | 6   |
| Clouds               | 7   |
| Hope                 | 8   |
| Fear (EP)            | 9   |
| Single / Other songs | 11  |

---

## Update dependencies

To update project dependencies:

```bash
npm update
```

## Add new tracks

Edit the musiques.json file and add new entries using the following structure:

```json
[
  {
    "id": 0,
    "titre": "Title",
    "album": "Album",
    "date_sortie": "JJ/MM/YYYY",
    "duree": "mm:ss",
    "cover_url": "URL"
  }
]
```

---

# License

Free to use, modify, and share.
