const STORE_WHATSAPP = "5531989695319"; // TODO: substitua pelo número real da loja com DDI + DDD.

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const genreButtons = [...document.querySelectorAll(".genre-card")];
const productCards = [...document.querySelectorAll(".product-card")];
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const catalogStatus = document.querySelector("#catalog-status");
const emptyState = document.querySelector("#empty-state");
const backToTop = document.querySelector(".back-to-top");
const currentYear = document.querySelector("#current-year");
const whatsappLinks = document.querySelectorAll(".whatsapp-link");

let selectedGenre = "todos";

function normalizeText(value) {
  return value
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function getGenreLabel(filter) {
  const labels = {
    todos: "Todos",
    rock: "Rock",
    "pop-rock": "Pop Rock",
    jazz: "Jazz",
    classica: "Música Clássica",
    mpb: "MPB",
    sertanejo: "Sertanejo",
    "sertanejo-universitario": "Sertanejo Universitário",
  };

  return labels[filter] || "Todos";
}

function filterProducts() {
  const term = normalizeText(searchInput.value);
  let visibleCount = 0;

  productCards.forEach((card) => {
    const matchesGenre =
      selectedGenre === "todos" || card.dataset.genre === selectedGenre;

    const searchableText = normalizeText(
      `${card.dataset.search || ""} ${card.textContent}`
    );

    const matchesSearch = !term || searchableText.includes(term);
    const shouldShow = matchesGenre && matchesSearch;

    card.hidden = !shouldShow;

    if (shouldShow) {
      visibleCount += 1;
    }
  });

  emptyState.hidden = visibleCount !== 0;

  const genreLabel = getGenreLabel(selectedGenre);
  const resultText =
    visibleCount === 1 ? "1 disco encontrado" : `${visibleCount} discos encontrados`;

  if (selectedGenre === "todos" && !term) {
    catalogStatus.textContent = "Exibindo todo o catálogo.";
  } else if (term) {
    catalogStatus.textContent = `${resultText} em ${genreLabel} para “${searchInput.value.trim()}”.`;
  } else {
    catalogStatus.textContent = `${resultText} em ${genreLabel}.`;
  }
}

function closeMobileMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  mainNav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  mainNav.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

genreButtons.forEach((button) => {
  button.setAttribute(
    "aria-pressed",
    button.classList.contains("is-active") ? "true" : "false"
  );

  button.addEventListener("click", () => {
    selectedGenre = button.dataset.filter;

    genreButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    filterProducts();
    document.querySelector("#catalogo").scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  });
});

searchForm.addEventListener("submit", (event) => event.preventDefault());
searchInput.addEventListener("input", filterProducts);

whatsappLinks.forEach((link) => {
  const message = encodeURIComponent(
    "Olá! Vim pelo site da Retro Discos e gostaria de saber mais sobre os vinis disponíveis."
  );

  link.href = `https://wa.me/${STORE_WHATSAPP}?text=${message}`;
});

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("is-visible", window.scrollY > 520);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) {
    closeMobileMenu();
  }
});

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    image.closest(".product-image, .hero-photo, .about-photo")?.classList.add("image-error");
    image.alt = "Imagem ilustrativa temporariamente indisponível";
  });
});

currentYear.textContent = new Date().getFullYear();
filterProducts();
