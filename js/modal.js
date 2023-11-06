import {isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureOpen = document.querySelector('.pictures');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentsBlock = document.querySelector('.social__comment-count');
const commentsLoaderButton = document.querySelector('.comments-loader');

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsBlock.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureOpen.addEventListener('click', () => {
  openBigPicture();
});

bigPictureClose.addEventListener('click', () => {
  closeBigPicture();
});

export {openBigPicture, closeBigPicture};
