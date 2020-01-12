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

    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const searchVar = userSearch.value;
        console.log(searchVar);
        const loadingAnimation = document.querySelector('.letter-holder');
        loadingAnimation.style = "display: block;";

        fetch(`https://api.jikan.moe/v3/search/anime?q=${searchVar}`)
            .then(function (resp) {
                if (resp.ok) {
                    return resp.json()
                }

                return resp.json().then(errorData => { 
                    const e = new Error ('Something went wrong');
                    e.data = errorData;
                    throw e;
                });
            })
            .then(function (data) {
                loadingAnimation.style = "display: none;";
                
                const animeContent = document.querySelector('.search-result__anime-content');
                animeContent.innerHTML = '';

                if (data.results.length == 0) {
                    animeContent.innerHTML = 'Nothing has been found';
                } else {
                    data.results.forEach(result => {
                        const itemElement = document.createElement('div');
                        itemElement.classList.add('search-result__anime-content__item');
                        animeContent.appendChild(itemElement);
    
                        const hoverElement = document.createElement('div');
                        hoverElement.classList.add('search-result__anime-content__hover');
                        itemElement.appendChild(hoverElement);
    
                        hoverElement.innerHTML = createItemHtml(result);
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