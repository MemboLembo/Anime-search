import homeHandler from './home.js';
import { renderAnime } from './specificAnime.js';

const animeHandler = id => {
  console.log(`Handling anime with id: ${id}`);
};

export const goTo = (hash) => {
  window.location.hash = hash;
};

const ANIME_RE = /anime\/(\d+)/;

export const handleHash = () => {
  const { hash } = window.location;

  if (!hash || hash === '#') {
    console.log('home');
    homeHandler();
  } else if (ANIME_RE.test(hash)) {
    const [, id] = ANIME_RE.exec(hash);
    const animeContent = document.querySelector('.search-result__anime-content');
    renderAnime(id, animeContent);
  }
  
  
};

