import { goTo } from '../router.js';
import { loadingAnimationToggle } from '../dom-utils.js';
import { setInputVal } from '../dom-utils.js';

export const initHome = () => {
  const userSearch = document.querySelector('.search-form__content__input');
  const searchButton = document.querySelector('.search-form__content__btn');

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
