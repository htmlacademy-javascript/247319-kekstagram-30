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

function toggleActiveClass (filter1, filter2, filter3) {
  filter1.classList.toggle(`${activeClassButton}`, true);
  filter2.classList.toggle(`${activeClassButton}`, false);
  filter3.classList.toggle(`${activeClassButton}`, false);
}


function sortingRandom (miniPictures) {
  const delayedRender = debounce((shuffledPictures) => {
    clearMiniPictures();
    renderMiniPicture(shuffledPictures.slice(0, MAX_COUNT_SORTING_RANDOM));
  }, RERENDER_DELAY);
  filterRandom.addEventListener('click', () => {
    const shuffledPictures = shuffleArray(miniPictures);
    toggleActiveClass(filterRandom, filterDefault, filterDiscussed);
    delayedRender(shuffledPictures);
  });
}

function sortingDefault (miniPictures) {
  const delayedRender = debounce(() => {
    clearMiniPictures();
    renderMiniPicture(miniPictures);
  }, RERENDER_DELAY);
  filterDefault.addEventListener('click', () => {
    toggleActiveClass(filterDefault, filterRandom, filterDiscussed);
    delayedRender();
  });
}


function sortingDiscussed (miniPictures) {
  const sortedPictures = sortByCommentsLength(miniPictures);
  const delayedRender = debounce(() => {
    clearMiniPictures();
    renderMiniPicture(sortedPictures);
  }, RERENDER_DELAY);
  filterDiscussed.addEventListener('click', () => {
    toggleActiveClass(filterDiscussed, filterDefault, filterRandom);
    delayedRender();
  });
}

export {showFilters, sortingRandom, sortingDefault, sortingDiscussed};
