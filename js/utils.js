const isEscapeKey = (event) => event.key === 'Escape';

function shuffleArray (miniPictures) {
  return miniPictures.slice().sort(() => Math.random() - 0.5);
}

function sortByCommentsLength (miniPictures) {
  return miniPictures.slice().sort((current, next) => next.comments.length - current.comments.length);
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscapeKey, shuffleArray, sortByCommentsLength, debounce};
