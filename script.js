// JavaScript untuk Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");
const contact = document.querySelector(".contact");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navbar.classList.toggle("active");
  contact.classList.toggle("active");
});

// Tutup menu saat klik di luar
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && 
      !navbar.contains(e.target) &&
      !contact.contains(e.target)) {
    hamburger.classList.remove("active");
    navbar.classList.remove("active");
    contact.classList.remove("active");
  }
});