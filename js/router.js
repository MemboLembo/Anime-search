import homeHandler from './pages/home.js';
import { renderAnime } from './pages/anime.js';
import { renderSearch } from './pages/search.js';

export const goTo = (hash) => {
  window.location.hash = hash;
};

const ANIME_RE = /anime\/(\d+)/;
const SEARCH_RE = /search\/(.+(\/nsfw$)|.+)/;

export const handleHash = () => {
  const { hash } = window.location;
  const animeContent = document.querySelector('.search-result__anime-content');

  if (!hash || hash === '#') {
    homeHandler();
  } else if (ANIME_RE.test(hash)) {
    const [, id] = ANIME_RE.exec(hash);
    renderAnime(id, animeContent);
  } else if (SEARCH_RE.test(hash)) {
    const [, searchInput, nsfwMode] = SEARCH_RE.exec(hash);
    

    if (nsfwMode) {
      const checkBox = document.querySelector('.nsfw__checkbox');
      checkBox.checked = true;
      const searchInputHolder = decodeURIComponent(searchInput).replace(/\/nsfw$/, '')
      renderSearch(searchInputHolder, animeContent, false);
    } else {
      renderSearch(searchInput, animeContent, true);
    }
  }
};

