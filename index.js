const express = require('express');  // Framework Express pour serveur web
const fs = require('fs');             // Module pour lire les fichiers
const app = express();
const port = process.env.PORT || 3000;

/* 
  Chargement des musiques depuis le fichier JSON au démarrage
  Le contenu est stocké dans une variable JS
*/
const musiques = JSON.parse(fs.readFileSync('./musiques.json'));

/* 
  Route GET /api/musiques
  Renvoie la liste complète des musiques, avec filtres possibles via query params :
  - annee : filtre par année (extrait de date_sortie, format "jj/mm/aaaa")
  - album : filtre par nom d'album (insensible à la casse)
  - titre : filtre par titre de musique (insensible à la casse)
*/
app.get('/api/musiques', (req, res) => {
  let result = musiques;
  const { annee, album, titre } = req.query;

  if (annee) {
    // Extraire l'année depuis date_sortie au format "jj/mm/aaaa"
    result = result.filter(m => {
      if (!m.date_sortie) return false;
      const year = m.date_sortie.split('/')[2]; // Ex : "23/08/2019" -> "2019"
      return year === annee;
    });
  }
  if (album) {
    result = result.filter(m => m.album.toLowerCase().includes(album.toLowerCase()));
  }
  if (titre) {
    result = result.filter(m => m.titre.toLowerCase().includes(titre.toLowerCase()));
  }

  res.json(result);
});

/* 
  Route GET /api/musiques/random
  Renvoie une musique choisie aléatoirement dans la liste
*/
app.get('/api/musiques/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * musiques.length);
  const randomMusique = musiques[randomIndex];
  res.json(randomMusique);
});

/* 
  Route GET /api/musiques/:id
  Renvoie la musique correspondant à l'id passé en paramètre
  Renvoie 404 si non trouvée
*/
app.get('/api/musiques/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const musique = musiques.find(m => m.id === id);

  if (!musique) {
    return res.status(404).json({ message: "Musique non trouvée" });
  }

  res.json(musique);
});

/* 
  Démarrage du serveur sur le port défini
*/
app.listen(port, () => {
  console.log(`API NF dispo sur http://localhost:${port}/api/musiques`);
});
