import { fetchUrl } from './utils.js';
import { renderAnime } from './specificAnime.js';
import { createItemHtml } from './createItemHtml.js';





document.addEventListener("DOMContentLoaded", function () {
  const userSearch = document.querySelector('.search-form__content__input');
  const searchButton = document.querySelector('.search-form__content__btn');
  const loadingAnimation = document.querySelector('.letter-holder');

  const animeContent = document.querySelector('.search-result__anime-content');

  searchButton.addEventListener('click', function (e) {
    e.preventDefault();
    const searchVar = userSearch.value;
    loadingAnimation.style = "display: block;";

    fetchUrl(`https://api.jikan.moe/v3/search/anime?q=${searchVar}`)
      .then(function (data) {
        loadingAnimation.style = "display: none;";
        animeContent.classList.remove('search-result__anime-content_specific-anime');

        if (!data.results.length) {
          animeContent.innerHTML = 'Nothing has been found';
        } else {
          animeContent.innerHTML = '';

          data.results.forEach((result) => {

            const itemElement = document.createElement('div');
            itemElement.classList.add('search-result__anime-content__item');
            animeContent.appendChild(itemElement);

            const hoverElement = document.createElement('div');
            hoverElement.classList.add('search-result__anime-content__hover');
            const animeId = result.mal_id;
            itemElement.appendChild(hoverElement);

            hoverElement.innerHTML = createItemHtml(result);

            hoverElement.addEventListener('click', async function () {
              loadingAnimation.style = "display: block;";

              animeContent.innerHTML = '';
              document.body.scrollTop = 0; // For Safari
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

              await renderAnime(animeId, animeContent);

              loadingAnimation.style = "display: none;";
            });
          });

          for (let i = 0; i < 3; i++) {
            const lastRow = document.createElement('div');
            lastRow.classList.add('search-result__anime-content__item', 'search-result__anime-content__item_last-row');
            animeContent.appendChild(lastRow);
          }
        }

      })
      .catch(function (error) {
        const loadingStatus = document.querySelector('.loading-status');
        if (error.message === 'Something went wrong') {
          loadingStatus.innerText = `Something went wrong, try again later`;
        } else {
          loadingStatus.innerText = 'Failed to connect';
        }
      });
  });
});