# Anime-search [[link]](https://membolembo.github.io/anime/index.html)
Anime themed project in Vanilla JS developed for training purpose.

This website is using Unofficial MyAnimeList API - [Jikan](https://jikan.docs.apiary.io/#reference).

Provides an anime search ability by name and detailed info page about selected entry ([in progress](https://github.com/MemboLembo/Anime-search/issues/10)).

To search anime that you are interested in, you have to enter at least 3 letters.
Symbols that are allowed are letters of english alphabet and numbers.
## Getting Started
Usage of this website is quite simple. All u need to do is clone repository, compile `sass` files and run local server.

```shell script
git clone https://github.com/MemboLembo/Anime-search.git
cd Anime-search
npm install
npm run sass

npx http-server .
```

`http-server` is as example here. You can use any other static HTTP server you like.

For dev process it's recommended to run `sass` compiler in `watch` mode:
```shell
npm run sass --watch
```
