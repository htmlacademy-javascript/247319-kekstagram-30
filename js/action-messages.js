const body = document.querySelector('body');
const isEscapeKey = (evt) => evt.key === 'Escape';

function showErrorPhotoUploadMessage () {
  const errorMessageTemplate = document.querySelector('#error').content;
  const errorMessage = errorMessageTemplate.cloneNode(true).querySelector('.error');

  document.body.append(errorMessage);

  document.addEventListener('keydown', onKeydown);
  document.addEventListener('click', closeAfterClickOutside);

  const tryAgainButton = document.querySelector('.error__button');

  function closeTryAgainWindow () {
    errorMessage.remove();
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', closeAfterClickOutside);
  }

  tryAgainButton.addEventListener('click', () => {
    closeTryAgainWindow();
  });

  function onKeydown (evt) {
    if(isEscapeKey(evt)) {
      closeTryAgainWindow();
    }
  }

  function closeAfterClickOutside (evt) {
    if(errorMessage.contains(evt.target)) {
      closeTryAgainWindow();
    }
  }
}

function showErrorDataDownloadMessage () {
  const dataErrorMessageTemplate = document.querySelector('#data-error').content;
  const dataErrorMessage = dataErrorMessageTemplate.cloneNode(true).querySelector('.data-error');

  body.append(dataErrorMessage);

  setTimeout(() => {
    dataErrorMessage.remove ();
  }, 5000);
}

function showSuccessUploadMessage () {
  const successUploadMessageTemplate = document.querySelector('#success').content;
  const successUploadMessage = successUploadMessageTemplate.cloneNode(true).querySelector('.success');

  body.append(successUploadMessage);

  document.addEventListener('keydown', onKeydown);
  document.addEventListener('click', closeAfterClickOutside);

  const successButton = document.querySelector('.success__button');

  function closeSuccessWindow () {
    successUploadMessage.remove();
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', closeAfterClickOutside);
  }

  successButton.addEventListener('click', () => {
    closeSuccessWindow();
  });

  function onKeydown (evt) {
    if(isEscapeKey(evt)) {
      closeSuccessWindow();
    }
  }

  function closeAfterClickOutside (evt) {
    if(successUploadMessage.contains(evt.target)) {
      closeSuccessWindow();
    }
  }
}

export {isEscapeKey, showErrorPhotoUploadMessage, showErrorDataDownloadMessage, showSuccessUploadMessage};
