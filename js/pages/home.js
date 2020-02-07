import { goTo } from '../router.js';
import { loadingAnimationToggle } from '../dom-utils.js';
import { setInputVal } from '../dom-utils.js';
import { randomAnime } from '../random-anime.js';


export const initHome = () => {
  const userSearch = document.querySelector('.search-form__content__input');
  const searchButton = document.querySelector('.search-form__content__btn');
  const randomButton = document.querySelector('.header__random');

  randomButton.addEventListener('click', function() {
    loadingAnimationToggle("display: block;");
    randomAnime();
  })

  searchButton.addEventListener('click', function (e) {
    e.preventDefault();
    const searchVar = userSearch.value;

    goTo('search/' + searchVar);
  });
};

export default () => {
  const animeContent = document.querySelector('.search-result__anime-content');
  animeContent.innerHTML = '';
  setInputVal('');
};
