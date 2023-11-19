import {showErrorDataDownloadMessage, showErrorPhotoUploadMessage, showSuccessUploadMessage} from './utils.js';

const getData = () => fetch('https://30.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if(!response.ok) {
      throw new Error(showErrorDataDownloadMessage());
    }
    return response.json();
  })
  .catch(() => {
    throw new Error(showErrorDataDownloadMessage());
  });

const sendData = (body) => fetch(
  'https://30.javascript.pages.academy/kekstagram',
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(showErrorPhotoUploadMessage());
    }
    return showSuccessUploadMessage();
  })
  .catch(() => {
    throw new Error(showErrorPhotoUploadMessage());
  });

export {getData, sendData};
