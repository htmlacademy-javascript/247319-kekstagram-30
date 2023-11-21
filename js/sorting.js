import {renderMiniPicture, clearMiniPictures} from './mini-picture.js';
import {getData} from './network.js';
import {shuffleArray, sortByCommentsLength, debounce} from './utils.js';

const RERENDER_DELAY = 500;
const MAX_COUNT_SORTING_RANDOM = 10;
const filterButtons = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const activeClassButton = 'img-filters__button--active';

function showFilters () {
  filterButtons.classList.remove('img-filters--inactive');
}

function sortingRandom () {
  filterRandom.addEventListener('click', () => {
    clearMiniPictures();
    filterDefault.classList.remove(`${activeClassButton}`);
    filterDiscussed.classList.remove(`${activeClassButton}`);
    filterRandom.classList.add(`${activeClassButton}`);
    getData()
      .then((miniPicture) => {
        const shuffledPictures = shuffleArray(miniPicture);
        const delayedRender = debounce(() => {
          renderMiniPicture(shuffledPictures.splice(MAX_COUNT_SORTING_RANDOM));
        }, RERENDER_DELAY);
        delayedRender();
      });
  });
}

function sortingDefault () {
  filterDefault.addEventListener('click', () => {
    clearMiniPictures();
    filterDiscussed.classList.remove(`${activeClassButton}`);
    filterRandom.classList.remove(`${activeClassButton}`);
    filterDefault.classList.add(`${activeClassButton}`);
    getData()
      .then((miniPicture) => {
        const delayedRender = debounce(() => renderMiniPicture(miniPicture), RERENDER_DELAY);
        delayedRender();
      });
  });
}

function sortingDiscussed () {
  filterDiscussed.addEventListener('click', () => {
    clearMiniPictures();
    filterDefault.classList.remove(`${activeClassButton}`);
    filterRandom.classList.remove(`${activeClassButton}`);
    filterDiscussed.classList.add(`${activeClassButton}`);
    getData()
      .then((miniPicture) => {
        const sortedPictures = sortByCommentsLength(miniPicture);
        const delayedRender = debounce(() => renderMiniPicture(sortedPictures), RERENDER_DELAY);
        delayedRender();
      });
  });
}

export {showFilters, sortingRandom, sortingDefault, sortingDiscussed};
