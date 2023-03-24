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