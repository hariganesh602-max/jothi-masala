// Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("hide");
  }, 1200);
});

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const body = document.body;

menuBtn?.addEventListener("click", () => {
  body.classList.toggle("menu-open");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => body.classList.remove("menu-open"));
});

// Scroll progress
const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);

// Reveal animation
const revealItems = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const trigger = window.innerHeight * 0.88;

  revealItems.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    if (top < trigger) {
      item.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Premium hero parallax
const heroTitle = document.querySelector(".hero-title");
const heroShowcase = document.querySelector(".hero-showcase");

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;

  if (heroTitle) {
    heroTitle.style.transform = `translateY(${scrolled * 0.16}px)`;
  }

  if (heroShowcase && window.innerWidth > 768) {
    heroShowcase.style.transform = `translateY(${scrolled * 0.1}px)`;
  } else if (heroShowcase) {
    heroShowcase.style.transform = "translateY(0)";
  }
});

// 3D tilt cards
const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    if (window.innerWidth <= 768) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * 8;
    const rotateX = ((y - midY) / midY) * -8;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
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
const productPopup = document.getElementById("productPopup");

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

    setTimeout(() => {
      productPopup?.scrollTo({
        top: 0,
        behavior: "instant"
      });
    }, 50);
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
  if (e.key === "Escape" && popupBackdrop.classList.contains("active")) {
    closePopup();
  }
});

// Real spice powder animation
const canvas = document.getElementById("spiceCanvas");
const ctx = canvas.getContext("2d");

let w, h, dustParticles;

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  createDust();
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createDust() {
  const count = Math.max(60, Math.floor((w * h) / 18000));
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
      r: randomBetween(1, 4),
      vx: randomBetween(-0.25, 0.25),
      vy: randomBetween(-0.15, -0.55),
      alpha: randomBetween(0.05, 0.32),
      color: colors[Math.floor(Math.random() * colors.length)],
      life: randomBetween(80, 220)
    });
  }
}

function updateDust() {
  ctx.clearRect(0, 0, w, h);

  dustParticles.forEach((p) => {
    p.x += p.vx + Math.sin(p.y * 0.01) * 0.08;
    p.y += p.vy;
    p.life -= 1;

    if (p.y < -10 || p.x < -10 || p.x > w + 10 || p.life <= 0) {
      p.x = randomBetween(0, w);
      p.y = h + randomBetween(10, 120);
      p.r = randomBetween(1, 4);
      p.vx = randomBetween(-0.25, 0.25);
      p.vy = randomBetween(-0.15, -0.55);
      p.alpha = randomBetween(0.05, 0.32);
      p.life = randomBetween(80, 220);
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
