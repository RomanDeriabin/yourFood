function slider() {
  const slideWrapper = document.querySelector('.offer__slider-wrapper');
  const slidesField = document.querySelector('.offer__slider-inner');
  const slides = document.querySelectorAll('.offer__slide');
  const nextSlideBtn = document.querySelector('.offer__slider-next');
  const prevSlideBtn = document.querySelector('.offer__slider-prev');
  const totalSlides = document.querySelector('#total');
  const currentSlide = document.querySelector('#current');
  const width = window.getComputedStyle(slideWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    totalSlides.textContent = `0${slides.length}`;
    currentSlide.textContent = `0${slideIndex}`;
  } else {
    totalSlides.textContent = `${slides.length}`;
    currentSlide.textContent = `${slideIndex}`;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slideWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  nextSlideBtn.addEventListener('click', () => {
    if (offset == +width.slice(0,width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0,width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1
    } else {
      slideIndex ++;
    }
    if (slides.length < 10) {
      currentSlide.textContent = `0${slideIndex}`;
    } else {
      currentSlide.textContent = `${slideIndex}`;
    }
  });

  prevSlideBtn.addEventListener('click', () => {
    if (offset == 0) {
      offset = +width.slice(0,width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0,width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex --;
    }
    if (slides.length < 10) {
      currentSlide.textContent = `0${slideIndex}`;
    } else {
      currentSlide.textContent = `${slideIndex}`;
    }
  });
}
module.exports = slider;