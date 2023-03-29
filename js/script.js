import tabs from './modules/tabs';
import slider from './modules/slider';
import modal from './modules/modal';
import timer from './modules/timer';
import forms from './modules/forms';
import cards from './modules/cards';
import { openModal } from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Start');

  const timerOpenModal = setTimeout(() => {
    openModal('.modal', timerOpenModal);
  }, 5000);

  tabs();
  slider();
  modal('[data-modal]', '.modal', timerOpenModal);
  timer();
  forms();
  cards();

});