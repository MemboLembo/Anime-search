'use strict';
document.addEventListener("DOMContentLoaded", function (event) {

    const userSearch = document.querySelector('.search-form__content__input');
    const btn = document.querySelector('.search-form__content__btn');

    function createItemHtml (result) {
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
                </div>`
    };

    btn.addEventListener('click', function () {
        const searchVar = userSearch.value;
        console.log(searchVar);

        fetch(`https://api.jikan.moe/v3/search/anime?q=${searchVar}`)
            .then(function (resp) {
                return resp.json()
            })
            .then(function (data) {
                console.log(data);
                const animeContent = document.querySelector('.search-result__anime-content');

                data.results.forEach(result => {
                    const itemElement = document.createElement('div');
                    itemElement.classList.add('search-result__anime-content__item');
                    animeContent.appendChild(itemElement);

                    itemElement.innerHTML = createItemHtml(result);
                });

            })
            .catch(function (error) {
                console.error(error);
            });
    });
});