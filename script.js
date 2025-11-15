// ------ Données jeux -------

function slugify(name) {
  return name.toLowerCase().replace(/ /g, "-");
}

// Récupère ou initialise les jeux
let games = JSON.parse(localStorage.getItem('games')) || [
  {
    id: "1",
    name: "Super Adventure",
    desc: "Un jeu d’aventure palpitant à explorer !",
    img: ".assets/super-adventure.jpg",
    download: ".downloads/super-adventure.zip"
  },
  {
    id: "2",
    name: "Space Fight",
    desc: "Affrontez les ennemis dans l’espace !",
    img: ".assets/space-fight.jpg",
    download: ".downloads/space-fight.zip"
  }
];

// ----- Affichage automatique des jeux dans index -----

function renderGamesList() {
  const gamesListEl = document.querySelector('.games-list');
  if (!gamesListEl) return;
  gamesListEl.innerHTML = '';
  games.forEach(game => {
    gamesListEl.innerHTML += `
      <article class="game-card">
        <img src="${game.img}" alt="${game.name}">
        <h2>${game.name}</h2>
        <p>${game.desc}</p>
        <a href="game.html?id=${game.id}" class="details-btn">Voir Fiche</a>
        <a href="${game.download}" class="download-btn">Télécharger</a>
      </article>
    `;
  });
}
if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
  window.addEventListener('DOMContentLoaded', renderGamesList);
}

// ----- Modal ajout jeu -----

document.addEventListener('DOMContentLoaded', () => {
  const addGameBtn = document.getElementById('add-game-btn');
  const modal = document.getElementById('add-game-modal');
  const closeBtn = document.querySelector('.close');
  const verifyPwdBtn = document.getElementById('verify-pwd');
  const pwdInput = document.getElementById('pwd');
  const pwdSection = document.getElementById('pwd-section');
  const addGameForm = document.getElementById('add-game-form');
  const msg = document.getElementById('add-game-message');

  if (addGameBtn) {
    addGameBtn.onclick = () => { modal.style.display = "flex"; msg.textContent = ""; pwdSection.style.display = "none"; pwdInput.value = ""; };
  }
  if (closeBtn) {
    closeBtn.onclick = () => { modal.style.display = "none"; };
  }
  window.onclick = function(e) { if (e.target == modal) modal.style.display = "none"; };

  // Mot de passe
  if (verifyPwdBtn) {
    verifyPwdBtn.onclick = () => {
      if (pwdInput.value === "8219") {
        pwdSection.style.display = "block";
        verifyPwdBtn.style.display = "none";
        pwdInput.disabled = true;
        msg.textContent = "";
      } else {
        msg.textContent = "Mot de passe incorrect !";
      }
    };
  }

  // Ajout du jeu
  if (addGameForm) {
    addGameForm.onsubmit = (e) => {
      e.preventDefault();
      if (pwdInput.value !== "8219") {
        msg.textContent = "Mot de passe incorrect !";
        return;
      }
      const name = addGameForm.name.value.trim();
      const desc = addGameForm.desc.value.trim();
      const img = addGameForm.image.value.trim(); // exemple .assets/mon-jeu.jpg
      const download = addGameForm.download.value.trim(); // exemple .downloads/mon-jeu.zip

      if (!name || !desc || !img || !download) {
        msg.textContent = "Tous les champs sont obligatoires.";
        return;
      }
      // Ajout en localStorage
      const newGame = {
        id: String(Date.now()),
        name, desc, img, download
      };
      games.push(newGame);
      localStorage.setItem('games', JSON.stringify(games));
      renderGamesList();
      msg.style.color = "green";
      msg.textContent = "Jeu ajouté !";
      setTimeout(() => {
        modal.style.display = "none";
      }, 900);
    };
  }
});

// ----- Affichage fiche jeu dynamique (game.html) -----

if (window.location.pathname.endsWith("game.html")) {
  window.addEventListener('DOMContentLoaded', () => {
    // Utilise la même logique avec localStorage
    let games = JSON.parse(localStorage.getItem('games')) || [
      {
        id: "1",
        name: "Super Adventure",
        desc: "Un jeu d’aventure palpitant à explorer !",
        img: ".assets/super-adventure.jpg",
        download: ".downloads/super-adventure.zip"
      },
      {
        id: "2",
        name: "Space Fight",
        desc: "Affrontez les ennemis dans l’espace !",
        img: ".assets/space-fight.jpg",
        download: ".downloads/space-fight.zip"
      }
    ];
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
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
  });
}
