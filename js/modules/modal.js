function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('show');
  modal.classList.add('hide');
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  const closeModalBtn = document.querySelector('[data-close]');
  const callActionBtn = document.querySelectorAll(triggerSelector);

  callActionBtn.forEach(element => {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      openModal(modalSelector, modalTimerId);
    })
  });

  closeModalBtn.addEventListener('click', (event) => {
    event.preventDefault();
    closeModal(modalSelector);
    document.body.style.overflow = '';
  })

  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
      // document.body.style.overflow = '';
    }
  })

  document.addEventListener('keydown', (event) => {
    if (event.code ==='Escape') {
      closeModal(modalSelector);
      // document.body.style.overflow = '';
    }
  })

 // Мое решение по открытию модального окна по таймеру

  const body = document.querySelector('body');

  function openModalByScroll() {
    if (document.documentElement.scrollTop + document.documentElement.clientHeight >= body.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      document.removeEventListener('scroll', openModalByScroll);
    }
  }

  document.addEventListener('scroll', openModalByScroll);
}

export default modal;
export {openModal};
export {closeModal};