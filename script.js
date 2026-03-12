// Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("hide");
  }, 900);
});

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const body = document.body;

menuBtn?.addEventListener("click", () => {
  body.classList.toggle("menu-open");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
  });
});

// Scroll progress
const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollProgress) {
    scrollProgress.style.width = `${progress}%`;
  }
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);

// Reveal animation
const revealItems = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const trigger = window.innerHeight * 0.9;

  revealItems.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    if (top < trigger) {
      item.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Lightweight parallax only on desktop
const heroTitle = document.querySelector(".hero-title");
const heroShowcase = document.querySelector(".hero-showcase");

window.addEventListener("scroll", () => {
  if (window.innerWidth < 992) return;

  const scrolled = window.scrollY;
  if (heroTitle) {
    heroTitle.style.transform = `translateY(${scrolled * 0.08}px)`;
  }
  if (heroShowcase) {
    heroShowcase.style.transform = `translateY(${scrolled * 0.05}px)`;
  }
});

// Tilt effect only on desktop
const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    if (window.innerWidth < 992) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * 7;
    const rotateX = ((y - midY) / midY) * -7;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
});

// Product popup
const popupBackdrop = document.getElementById("popupBackdrop");
const popupClose = document.getElementById("popupClose");
const popupImage = document.getElementById("popupImage");
const popupName = document.getElementById("popupName");
const popupTamil = document.getElementById("popupTamil");
const popupCategory = document.getElementById("popupCategory");
const popupDesc = document.getElementById("popupDesc");
const popupSize = document.getElementById("popupSize");

document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("click", () => {
    popupImage.src = card.dataset.image;
    popupImage.alt = card.dataset.name;
    popupName.textContent = card.dataset.name;
    popupTamil.textContent = card.dataset.tamil;
    popupCategory.textContent = card.dataset.category;
    popupDesc.textContent = card.dataset.desc;
    popupSize.textContent = card.dataset.size;

    popupBackdrop.classList.add("active");
    document.body.classList.add("no-scroll");
  });
});

function closePopup() {
  popupBackdrop.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

popupClose?.addEventListener("click", closePopup);

popupBackdrop?.addEventListener("click", (e) => {
  if (e.target === popupBackdrop) {
    closePopup();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePopup();
  }
});

// Background particles
const canvas = document.getElementById("spiceCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

let w = 0;
let h = 0;
let dustParticles = [];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createDust() {
  if (!canvas || !ctx) return;

  const densityDivisor = window.innerWidth < 768 ? 26000 : 18000;
  const count = Math.max(28, Math.floor((w * h) / densityDivisor));
  dustParticles = [];

  const colors = [
    "255,204,82",
    "214,129,36",
    "255,160,60",
    "176,84,28",
    "255,222,150"
  ];

  for (let i = 0; i < count; i++) {
    dustParticles.push({
      x: randomBetween(0, w),
      y: randomBetween(0, h),
      r: randomBetween(1, 3.2),
      vx: randomBetween(-0.18, 0.18),
      vy: randomBetween(-0.12, -0.42),
      alpha: randomBetween(0.04, 0.24),
      color: colors[Math.floor(Math.random() * colors.length)],
      life: randomBetween(90, 220)
    });
  }
}

function resizeCanvas() {
  if (!canvas || !ctx) return;
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  createDust();
}

function updateDust() {
  if (!canvas || !ctx) return;

  ctx.clearRect(0, 0, w, h);

  dustParticles.forEach((p) => {
    p.x += p.vx + Math.sin(p.y * 0.01) * 0.05;
    p.y += p.vy;
    p.life -= 1;

    if (p.y < -10 || p.x < -10 || p.x > w + 10 || p.life <= 0) {
      p.x = randomBetween(0, w);
      p.y = h + randomBetween(10, 100);
      p.r = randomBetween(1, 3.2);
      p.vx = randomBetween(-0.18, 0.18);
      p.vy = randomBetween(-0.12, -0.42);
      p.alpha = randomBetween(0.04, 0.24);
      p.life = randomBetween(90, 220);
    }

    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
    gradient.addColorStop(0, `rgba(${p.color}, ${p.alpha})`);
    gradient.addColorStop(1, `rgba(${p.color}, 0)`);

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(updateDust);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
updateDust();
