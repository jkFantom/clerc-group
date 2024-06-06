import { initRangeInputs } from './parts/input-range.min.js';
import { initFileInputs } from './parts/input-file.min.js';
import { initSelects } from './parts/select.min.js';

initRangeInputs();
initFileInputs();
initSelects();

const htmlEl = document.documentElement;

const initHeader = () => {
  const header = document.querySelector('.header');
  const mobileLayer = document.querySelector('.mobile-layer');
  const mobileNavButton = document.querySelector('[data-mobile-nav]');
  const closeMobileNavButton = document.querySelector('[data-close-mobile-nav]');

  window.addEventListener('scroll', () => {
    window.scrollY > 0
      ? header.setAttribute('data-fixed', '')
      : header.removeAttribute('data-fixed');
  })

  mobileNavButton.addEventListener('click', () => {
    htmlEl.classList.add('no-scroll');
    mobileLayer.toggleAttribute('aria-hidden');
  });

  closeMobileNavButton.addEventListener('click', () => {
    htmlEl.classList.remove('no-scroll');
    mobileLayer.toggleAttribute('aria-hidden');
  });
}

initHeader();

