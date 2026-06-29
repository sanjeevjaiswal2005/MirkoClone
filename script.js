// =========================
// Navbar Scroll Effect
// =========================

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".custom-navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// =========================
// Swiper
// =========================

const swiper = new Swiper(".testimonialSwiper", {
  slidesPerView: 3,
  spaceBetween: 40,
  loop: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
});

// =========================
// Section Animation
// =========================

const animatedElements = document.querySelectorAll(
  ".slide-left, .card-animate, .image-top-slide",
);

const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

animatedElements.forEach((el) => {
  animationObserver.observe(el);
});

// =========================
// Counter Animation
// =========================

const counters = document.querySelectorAll(".counter");
const counterSection = document.querySelector(".counter-section");

let counterStarted = false;

function animateCounter(counter) {
  const target = Number(counter.dataset.target);
  const duration = Number(counter.dataset.duration);

  let start = null;

  function update(currentTime) {
    if (!start) start = currentTime;

    const progress = currentTime - start;

    const percentage = Math.min(progress / duration, 1);

    const currentValue = Math.floor(percentage * target);

    counter.innerText = currentValue;

    if (percentage < 1) {
      requestAnimationFrame(update);
    } else {
      counter.innerText = target;
    }
  }

  requestAnimationFrame(update);
}

if (counterSection) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !counterStarted) {
        counters.forEach((counter) => {
          animateCounter(counter);
        });

        counterStarted = true;
      }
    },
    {
      threshold: 0.4,
    },
  );

  counterObserver.observe(counterSection);
}
