import { goTo } from '../router.js';
import { loadingAnimationToggle } from '../dom-utils.js';
import { setInputVal } from '../dom-utils.js';
import { randomAnime } from '../random-anime.js';

// Loading JS takes some time. We disable the search
// button to not let it refresh the page
// until we initialize its click handler
function enableSearchButton () {
  const button = document.querySelector('.search-form__content__btn');
  button.removeAttribute('disabled');
}

export const initHome = () => {
  const userSearch = document.querySelector('.search-form__content__input');
  const searchButton = document.querySelector('.search-form__content__btn');
  const randomButton = document.querySelector('.header__random');

  randomButton.addEventListener('click', function() {
    loadingAnimationToggle("display: block;");
    randomAnime();
  });

  searchButton.addEventListener('click', function (e) {
    e.preventDefault();
    const searchVar = encodeURIComponent(userSearch.value);
    const checkBox = document.querySelector('.nsfw__checkbox');

    if (checkBox.checked === false) {
      goTo('search/' + searchVar);
    } else {
      goTo('search/' + searchVar + '/nsfw');
    }
  });
  enableSearchButton();
};

export default () => {
  const animeContent = document.querySelector('.search-result__anime-content');
  animeContent.innerHTML = '';
  setInputVal('');
};
