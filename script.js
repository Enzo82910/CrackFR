// Fichier JS pour afficher la fiche jeu dynamiquement selon l'id dans l'URL

const games = [
  {
    id: "1",
    name: "Super Adventure",
    desc: "Un jeu d’aventure palpitant à explorer ! Explorez des mondes magiques, affrontez des ennemis et trouvez des trésors.",
    img: "assets/game1.jpg",
    download: "downloads/super-adventure.zip"
  },
  {
    id: "2",
    name: "Space Fight",
    desc: "Affrontez les ennemis dans l’espace dans ce jeu d’action ! Pilotez votre vaisseau et survivez aux batailles intergalactiques.",
    img: "assets/game2.jpg",
    download: "downloads/space-fight.zip"
  }
  // Ajoutez d'autres jeux ici si nécessaire
];

// Extraction de l'id du jeu de l'URL
function getIdParam() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function displayGameDetails() {
  const id = getIdParam();
  const game = games.find(g => g.id === id);
  const el = document.getElementById('game-details');
  if (game) {
    el.innerHTML = `
      <img src="${game.img}" alt="${game.name}">
      <h2>${game.name}</h2>
      <p>${game.desc}</p>
      <a href="${game.download}" class="download-btn">Télécharger</a>
    `;
  } else {
    el.innerHTML = `<p>Jeu inconnu.</p>`;
  }
}

if (window.location.pathname.endsWith("game.html")) {
  window.addEventListener('DOMContentLoaded', displayGameDetails);
}