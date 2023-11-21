import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');

function showMessage (typeMessage, idTemplate, classMessage) {
  const messageTemplate = document.querySelector(idTemplate).content;
  const message = messageTemplate.cloneNode(true).querySelector(classMessage);

  document.body.append(message);

  document.addEventListener('keydown', onKeydown);
  document.addEventListener('click', closeAfterClickOutside);

  const closeButton = document.querySelector(`.${typeMessage}__button`);

  function closeMessageWindow () {
    message.remove();
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', closeAfterClickOutside);
  }

  closeButton.addEventListener('click', () => {
    closeMessageWindow();
  });

  function onKeydown (evt) {
    if(isEscapeKey(evt)) {
      closeMessageWindow();
    }
  }

  function closeAfterClickOutside (evt) {
    if(message.contains(evt.target)) {
      closeMessageWindow();
    }
  }
}

function showErrorPhotoUploadMessage () {
  showMessage('error', '#error', '.error');
}

function showSuccessUploadMessage () {
  showMessage('success', '#success', '.success');
}

function showErrorDataDownloadMessage () {
  const dataErrorMessageTemplate = document.querySelector('#data-error').content;
  const dataErrorMessage = dataErrorMessageTemplate.cloneNode(true).querySelector('.data-error');

  body.append(dataErrorMessage);

  setTimeout(() => {
    dataErrorMessage.remove ();
  }, 5000);
}

export {showErrorPhotoUploadMessage, showErrorDataDownloadMessage, showSuccessUploadMessage};
