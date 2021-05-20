import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import {openPopup} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
  const popupTimerId = setInterval(() => openPopup('.popup', popupTimerId), 50000);

  tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
  modal('[data-modal]', '.modal', popupTimerId);
  timer('.timer', '2021-12-31');
  cards();
  calc();
  forms('form', popupTimerId);
  slider({
    container:'.offer__slider',
    slide: '.offer__slide',
    prevArrow: '.offer__slider-prev',
    nextArrow:'.offer__slider-next',
    totalCounter: '#total',
    currentCounter: '#current', 
    wrapper: '.offer__slider-wrapper', 
    field: '.offer__slider-inner'
  });
});