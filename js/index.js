import { handleHash } from './router.js';
import { initHome } from './pages/home.js';

document.addEventListener("DOMContentLoaded", function () {
  initHome();

  window.addEventListener('hashchange', handleHash);
  handleHash();
});