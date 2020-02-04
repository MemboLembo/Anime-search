export function createItemHtml (result) {
  const {
    title,
    score,
    image_url: imageUrl,
    episodes : episodeCount
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