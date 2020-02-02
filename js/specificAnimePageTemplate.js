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