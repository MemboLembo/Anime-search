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
        
        fetch(`https://api.jikan.moe/v3/search/anime?q=${searchVar}`)
            .then(function (resp) {
                return resp.json()
            })
            .then(function (data) {
                console.log(data);
                const animeContent = document.querySelector('.search-result__anime-content');
                animeContent.innerHTML = '';

                data.results.forEach((result, i) => {
                    const itemElement = document.createElement('div');
                    itemElement.classList.add('search-result__anime-content__item');
                    animeContent.appendChild(itemElement);

                    const hoverElement = document.createElement('div');
                    hoverElement.classList.add('search-result__anime-content__hover');
                    hoverElement.id = i;
                    itemElement.appendChild(hoverElement);

                    hoverElement.innerHTML = createItemHtml(result);
                });

                for (let i = 0; i < 3; i++) {
                    const lastRow = document.createElement('div');
                    lastRow.classList.add('search-result__anime-content__item', 'search-result__anime-content__item_last-row');
                    animeContent.appendChild(lastRow);
                }

                animeContent.addEventListener('click', function(event) {
                    let target = event.target;
                    let i;
                    if (target.classList.contains('search-result__anime-content__hover')) {
                        console.log('first');
                        i = target.id;
                    } else if (target.parentElement.classList.contains('search-result__anime-content__hover')) {
                        console.log('sec');
                        i = target.parentElement.id;
                    } else if (target.parentElement.parentElement.classList.contains('search-result__anime-content__hover')) {
                        console.log('third');
                        i = target.parentElement.parentElement.id;
                    }
                    console.log(i); //number of anime in Obj
                    console.log(data.results[i]); //back to Obj
                    animeContent.innerHTML = ''; //clear anime list
                    //scroll page up or fix by html css
                    ///anime/{id}(/request) | fetch |
                    //whren click read id of anime> not index
                    // addEventlistener for each element or move if-else to separate func
                });
            })
            .catch(function (error) {
                console.error(error);
            });
    });
});