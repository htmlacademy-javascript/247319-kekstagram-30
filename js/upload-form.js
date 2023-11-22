import {isEscapeKey} from './utils.js';
import {changeEffects} from './effects-editor.js';
import {sendData} from './network.js';
import {showSuccessUploadMessage, showErrorPhotoUploadMessage} from './action-messages.js';

const HASGTAG_EXPRESSION_FOR_VALIDATION = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAGS_COUNT_MAX = 5;
const COMMENT_LENGTH_MAX = 140;
const ErrorMessage = {
  INVALID_HASHTAG_ERROR: 'Миву! Введён невалидный хэш-тег. Должен состоять из букв и чисел и не может содержать пробелы, спецсимволы и эмодзи. Длина не более 20 символов!',
  INVALID_HASHTAGS_COUNT_ERROR: 'Миву! Превышено количество хэш-тегов. Не более 5',
  REPEAT_HASHTAG_ERROR: 'Миву! Хэш-теги повторяются. Сделай их уникальными)',
  LENGTH_COMMENT_ERROR: `Миву! Длина комментария больше ${COMMENT_LENGTH_MAX} символов`,
};
const SubmitButtonText = {
  ACTION: 'Опубликовать',
  POSTING: 'Публикую...'
};
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const uploadForm = document.querySelector('.img-upload__form');
const imgUpload = document.querySelector('.img-upload__overlay');
const imgUploadPlace = document.querySelector('.img-upload__input');
const body = document.querySelector('body');
const imgUploadClose = document.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const imgPreview = document.querySelector('.img-upload__preview img');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'h2',
});

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !hashtagsInput.matches(':focus') && !commentInput.matches(':focus')) {
    evt.preventDefault();
    const errorWindow = document.querySelector('.error');
    if (!errorWindow) {
      closeUploadImgForm();
    }
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
  pristine.reset();
  uploadForm.reset();
  imgPreview.style.transform = 'scale(1)';
  imgPreview.style.filter = 'none';
  imgPreview.src = '';
}

imgUploadPlace.addEventListener('change', () => {
  const file = imgUploadPlace.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
  openUploadImgForm();
  const effectsPreview = uploadForm.querySelectorAll('.effects__preview');
  effectsPreview.forEach((preview) => {
    preview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  });
  changeEffects('none');
});

imgUploadClose.addEventListener('click', () => {
  closeUploadImgForm();
});

function validateHashtags () {
  const hashtags = hashtagsInput.value.toLowerCase().trim().split(/\s+/);

  for (let i = 0; i < hashtags.length; i++) {
    const tag = hashtags[i];

    if (tag === '') {
      continue;
    }

    if (tag.startsWith('#')) {
      const tagContent = tag.slice(1);
      if (tagContent.length >= 1 && tagContent.length <= 19) {
        if (HASGTAG_EXPRESSION_FOR_VALIDATION.test(tag)) {
          continue;
        }
      }
    }
    return false;
  }
  return true;
}

function validateUniqueHashtags () {
  const hashtags = hashtagsInput.value.toLowerCase().trim().split(/\s+/);
  const uniqueHashtags = new Set(hashtags);

  return uniqueHashtags.size === hashtags.length;
}

function validateCountHashtags () {
  const hashtags = hashtagsInput.value.toLowerCase().trim().split(/\s+/);

  return hashtags.length <= HASHTAGS_COUNT_MAX;
}

function validateCommentLength () {
  return commentInput.value.length <= COMMENT_LENGTH_MAX;
}

pristine.addValidator(hashtagsInput, validateHashtags, ErrorMessage.INVALID_HASHTAG_ERROR, 1, true);
pristine.addValidator(hashtagsInput, validateUniqueHashtags, ErrorMessage.REPEAT_HASHTAG_ERROR, 2, true);
pristine.addValidator(hashtagsInput, validateCountHashtags, ErrorMessage.INVALID_HASHTAGS_COUNT_ERROR, 3, true);
pristine.addValidator(commentInput, validateCommentLength, ErrorMessage.LENGTH_COMMENT_ERROR);

function blockSubmitButton () {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.POSTING;
}

function unblockSubmitButton () {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.ACTION;
}

const setUploadFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!pristine.validate()) {
      evt.preventDefault();
    } else {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          showSuccessUploadMessage();
          onSuccess();
        })
        .catch(() => {
          showErrorPhotoUploadMessage();
        })
        .finally(unblockSubmitButton);
    }
  });
};

export {setUploadFormSubmit, closeUploadImgForm};
