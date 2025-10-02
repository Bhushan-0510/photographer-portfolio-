const galleryImages = document.querySelectorAll(".hero-4 .gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

// Open lightbox
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    showImage(index);
  });
});

// Show image with smooth animation
function showImage(index) {
  lightboxImg.classList.remove("active");
  setTimeout(() => {
    lightboxImg.src = galleryImages[index].src;
    lightboxImg.classList.add("active");
    currentIndex = index;
  }, 200);
}

// Close lightbox
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Prev
prevBtn.addEventListener("click", () => {
  let newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage(newIndex);
});

// Next
nextBtn.addEventListener("click", () => {
  let newIndex = (currentIndex + 1) % galleryImages.length;
  showImage(newIndex);
});

// Close when clicking outside image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "Escape") closeBtn.click();
  }
});

function closeLightbox() {
  lightboxImg.classList.remove("active");
  lightboxImg.classList.add("fade-out");

  // Wait for animation to finish before hiding overlay
  setTimeout(() => {
    lightbox.classList.remove("active");
    lightboxImg.classList.remove("fade-out");
  }, 400);
}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});
// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  switch (e.key) {
    case "ArrowRight":
      nextBtn.click();
      break;
    case "ArrowLeft":
      prevBtn.click();
      break;
    case "Escape":
      closeLightbox();
      break;
  }
});

// Swipe support for mobile
let startX = 0;
let endX = 0;

lightbox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  let diffX = startX - endX;

  if (Math.abs(diffX) > 50) { // minimum swipe distance
    if (diffX > 0) {
      // Swipe left → next image
      nextBtn.click();
    } else {
      // Swipe right → prev image
      prevBtn.click();
    }
  }
}
