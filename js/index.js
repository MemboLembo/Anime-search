'use strict';
document.addEventListener("DOMContentLoaded", function (event) {
  const userSearch = document.querySelector('.search-form__content__input');
  const btn = document.querySelector('.search-form__content__btn');

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const searchVar = userSearch.value;
    const loadingAnimation = document.querySelector('.letter-holder');
    loadingAnimation.style = "display: block;";

    fetch(`https://api.jikan.moe/v3/search/anime?q=${searchVar}`)
      .then(function (resp) {
        if (resp.ok) {
          return resp.json();
        }

        return resp.json().then(errorData => {
          const e = new Error('Something went wrong');
          e.data = errorData;
          throw e;
        });
      })
      .then(function (data) {
        loadingAnimation.style = "display: none;";

        const animeContent = document.querySelector('.search-result__anime-content');
        animeContent.innerHTML = '';
        animeContent.classList.remove('search-result__anime-content_specific-anime');

        if (data.results.length == 0) {
          animeContent.innerHTML = 'Nothing has been found';
        } else {
          data.results.forEach((result) => {

            const itemElement = document.createElement('div');
            itemElement.classList.add('search-result__anime-content__item');
            animeContent.appendChild(itemElement);

            const hoverElement = document.createElement('div');
            hoverElement.classList.add('search-result__anime-content__hover');
            const animeId = result.mal_id;
            itemElement.appendChild(hoverElement);

            hoverElement.innerHTML = createItemHtml(result);

            hoverElement.addEventListener('click', function () {
              loadingAnimation.style = "display: block;";

              fetch(`https://api.jikan.moe/v3/anime/${animeId}`)
                .then(response => response.json())
                .then(function (specificAnime) {
                  loadingAnimation.style = "display: none;";
                  console.log(specificAnime);
                  animeContent.classList.add('search-result__anime-content_specific-anime');
                  animeContent.innerHTML = specificAnimePageTemplate(specificAnime);
                });
              animeContent.innerHTML = '';
              document.body.scrollTop = 0; // For Safari
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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