import { fetchUrl } from '../utils.js';
import { createItemHtml } from '../createItemHtml.js';
import { loadingAnimationToggle } from '../dom-utils.js';
import { setInputVal } from '../dom-utils.js';
import { setErrorOutput } from '../dom-utils.js';
import { addListenerOfScroll } from '../dom-utils.js';
import { setScrollTop } from '../dom-utils.js';

export async function renderSearch(searchVar, animeContent, filterEnabled) {
  loadingAnimationToggle("display: block;");
  setErrorOutput('');
  setInputVal(searchVar);
  animeContent.innerHTML = '';

  await fetchUrl(`https://api.jikan.moe/v3/search/anime?q=${searchVar}`)
  .then(function (data) {
    loadingAnimationToggle("display: none;");
    animeContent.classList.remove('search-result__anime-content_specific-anime');

    if (!data.results.length) {
      animeContent.innerHTML = 'Nothing has been found';
    } else {

      data.results.forEach((result) => {
        if (filterEnabled && result.rated === "Rx") {
          return;
        }

        const itemElement = document.createElement('div');
        itemElement.classList.add('search-result__anime-content__item');
        animeContent.appendChild(itemElement);

        const hoverElement = document.createElement('a');
        hoverElement.classList.add('search-result__anime-content__hover');
        hoverElement.setAttribute('href', `/#anime/${result.mal_id}`)
        itemElement.appendChild(hoverElement);

        hoverElement.innerHTML = createItemHtml(result);
      });

      for (let i = 0; i < 3; i++) {
        const lastRow = document.createElement('div');
        lastRow.classList.add('search-result__anime-content__item', 'search-result__anime-content__item_last-row');
        animeContent.appendChild(lastRow);
      }
    }
    setScrollTop();
    addListenerOfScroll();
  })
  .catch(function (error) {
    loadingAnimationToggle("display: none;");
    if (error.message === 'Something went wrong') {
      setErrorOutput(`Something went wrong, try again later`);
    } else {
      setErrorOutput('Failed to connect');
    }
  });
}