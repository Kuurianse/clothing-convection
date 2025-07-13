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
    
    // Variables for desktop view adjustments
    let desktopStartIndex = 0; // Start from second image on desktop
    let desktopEndOffset = 2; // Show until 2 images before the last one
    let isDesktopView = false;
    
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
    window.addEventListener('resize', () => {
        itemWidth = calculateItemWidth();
        checkDesktopView();
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
            // Optional: Loop back to the end but respect desktop limits
            if (isDesktopView) {
                goToSlide(maxIndex - desktopEndOffset);
            } else {
                goToSlide(maxIndex);
            }
        }
    });
    
    nextButton.addEventListener('click', () => {
        // For desktop view, stop at maxIndex - desktopEndOffset
        const effectiveMaxIndex = isDesktopView ? maxIndex - desktopEndOffset : maxIndex;
        
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
    galleryWrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        // For desktop view, respect limits
        const effectiveMaxIndex = isDesktopView ? maxIndex - desktopEndOffset : maxIndex;
        
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
    
    galleryWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    galleryWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        // For desktop view, respect limits
        const effectiveMaxIndex = isDesktopView ? maxIndex - desktopEndOffset : maxIndex;
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