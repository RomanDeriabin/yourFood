import tabs from './modules/tabs';
import slider from './modules/slider';
import modal from './modules/modal';
import timer from './modules/timer';
import forms from './modules/forms';
import cards from './modules/cards';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Start');

  tabs();
  slider();
  modal();
  timer();
  forms();
  cards();

});