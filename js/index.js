'use strict';
document.addEventListener("DOMContentLoaded", function (event) {

  const userSearch = document.querySelector('.search-form__content__input');
  const btn = document.querySelector('.search-form__content__btn');

  function createItemHtml(result) {
    const {
      title,
      score,
      image_url: imageUrl,
      episodes: episodeCount
    } = result;
    return `<div class="search-result__anime-content__title">${title}</div>
          <div class="search-result__anime-content__img">
            <img src="${imageUrl}" alt="image">
          </div>
          <div class="search-result__anime-content__bottom">
            <div class="search-result__anime-content__score">&#x2605 ${score}</div>
            <div class="search-result__anime-content__episodes">ep. ${episodeCount}</div>
          </div>`;
  }

  function animeInfoTemplate(className, info = '-') {
    return `<div class="search-result__anime-content_specific-anime-${className}">${info}</div>`;
  }

  function checkTitleExistence(title) {
    if (title) {
      return title;
    }
    return '';
  }

  function formatDate(dateWithWrongFormat) {
    if (dateWithWrongFormat) {
      const date = new Date(dateWithWrongFormat);
      const year = date.getFullYear();
      const mounth = date.getMonth();
      const day = date.getDay();
      return year + '.' +
             (mounth > 9 ? mounth : String(mounth).padStart(2, '0')) + '.' +
             (day > 9 ? day : String(day).padStart(2, '0'))
    }
    return '-';
  }

  function getNameListFromObjects(objects) {
    if (objects && objects.length !== 0) {
      return objects.map(o => o.name).join(', ');
    }
    return '-';
  }

  function checkVideoExistence(videoUrl) {
    if (videoUrl) {
      return `<iframe width="560" height="315" src="${videoUrl.replace('autoplay=1','autoplay=0')}" + 
      frameborder="0" allow="accelerometer; autoplay = 0; encrypted-media; gyroscope; picture-in-picture" + 
      allowfullscreen>Your browser does not support iframes!</iframe>`
    }
    return '-';
  }

  function specificAnimePageTemplate(anime) {
    return animeInfoTemplate('imageUrl', `<img src="${anime.image_url}" alt="image">`) + 
      animeInfoTemplate('title', checkTitleExistence(anime.title)) + 
      animeInfoTemplate('score', "<span>&#x2605 </span>" + anime.score) + 
      animeInfoTemplate('scored_by', '<span>Scored_by: </span>' + anime.scored_by) + 
      animeInfoTemplate('title_english', checkTitleExistence(anime.title_english)) + 
      animeInfoTemplate('title_japanese', checkTitleExistence(anime.title_japanese)) + 
      `<hr>` + 
      animeInfoTemplate('status', '<span>Status: </span>' + anime.status) + 
      animeInfoTemplate('aired', '<span>Aired: </span>  from: ' + formatDate(anime.aired.from) + ', to: ' + formatDate(anime.aired.to)) + 
      animeInfoTemplate('genres', '<span>Genres: </span>' + getNameListFromObjects(anime.genres)) + 
      animeInfoTemplate('source', '<span>Source: </span>' + anime.source) + 
      animeInfoTemplate('producers', '<span>Producers: </span>' + getNameListFromObjects(anime.producers)) + 
      animeInfoTemplate('licensors', '<span>Licensors: </span>' + getNameListFromObjects(anime.licensors)) + 
      animeInfoTemplate('type', '<span>Type: </span>' + anime.type) + 
      animeInfoTemplate('synopsis', '<span>Synopsis: </span>' + anime.synopsis) + 
      animeInfoTemplate('duration', '<span>Duration: </span>' + anime.duration) + 
      animeInfoTemplate('episodes', '<span>Episodes: </span>' + anime.episodes) + 
      `<div class='trailer-name'><span>Trailer: </span></div>` + 
      animeInfoTemplate('trailer_url', checkVideoExistence(anime.trailer_url));
  }

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