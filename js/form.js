import {isEscapeKey} from './utils.js';

const uploadForm = document.querySelector('.img-upload__form');
const imgUpload = document.querySelector('.img-upload__overlay');
const imgUploadPlace = document.querySelector('.img-upload__input');
const body = document.querySelector('body');
const imgUploadClose = document.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const HASHTAGS_COUNT_MAX = 5;
const COMMENT_LENGTH_MAX = 140;
const ErrorMessage = {
  INVALID_HASHTAG_ERROR: 'Миву! Введён невалидный хэш-тег. Должен состоять из букв и чисел и не может содержать пробелы, спецсимволы и эмодзи. Длина не более 20 символов!',
  INVALID_HASHTAGS_COUNT_ERROR: 'Миву! Превышено количество хэш-тегов. Не более 5',
  REPEAT_HASHTAG_ERROR: 'Миву! Хэш-теги повторяются. Сделай их уникальными)',
  LENGTH_COMMENT_ERROR: `Миву! Длина комментария больше ${COMMENT_LENGTH_MAX} символов`,
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'h2',
}, false);

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !hashtagsInput.matches(':focus') && !commentInput.matches(':focus')) {
    evt.preventDefault();
    closeUploadImgForm();
  }
}

function openUploadImgForm () {
  imgUpload.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUploadImgForm () {
  imgUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadPlace.value = '';
  hashtagsInput.value = '';
  commentInput.value = '';
  pristine.reset();
}

imgUploadPlace.addEventListener('change', () => {
  openUploadImgForm();
});

imgUploadClose.addEventListener('click', () => {
  closeUploadImgForm();
});

function validateHashtags () {
  const hashtags = hashtagsInput.value.toLowerCase().trim().split(' ');

  for (let i = 0; i < hashtags.length; i++) {
    const tag = hashtags[i];

    if (tag === '') {
      continue;
    }

    if (tag.startsWith('#')) {
      const tagContent = tag.slice(1);
      if (tagContent.length > 1 && tagContent.length <= 19) {
        if (/^#[a-zа-яё0-9]{1,19}$/i.test(tag)) {
          continue;
        }
      }
    }

    return false;
  }

  return true;
}

function validateUniqueHashtags () {
  const hashtags = hashtagsInput.value.toLowerCase().trim().split(' ');
  const uniqueHashtags = new Set(hashtags);

  return uniqueHashtags.size === hashtags.length;
}

function validateCountHashtags () {
  const hashtags = hashtagsInput.value.toLowerCase().trim().split(' ');
  return hashtags.length <= HASHTAGS_COUNT_MAX;
}

function validateCommentLength () {
  return commentInput.value.length <= COMMENT_LENGTH_MAX;
}

pristine.addValidator(hashtagsInput, validateHashtags, ErrorMessage.INVALID_HASHTAG_ERROR, 1, true);
pristine.addValidator(hashtagsInput, validateUniqueHashtags, ErrorMessage.REPEAT_HASHTAG_ERROR, 2, true);
pristine.addValidator(hashtagsInput, validateCountHashtags, ErrorMessage.INVALID_HASHTAGS_COUNT_ERROR, 3, true);
pristine.addValidator(commentInput, validateCommentLength, ErrorMessage.LENGTH_COMMENT_ERROR);

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
