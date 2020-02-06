export function loadingAnimationToggle(display) {
  const loadingAnimation = document.querySelector('.letter-holder');
loadingAnimation.style = display;
}

export function setInputVal(value) {
  const userSearch = document.querySelector('.search-form__content__input');
  userSearch.value = decodeURIComponent(value);
}

export function setErrorOutput(output) {
  const errorsOutput = document.querySelector('.errors');
  errorsOutput.innerText = output;
}

let scrollData, urlForCheck;
export function setScrollTop() {
  if (scrollData && window.location.hash === urlForCheck) {
    document.documentElement.scrollTop = scrollData;
  }
}

function scrollAndUrlHolder() {
  scrollData = document.documentElement.scrollTop;
  urlForCheck = window.location.hash;
}

export function addListenerOfScroll() {
  window.addEventListener('scroll', scrollAndUrlHolder );
}

export function removeListenerOfScroll() {
  window.removeEventListener('scroll', scrollAndUrlHolder );
}