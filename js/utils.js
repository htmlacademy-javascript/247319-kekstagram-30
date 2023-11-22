const isEscapeKey = (evt) => evt.key === 'Escape';

function shuffleArray(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

function sortByCommentsLength(miniPicture) {
  return miniPicture.slice().sort((a, b) => b.comments.length - a.comments.length);
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscapeKey, shuffleArray, sortByCommentsLength, debounce};
