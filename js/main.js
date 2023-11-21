import {getData} from './network.js';
import {renderMiniPicture} from './mini-picture.js';
import {closeUploadImgForm, setUploadFormSubmit} from './upload-form.js';
import './effects-editor.js';
import {showFilters, sortingRandom, sortingDefault, sortingDiscussed} from './sorting.js';

getData()
  .then((miniPicture) => {
    renderMiniPicture(miniPicture);
    showFilters();
    sortingRandom();
    sortingDefault();
    sortingDiscussed();
  });

setUploadFormSubmit(closeUploadImgForm);
