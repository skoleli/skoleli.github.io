/**
 * Portfolio Games Loader
 * Dynamically loads games from the games/ folder
 */
const games = [
  {
    name: "Pic Merge 1",
    description: "A fun puzzle game where you merge matching pictures",
    path: "games/picmerge/",
    icon: "games/picmerge/icon.png",
    thumbnail: "Puzzle Game",
  },
  {
    name: "Pic Merge 2",
    description: "A fun puzzle game where you merge matching pictures",
    path: "games/picmerge2/",
    icon: "games/picmerge2/icon.png",
    thumbnail: "Puzzle Game",
  },
  {
    name: "Pic Merge 3",
    description: "A fun puzzle game where you merge matching pictures",
    path: "games/picmerge3/",
    icon: "games/picmerge3/icon.png",
    thumbnail: "Puzzle Game",
  },
  {
    name: "Pic Merge 4",
    description: "A fun puzzle game where you merge matching pictures",
    path: "games/picmerge4/",
    icon: "games/picmerge4/icon.png",
    thumbnail: "Puzzle Game",
  },
  {
    name: "Pic Merge 5",
    description: "A fun puzzle game where you merge matching pictures",
    path: "games/picmerge5/",
    icon: "games/picmerge5/icon.png",
    thumbnail: "Puzzle Game",
  },
];

/**
 * Load games into the portfolio
 */
function loadGames() {
  const gamesCarousel = document.getElementById("gamesCarousel");

  if (!gamesCarousel) return;

  games.forEach((game, index) => {
    const gameCard = createGameCard(game, index);
    gamesCarousel.appendChild(gameCard);
  });

  // Setup carousel navigation
  setupCarouselNavigation();
}

/**
 * Create a game card element
 * @param {Object} game - Game configuration object
 * @param {number} index - Index of the game
 * @returns {HTMLElement} - Game card element
 */
function createGameCard(game, index) {
  const card = document.createElement("div");
  card.className = "game-card";
  card.innerHTML = `
        <div class="game-card-front">
            <img src="${game.icon}" alt="${game.name} icon" class="game-icon">
            <div class="game-name-overlay">${game.name}</div>
        </div>
    `;

  card.addEventListener("click", () => {
    openGameModal(game);
  });

  return card;
}

/**
 * Open game modal with iframe
 */
function openGameModal(game) {
  const modal = document.getElementById("gameModal");
  const iframe = document.getElementById("modalIframe");
  const closeBtn = modal.querySelector(".modal-close");

  iframe.src = game.path + "index.html";
  iframe.title = game.name;
  modal.style.display = "block";

  // Close modal when clicking close button
  closeBtn.onclick = () => closeGameModal();

  // Close modal when clicking outside
  modal.onclick = (e) => {
    if (e.target === modal) {
      closeGameModal();
    }
  };

  // Close modal on Escape key
  document.addEventListener("keydown", handleEscape);
  function handleEscape(e) {
    if (e.key === "Escape") {
      closeGameModal();
      document.removeEventListener("keydown", handleEscape);
    }
  }
}

/**
 * Close game modal
 */
function closeGameModal() {
  const modal = document.getElementById("gameModal");
  const iframe = document.getElementById("modalIframe");

  modal.style.display = "none";
  iframe.src = ""; // Stop the game
}

/**
 * Setup carousel navigation with arrow buttons and auto-rotate
 */
function setupCarouselNavigation() {
  const carousel = document.getElementById("gamesCarousel");
  const leftArrow = document.getElementById("carouselLeft");
  const rightArrow = document.getElementById("carouselRight");

  if (!carousel || !leftArrow || !rightArrow) return;

  let isTouching = false;

  function getScrollAmount() {
    const firstCard = carousel.querySelector(".game-card");
    if (!firstCard) return 0;

    // Get computed width including gap
    const cardWidth = firstCard.offsetWidth;
    const gap = 32; // 2rem gap
    return cardWidth + gap;
  }

  // Auto-rotate carousel every 3 seconds
  let autoRotateInterval = setInterval(() => {
    if (!isTouching) {
      carousel.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });
    }
  }, 3000);

  // Reset auto-rotate on manual interaction
  const resetAutoRotate = () => {
    clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(() => {
      if (!isTouching) {
        carousel.scrollBy({
          left: getScrollAmount(),
          behavior: "smooth",
        });
      }
    }, 3000);
  };

  // Pause on touch
  document.addEventListener("pointerdown", () => {
    isTouching = true;
    clearInterval(autoRotateInterval);
  });

  // Resume after touch ends
  document.addEventListener("pointerup", () => {
    isTouching = false;
    resetAutoRotate();
  });

  leftArrow.addEventListener("click", () => {
    carousel.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth",
    });
    resetAutoRotate();
  });

  rightArrow.addEventListener("click", () => {
    carousel.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth",
    });
    resetAutoRotate();
  });
}

/**
 * Update active nav link based on scroll position
 */
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

/**
 * Smooth scroll for navigation links
 */
function setupSmoothScroll() {
  const navbarHeight = 76;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");

      const target = document.querySelector(href);
      if (target) {
        const targetPosition = target.offsetTop - navbarHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

/**
 * Initialize portfolio when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", function () {
  loadGames();
  setupSmoothScroll();
  updateActiveNavLink();
  window.addEventListener("scroll", updateActiveNavLink);
});
