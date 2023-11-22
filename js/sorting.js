import {renderMiniPicture, clearMiniPictures} from './mini-picture.js';
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

function sortingRandom(miniPicture) {
  const delayedRender = debounce((shuffledPictures) => {
    renderMiniPicture(shuffledPictures.slice(0, MAX_COUNT_SORTING_RANDOM));
  }, RERENDER_DELAY);

  filterRandom.addEventListener('click', () => {
    filterDefault.classList.remove(`${activeClassButton}`);
    filterDiscussed.classList.remove(`${activeClassButton}`);
    filterRandom.classList.add(`${activeClassButton}`);
    const shuffledPictures = shuffleArray(miniPicture);
    clearMiniPictures();
    delayedRender(shuffledPictures);
  });
}

function sortingDefault (miniPicture) {
  const delayedRender = debounce(() => {
    renderMiniPicture(miniPicture);
  }, RERENDER_DELAY);
  filterDefault.addEventListener('click', () => {
    filterDiscussed.classList.remove(`${activeClassButton}`);
    filterRandom.classList.remove(`${activeClassButton}`);
    filterDefault.classList.add(`${activeClassButton}`);
    clearMiniPictures();
    delayedRender();
  });
}


function sortingDiscussed (miniPicture) {
  const sortedPictures = sortByCommentsLength(miniPicture);
  const delayedRender = debounce(() => renderMiniPicture(sortedPictures), RERENDER_DELAY);
  filterDiscussed.addEventListener('click', () => {
    filterDefault.classList.remove(`${activeClassButton}`);
    filterRandom.classList.remove(`${activeClassButton}`);
    filterDiscussed.classList.add(`${activeClassButton}`);
    clearMiniPictures();
    delayedRender();
  });
}

export {showFilters, sortingRandom, sortingDefault, sortingDiscussed};
