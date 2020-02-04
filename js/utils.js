export function fetchUrl (url) {
  return fetch(url)
    .then(function (resp) {
      if (resp.ok) {
        return resp.json();
      }

      return resp.json().then(errorData => {
        const e = new Error('Something went wrong');
        e.data = errorData;
        throw e;
      });
    });
}