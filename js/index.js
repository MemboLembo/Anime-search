import { handleHash } from './router.js';
import { initHome } from './home.js';

document.addEventListener("DOMContentLoaded", function () {
  initHome();

  window.addEventListener('hashchange', handleHash);
  handleHash();
});