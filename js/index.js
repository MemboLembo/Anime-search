import { handleHash } from './router.js';
import { initHome } from './pages/home.js';
import { scrollFunction } from './buttonScrollTop.js';

document.addEventListener("DOMContentLoaded", function () {
  initHome();

  window.addEventListener('scroll', scrollFunction);

  window.addEventListener('hashchange', handleHash);
  handleHash();
});