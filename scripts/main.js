(function () {
  const btn = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (!btn || !nav) return;

  function setOpen(isOpen) {
    nav.classList.toggle("open", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
    btn.setAttribute("aria-expanded", String(isOpen));

    // Optionnel : changer l’icône
    btn.textContent = isOpen ? "✕" : "☰";
  }

  btn.addEventListener("click", () => {
    setOpen(!nav.classList.contains("open"));
  });

  // Fermer au clic sur un lien
  nav.addEventListener("click", (e) => {
    const target = e.target;
    if (target instanceof Element && target.closest("a")) {
      setOpen(false);
    }
  });

  // Fermer avec Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

(function initProjectsInfiniteCarousel() {
  const carousel = document.querySelector(".projects-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".projects-track");
  const viewport = carousel.querySelector(".projects-viewport");
  const btnPrev = carousel.querySelector(".carousel-btn.prev");
  const btnNext = carousel.querySelector(".carousel-btn.next");

  const originals = Array.from(track.children);
  if (originals.length < 2) return;

  // Clone pour boucle infinie
  const headClones = originals.map(n => n.cloneNode(true));
  const tailClones = originals.map(n => n.cloneNode(true));

  tailClones.reverse().forEach(n => track.insertBefore(n, track.firstChild));
  headClones.forEach(n => track.appendChild(n));

  const total = originals.length;
  let index = total;
  let isAnimating = false;
  let step = 0;
  let centerOffset = 0;

  function recalc() {
    const card = track.querySelector(".blue-card");
    if (!card) return;

    const cardW = card.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap || "0");
    const viewportW = viewport.getBoundingClientRect().width;

    step = cardW + gap;
    centerOffset = (viewportW - cardW) / 2;

    setPosition(false);
  }

  function setPosition(animate = true) {
    track.style.transition = animate ? "transform 320ms ease" : "none";
    track.style.transform = `translateX(${-(index * step) + centerOffset}px)`;
  }

  recalc();
  window.addEventListener("resize", recalc);

  function go(delta) {
    if (isAnimating) return;
    isAnimating = true;
    index += delta;
    setPosition(true);
  }

  btnNext.addEventListener("click", () => go(1));
  btnPrev.addEventListener("click", () => go(-1));

  track.addEventListener("transitionend", () => {
    if (index >= total * 2) {
      index = total;
      setPosition(false);
    }
    if (index < total) {
      index = total * 2 - 1;
      setPosition(false);
    }
    track.offsetHeight;
    isAnimating = false;
  });

  // Clavier
  carousel.tabIndex = 0;
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  });
})();



})();
