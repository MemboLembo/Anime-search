const buttonScrollTop = document.querySelector('.button-scroll-top');
buttonScrollTop.addEventListener('click', scrollToTop);

export function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    buttonScrollTop.style = "display: block;";
  } else {
    buttonScrollTop.style = "display: none;";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}