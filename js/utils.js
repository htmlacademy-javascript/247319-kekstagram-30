const isEscapeKey = (evt) => evt.key === 'Escape';

function shuffleArray(arr) {
  return arr.slice().sort(() => Math.random() - 0.5);
}

function sortByCommentsLength(miniPicture) {
  return miniPicture.slice().sort((a, b) => b.comments.length - a.comments.length);
}

function debounce (callback, timeoutDelay) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {isEscapeKey, shuffleArray, sortByCommentsLength, debounce};
