/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
  
  const menuCardContainer = document.querySelector('.menu__field .container');

  menuCardContainer.innerHTML = '';

  class MenuCard {
    constructor (img, altimg, title, descr, price, parentSelector, ...classes) {
      this.img = img;
      this.altimg = altimg;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parentSelector = parentSelector;
      this.classes = classes;
    }
    showCard() {
      const menuCardItem = document.createElement('div');
      this.classes.forEach(className => menuCardItem.classList.add(className));
      this.parentSelector.append(menuCardItem);
      menuCardItem.insertAdjacentHTML('beforeend', `
        <img src=${this.img} alt="vegy">
        <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>`);
    }
  }

  // CARDS
  
  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
     throw new Error(`Could not fetch ${url}, with status ${res.status}`);
    }
    return await res.json();
  }

  getResource('http://localhost:3000/menu')
  .then(data => {
    data.forEach(({img, altimg, title, descr, price}) => {
      new MenuCard(img, altimg, title, descr, price, menuCardContainer, 'menu__item').showCard()
    });
  });
}
module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {

  const forms = document.querySelectorAll('form');
  const messages = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо, скоро свяжемся',
    failure: 'Что-то пошло не так',
  }

  const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: data,
    });
    return await res.json();
  }

  function bindPostData(form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const statusMessage = document.createElement('img');
      statusMessage.src = messages.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.append(statusMessage);
      form.insertAdjacentElement('afterend', statusMessage);
  
      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
      .then(data => {
        console.log(data);
        showThanksModal(messages.success);
        form.reset();
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(messages.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }

  function showThanksModal(message) {
    const modalDialog = document.querySelector('.modal__dialog');

    modalDialog.classList.add('hide');
    modal.classList.add('show');
    modal.classList.remove('hide');

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        modalDialog.classList.remove('hide');
        modalDialog.classList.add('show');
        modal.classList.add('hide');
        modal.classList.remove('show');
    }, 4000);
  }

  forms.forEach(form => {
    bindPostData(form);
  });

  fetch('http://localhost:3000/menu')
  .then(data => data.json())
  .then(res => console.log(res));
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
  const modal = document.querySelector('.modal');
  const closeModalBtn = document.querySelector('[data-close]');
  const callActionBtn = document.querySelectorAll('[data-modal]');

  callActionBtn.forEach(element => {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      clearInterval(timerOpenModal);
      // modal.style.display = 'block';
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
    })
  })

  closeModalBtn.addEventListener('click', (event) => {
    event.preventDefault();
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
    // modal.style.display = 'none';
  })

  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
      modal.classList.remove('show');
      modal.classList.add('hide');
      document.body.style.overflow = '';
    }
  })

  document.addEventListener('keydown', (event) => {
    if (event.code ==='Escape') {
      modal.classList.remove('show');
      modal.classList.add('hide');
      document.body.style.overflow = '';
    }
  })

  const timerOpenModal = setTimeout(function () {
    modal.classList.add('show');
    modal.classList.remove('hide');
  }, 50000);


 // Мое решение по открытию модального окна по таймеру

  const body = document.querySelector('body');

  function openModalByScroll() {
    if (document.documentElement.scrollTop + document.documentElement.clientHeight >= body.scrollHeight) {
      modal.classList.add('show');
      modal.classList.remove('hide');
      clearInterval(timerOpenModal);
      document.removeEventListener('scroll', openModalByScroll);
    }
  }

  document.addEventListener('scroll', openModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {

  const tabContainer = document.querySelector('.tabcontainer');
  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  
  function hideTab() {
    tabsContent.forEach(tabBlock => {
      tabBlock.style.display = 'none';
    });
    tabs.forEach(tab => {
      tab.classList.remove('tabheader__item_active');
    })
  };

  function showTab(i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTab();
  showTab();

  tabContainer.addEventListener('click', (event) => {
    let target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((tab, i) => {
        if (target == tab) {
          hideTab();
          showTab(i);
        }
      })
    };
  });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {

  const deadLine = '2023-03-18';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(t/(1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60) % 24 ));
    const minutes = Math.floor((t / 1000 / 60) % 60 );
    const seconds = Math.floor((t / 1000) % 60 );

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds,
    }
  }

  function setZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setTimer(timerBlock, endtime) {
    const timer = document.querySelector(timerBlock);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = setZero(t.days);
      hours.innerHTML = setZero(t.hours);
      minutes.innerHTML = setZero(t.minutes);
      seconds.innerHTML = setZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setTimer('.timer', deadLine);
}
module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
document.addEventListener('DOMContentLoaded', () => {
  const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
  const slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
  const modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
  const timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
  const forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
  const cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");

  console.log('Start');

  tabs();
  slider();
  modal();
  timer();
  forms();
  cards();

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map