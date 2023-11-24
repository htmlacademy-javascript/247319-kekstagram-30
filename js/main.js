import {getData} from './network.js';
import {renderMiniPicture} from './mini-picture.js';
import {closeUploadImgForm, setUploadFormSubmit} from './upload-form.js';
import './effects-editor.js';
import {showFilters, sortingRandom, sortingDefault, sortingDiscussed} from './sorting.js';

getData()
  .then((miniPictures) => {
    if (typeof miniPictures !== 'undefined') {
      renderMiniPicture(miniPictures);
      showFilters();
      sortingRandom(miniPictures);
      sortingDefault(miniPictures);
      sortingDiscussed(miniPictures);
    }
  });

setUploadFormSubmit(closeUploadImgForm);
