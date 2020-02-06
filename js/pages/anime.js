import { fetchUrl } from '../utils.js';
import { loadingAnimationToggle } from '../dom-utils.js';
import { setInputVal } from '../dom-utils.js';
import { setErrorOutput } from '../dom-utils.js';
import { goTo } from '../router.js';
import { removeListenerOfScroll } from '../dom-utils.js';

export async function renderAnime(id, container) {
  removeListenerOfScroll();
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

  loadingAnimationToggle("display: block;");
  setInputVal('');
  setErrorOutput('');
  container.innerHTML = '';

  try {
    const specificAnime = await fetchUrl(`https://api.jikan.moe/v3/anime/${id}`);
    loadingAnimationToggle("display: none;");
    container.classList.add('search-result__anime-content_specific-anime');

    container.innerHTML = specificAnimeTemplate(specificAnime);

    animeReferenceListener();
  } catch(error) {
    loadingAnimationToggle("display: none;");
    if (error.message === 'Something went wrong') {
      setErrorOutput(`Something went wrong, try again later`);
    } else {
      setErrorOutput('Failed to connect');
    }
  }
}

function specificAnimeTemplate (anime) {
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
    animeInfoTemplate('trailer_url', embedVideoTemplate(anime.trailer_url)) + 
    animeInfoTemplate('related', '<span>Related: </span>' + getRelatedAnimes(anime.related));
}

function animeInfoTemplate (className, info = '-') {
  return `<div class="search-result__anime-content_specific-anime-${className}">${info}</div>`;
}

function checkTitleExistence (title) {
  return title || '';
}

function formatDate (dateWithWrongFormat) {
  if (dateWithWrongFormat) {
    const date = new Date(dateWithWrongFormat);

    const year = date.getFullYear();
    const month = String(date.getMonth()).padStart(2, '0');
    const day = String(date.getDay()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  }
  return '-';
}

function getNameListFromObjects (objects) {
  if (objects && objects.length !== 0) {
    return objects.map(o => o.name).join(', ');
  }
  return '-';
}

function embedVideoTemplate (videoUrl) {
  if (videoUrl) {
    return `<iframe width="560" height="315" src="${videoUrl.replace('autoplay=1', 'autoplay=0')}" allowfullscreen
            frameborder="0" allow="accelerometer; autoplay = 0; encrypted-media; gyroscope; picture-in-picture"  >
              Your browser does not support iframes!
            </iframe>`
  }
  return '-';
}

function getRelatedAnimes(relatedAnimesObj) {
  if (relatedAnimesObj && Object.keys(relatedAnimesObj).length !== 0) {
    let groupNamesHolder = '';
    for (let [key, animesInfo] of Object.entries(relatedAnimesObj)) {
      let namesHolder = [];
      for (let anime of animesInfo) {
        namesHolder.push(`<li id="${anime.mal_id}" class="anime-links">${anime.name}</li>`);
      }
      groupNamesHolder += `<ul class="group-names">
                  <span>${key}: </span> 
                  ${namesHolder.join('')}
              </ul>`;
    }
    return groupNamesHolder;
  }
  return '-';
}

function animeReferenceListener() {
  let list = document.querySelector('.search-result__anime-content_specific-anime-related');
  list.addEventListener('click', function(event) {
    let target = event.target;
    if (target && target.classList.contains('anime-links')) {
      goTo('anime/' + target.id);
    }
  })

}