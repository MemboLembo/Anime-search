export function loadingAnimationToggle(display) {
  const loadingAnimation = document.querySelector('.letter-holder');
loadingAnimation.style = display;
}

export function setInputVal(value) {
  const userSearch = document.querySelector('.search-form__content__input');
  userSearch.value = value;
}