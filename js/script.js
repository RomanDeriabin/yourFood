document.addEventListener('DOMContentLoaded', () => {
  const tabs = require('./modules/tabs');
  const slider = require('./modules/slider');
  const modal = require('./modules/modal');
  const timer = require('./modules/timer');
  const forms = require('./modules/forms');
  const cards = require('./modules/cards');

  console.log('Start');

  tabs();
  slider();
  modal();
  timer();
  forms();
  cards();

});