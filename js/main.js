import {getData} from './network.js';
import {renderMiniPicture} from './mini-pictures.js';
import {closeUploadImgForm, setUploadFormSubmit} from './upload-form.js';
import './effects-editor.js';

getData()
  .then((miniPhoto) => {
    renderMiniPicture(miniPhoto);
  });

setUploadFormSubmit(closeUploadImgForm);
