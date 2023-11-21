import {showErrorDataDownloadMessage, showErrorPhotoUploadMessage, showSuccessUploadMessage} from './action-messages.js';

const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const getData = () => fetch(`${BASE_URL}${Route.GET_DATA}`)
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
  `${BASE_URL}${Route.SEND_DATA}`,
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(showErrorPhotoUploadMessage());
    }
    return showSuccessUploadMessage();
  });

export {getData, sendData};
