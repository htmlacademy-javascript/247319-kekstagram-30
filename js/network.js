import {showErrorDataDownloadMessage} from './action-messages.js';

const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const getData = () => fetch(`${BASE_URL}${Route.GET_DATA}`)
  .then((response) => {
    if(!response.ok) {
      throw new Error('Произошла ошибка при загрузке данных');
    }
    return response.json();
  })
  .catch(() => {
    showErrorDataDownloadMessage();
  });

const sendData = (body) => fetch(
  `${BASE_URL}${Route.SEND_DATA}`,
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Произошла ошибка при отправке данных');
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });

export {getData, sendData};
