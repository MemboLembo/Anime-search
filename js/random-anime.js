import { goTo } from './router.js';

export async function randomAnime() {
  let request, animeId;
  do {
    try {
      const lastAnimeId = 100000;
      const id = Math.floor(Math.random() * Math.floor(lastAnimeId));
      request = await fetch(`https://api.jikan.moe/v3/anime/${id}`);
      animeId = id;
    } catch(error) { 
      loadingAnimationToggle("display: none;");
      if (error.message === 'Something went wrong') {
        setErrorOutput(`Something went wrong, try again later`);
      } else {
        setErrorOutput('Failed to connect');
      }
    }
  } while (request.status !== 200)

  goTo('anime/' + animeId);
}