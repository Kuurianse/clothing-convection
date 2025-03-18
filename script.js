AOS.init();

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

// Galeri Produk
document.addEventListener('DOMContentLoaded', function() {
  const galleryWrapper = document.getElementById('galleryWrapper');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const progressContainer = document.getElementById('progressContainer');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  let itemWidth;
  let currentIndex = 0;
  const maxIndex = galleryItems.length - 1;
  
  // Create progress dots
  galleryItems.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('progress-dot');
      if (index === 0) dot.classList.add('active');
      progressContainer.appendChild(dot);
      
      dot.addEventListener('click', () => {
          goToSlide(index);
      });
  });
  
  const progressDots = document.querySelectorAll('.progress-dot');
  
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
  
  // Initialize item width
  itemWidth = calculateItemWidth();
  
  // Update item width on window resize
  window.addEventListener('resize', () => {
      itemWidth = calculateItemWidth();
      goToSlide(currentIndex);
  });
  
  function updateProgressDots() {
      progressDots.forEach((dot, index) => {
          if (index === currentIndex) {
              dot.classList.add('active');
          } else {
              dot.classList.remove('active');
          }
      });
  }
  
  function goToSlide(index) {
      currentIndex = index;
      const offset = -currentIndex * itemWidth;
      galleryWrapper.style.transform = `translateX(${offset}px)`;
      updateProgressDots();
  }
  
  prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
          goToSlide(currentIndex - 1);
      } else {
          // Optional: Loop back to the end
          goToSlide(maxIndex);
      }
  });
  
  nextButton.addEventListener('click', () => {
      if (currentIndex < maxIndex) {
          goToSlide(currentIndex + 1);
      } else {
          // Optional: Loop back to the beginning
          goToSlide(0);
      }
  });
  
  // Enable horizontal scrolling with mouse wheel
  galleryWrapper.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
          // Scroll right
          if (currentIndex < maxIndex) {
              goToSlide(currentIndex + 1);
          }
      } else {
          // Scroll left
          if (currentIndex > 0) {
              goToSlide(currentIndex - 1);
          }
      }
  });
  
  // Enable touch scrolling for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  galleryWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
  });
  
  galleryWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  });
  
  function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
          // Swipe left, go next
          if (currentIndex < maxIndex) {
              goToSlide(currentIndex + 1);
          }
      } else if (touchEndX > touchStartX + swipeThreshold) {
          // Swipe right, go previous
          if (currentIndex > 0) {
              goToSlide(currentIndex - 1);
          }
      }
  }
  
  // Optional: Auto-scroll functionality
  /*
  let autoScrollInterval;
  
  function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
          if (currentIndex < maxIndex) {
              goToSlide(currentIndex + 1);
          } else {
              goToSlide(0);
          }
      }, 5000); // Change slide every 5 seconds
  }
  
  function stopAutoScroll() {
      clearInterval(autoScrollInterval);
  }
  
  startAutoScroll();
  
  const galleryContainer = document.querySelector('.gallery-container');
  galleryContainer.addEventListener('mouseenter', stopAutoScroll);
  galleryContainer.addEventListener('mouseleave', startAutoScroll);
  */
});