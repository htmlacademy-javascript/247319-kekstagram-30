import {renderMiniPicture} from './mini-picture.js';
import {getData} from './network.js';
import {closeUploadImgForm, setUploadFormSubmit} from './form.js';
import './effects-editor.js';

getData()
  .then((miniPhoto) => {
    renderMiniPicture(miniPhoto);
  });

setUploadFormSubmit(closeUploadImgForm);
