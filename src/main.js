// C:\Users\saput\Desktop\VSCode\TailwindCSS\my-project\src\main.js

import "./style.css"; // Pastikan ini ada untuk mengimpor style.css

// Inisialisasi AOS (Animate On Scroll)
AOS.init();

// JavaScript untuk Hamburger Menu
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});


// Galeri Produk
document.addEventListener("DOMContentLoaded", function () {
  const galleryWrapper = document.getElementById("galleryWrapper");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const progressContainer = document.getElementById("progressContainer");
  const galleryItems = document.querySelectorAll(".gallery-item");

  // Tambahkan pengecekan untuk memastikan semua elemen ada sebelum melanjutkan
  if (!galleryWrapper || !prevButton || !nextButton || !progressContainer || galleryItems.length === 0) {
    console.warn("Salah satu elemen galeri tidak ditemukan, inisialisasi galeri dibatalkan.");
    return; // Hentikan fungsi jika elemen tidak lengkap
  }


  let itemWidth;
  let currentIndex = 0;
  const maxIndex = galleryItems.length - 1;

  // Variables for desktop view adjustments
  let desktopStartIndex = 0; // Start from second image on desktop
  let desktopEndOffset = 2; // Show until 2 images before the last one
  let isDesktopView = false;

  // Create progress dots
  galleryItems.forEach((_, index) => {
    const dot = document.createElement("div");

    // Ini PENTING! Tambahkan kembali kelas ini agar dot bisa ditemukan oleh querySelectorAll
    dot.classList.add("progress-dot"); 

    // Kelas-kelas Tailwind untuk styling default progress dot
    dot.classList.add(
      "w-3", // width: 12px;
      "h-3", // height: 12px;
      "rounded-full", // border-radius: 50%;
      "bg-[rgba(80,80,80,0.8)]", // background-color: rgba(80, 80, 80, 0.8);
      "transition-colors", // transition untuk background-color
      "duration-300",
      "ease-in-out"
    );

    progressContainer.appendChild(dot); // Tambahkan dot ke DOM sebelum mencari semuanya
  });

  // PENTING! Deklarasikan progressDots di SINI, setelah semua dot dibuat dan ditambahkan ke DOM
  const progressDots = document.querySelectorAll(".progress-dot");

  // Aktifkan dot pertama setelah semua dot dibuat dan ditemukan
  if (progressDots.length > 0) {
    progressDots[0].classList.add("bg-white", "scale-125"); // Tambahkan kelas active awal
    progressDots[0].classList.remove("bg-[rgba(80,80,80,0.8)]"); // Hapus background default
  }

  // Function to calculate item width based on window size
  function calculateItemWidth() {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 480) {
      return 250 + 16; // item width + margin for mobile
    } else if (windowWidth <= 768) {
      return 300 + 20; // item width + margin for tablet
    } else {
      return 524 + 30; // item width + margin for desktop
    }
  }

  // Function to check if we're in desktop view
  function checkDesktopView() {
    isDesktopView = window.innerWidth > 768;

    // If desktop and first load, start from second image
    if (isDesktopView && currentIndex === 0) {
      goToSlide(desktopStartIndex);
    }
  }

  // Initialize item width and view
  itemWidth = calculateItemWidth();
  checkDesktopView();

  // Update item width and view on window resize
  window.addEventListener("resize", () => {
    itemWidth = calculateItemWidth();
    checkDesktopView();
    goToSlide(currentIndex); // Panggil goToSlide untuk menyesuaikan posisi saat resize
  });

  function updateProgressDots() {
    progressDots.forEach((dot, index) => {
      if (index === currentIndex) {
        // Tambahkan kelas untuk state active
        dot.classList.add(
          "bg-white",
          "scale-125" // transform: scale(1.2); (gunakan scale-125 atau scale-[1.2] di Tailwind)
        );
        // Hapus kelas background default agar tidak konflik
        dot.classList.remove("bg-[rgba(80,80,80,0.8)]");
      } else {
        // Hapus kelas untuk state active
        dot.classList.remove("bg-white", "scale-125");
        // Tambahkan kembali kelas background default
        dot.classList.add("bg-[rgba(80,80,80,0.8)]");
      }
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    const offset = -currentIndex * itemWidth;
    galleryWrapper.style.transform = `translateX(${offset}px)`;
    updateProgressDots();
  }

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      // Optional: Loop back to the end but respect desktop limits
      if (isDesktopView) {
        goToSlide(maxIndex - desktopEndOffset);
      } else {
        goToSlide(maxIndex);
      }
    }
  });

  nextButton.addEventListener("click", () => {
    // For desktop view, stop at maxIndex - desktopEndOffset
    const effectiveMaxIndex = isDesktopView
      ? maxIndex - desktopEndOffset
      : maxIndex;

    if (currentIndex < effectiveMaxIndex) {
      goToSlide(currentIndex + 1);
    } else {
      // Loop back to beginning but respect desktop start position
      if (isDesktopView) {
        goToSlide(desktopStartIndex);
      } else {
        goToSlide(0);
      }
    }
  });

  // Enable horizontal scrolling with mouse wheel
  galleryWrapper.addEventListener("wheel", (e) => {
    e.preventDefault();

    // For desktop view, respect limits
    const effectiveMaxIndex = isDesktopView
      ? maxIndex - desktopEndOffset
      : maxIndex;

    if (e.deltaY > 0) {
      // Scroll right
      if (currentIndex < effectiveMaxIndex) {
        goToSlide(currentIndex + 1);
      }
    } else {
      // Scroll left
      if (currentIndex > (isDesktopView ? desktopStartIndex : 0)) {
        goToSlide(currentIndex - 1);
      }
    }
  });

  // Enable touch scrolling for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  galleryWrapper.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  galleryWrapper.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    // For desktop view, respect limits
    const effectiveMaxIndex = isDesktopView
      ? maxIndex - desktopEndOffset
      : maxIndex;
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left, go next
      if (currentIndex < effectiveMaxIndex) {
        goToSlide(currentIndex + 1);
      }
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right, go previous
      if (currentIndex > (isDesktopView ? desktopStartIndex : 0)) {
        goToSlide(currentIndex - 1);
      }
    }
  }
});