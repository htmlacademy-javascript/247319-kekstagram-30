import {isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

function onDocumentKeydown(event) {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closeBigPicture();
  }
}

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureClose.addEventListener('click', () => {
  closeBigPicture();
});

export {openBigPicture, closeBigPicture};
