const body = document.querySelector('body');
const isEscapeKey = (evt) => evt.key === 'Escape';

function showErrorPhotoUploadMessage() {
  const errorMessageTemplate = document.querySelector('#error').content;
  const errorFragment = document.createDocumentFragment();
  const errorMessage = errorMessageTemplate.cloneNode(true);
  errorFragment.append(errorMessage);

  body.append(errorFragment);

}

function showErrorDataDownloadMessage() {
  const dataErrorMessageTemplate = document.querySelector('#data-error').content;
  const dataErrorFragment = document.createDocumentFragment();
  const dataErrorMessage = dataErrorMessageTemplate.cloneNode(true);
  dataErrorFragment.append(dataErrorMessage);

  body.append(dataErrorFragment);
}

function showSuccessUploadMessage() {
  const successUploadMessageTemplate = document.querySelector('#success').content;
  const successUploadFragment = document.createDocumentFragment();
  const successUploadMessage = successUploadMessageTemplate.cloneNode(true);
  successUploadFragment.append(successUploadMessage);

  body.append(successUploadFragment);
}

export {isEscapeKey, showErrorPhotoUploadMessage, showErrorDataDownloadMessage, showSuccessUploadMessage};
