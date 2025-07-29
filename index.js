const express = require('express');  // Importation du framework Express pour créer le serveur web
const fs = require('fs');             // Module natif Node.js pour lire les fichiers
const app = express();                // Création de l'application Express
const port = 3000;                   // Port sur lequel le serveur va écouter

// Lecture et parsing du fichier JSON contenant les données musicales de NF
// Ici, on charge toutes les musiques au démarrage dans une variable JS
const musiques = JSON.parse(fs.readFileSync('./musiques.json'));

// Route GET /api/musiques
// Cette route renvoie la liste complète des musiques
// Possibilité d'appliquer des filtres via les query parameters (?annee=...&album=...&titre=...)
app.get('/api/musiques', (req, res) => {
  let result = musiques;  // On part de la liste complète

  // Extraction des paramètres de requête (query parameters)
  // Exemple : /api/musiques?annee=2019&album=Hope
  const { annee, album, titre } = req.query;

  // Filtre sur l'année si spécifiée dans l'URL
  if (annee) {
    // On convertit le paramètre en nombre entier pour comparer avec annee dans les données
    result = result.filter(m => m.annee === parseInt(annee));
  }

  // Filtre sur le nom de l'album, recherche insensible à la casse
  if (album) {
    result = result.filter(m => m.album.toLowerCase().includes(album.toLowerCase()));
  }

  // Filtre sur le titre de la musique, recherche insensible à la casse
  if (titre) {
    result = result.filter(m => m.titre.toLowerCase().includes(titre.toLowerCase()));
  }

  // Renvoi de la liste filtrée (ou complète si aucun filtre)
  res.json(result);
});

// Route GET /api/musiques/:id
// Cette route récupère une musique précise via son identifiant (id)
// Exemple : /api/musiques/2 renvoie la musique dont id = 2
app.get('/api/musiques/:id', (req, res) => {
  const id = parseInt(req.params.id); // Récupération de l'id passé dans l'URL et conversion en nombre entier

  // Recherche dans le tableau des musiques d'une correspondance avec l'id donné
  const musique = musiques.find(m => m.id === id);

  // Si aucune musique trouvée, on renvoie une erreur 404
  if (!musique) {
    return res.status(404).json({ message: "Musique non trouvée" });
  }

  // Sinon on renvoie la musique trouvée au format JSON
  res.json(musique);
});

// Démarrage du serveur Express sur le port spécifié
app.listen(port, () => {
  console.log(`API NF dispo sur http://localhost:${port}/api/musiques`);
  // Affiche un message dans la console pour indiquer que le serveur tourne
});
