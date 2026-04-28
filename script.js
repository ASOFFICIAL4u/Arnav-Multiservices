// ===== NAVBAR SCROLL =====
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.style.background =
    window.scrollY > 50
      ? "rgba(10,25,47,0.95)"
      : "rgba(10,25,47,0.75)";
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;

    answer.style.display =
      answer.style.display === "block" ? "none" : "block";
  });
});

// ===== SCROLL REVEAL =====
const reveal = document.querySelectorAll(".service-card, .why-card, .testi-card");

window.addEventListener("scroll", () => {
  reveal.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
});

// INIT STATE
reveal.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(40px)";
  el.style.transition = "0.6s ease";
});
