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