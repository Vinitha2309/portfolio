// Smooth scroll + active section highlight
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const scrollToTopBtn = document.getElementById("scrollToTop");

// Smooth scroll
navLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    window.scrollTo({
      top: targetSection.offsetTop - 90,
      behavior: "smooth"
    });
    navMenu.classList.remove("active");
  });
});

// Highlight active section
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });

  // Shrink navbar on scroll
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  } else {
    navbar.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
  }

  // Show/hide scroll‑to‑top button
  if (window.scrollY > 400) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  const spans = hamburger.querySelectorAll("span");
  if (navMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(6px,6px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(6px,-6px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Scroll to top
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Fade‑in on scroll (cards)
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
