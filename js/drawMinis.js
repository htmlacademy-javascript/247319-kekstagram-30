import {createSimilarPhotoDescriptions} from './data.js';

const MINI_PICTURE_PLACE = document.querySelector('.pictures');
const MINI_PICTURE_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
const SIMILAR_PHOTO_POSTS = createSimilarPhotoDescriptions();
const SIMILAR_POST_FRAGMENT = document.createDocumentFragment();

SIMILAR_PHOTO_POSTS.forEach((post) => {
  const MINI_PICTURE_ELEMENT = MINI_PICTURE_TEMPLATE.cloneNode(true);
  MINI_PICTURE_ELEMENT.querySelector('.picture__img').src = post.url;
  MINI_PICTURE_ELEMENT.querySelector('.picture__img').alt = post.description;
  MINI_PICTURE_ELEMENT.querySelector('.picture__likes').textContent = post.likes;
  MINI_PICTURE_ELEMENT.querySelector('.picture__comments').textContent = post.comments.length;
  SIMILAR_POST_FRAGMENT.append(MINI_PICTURE_ELEMENT);
});

const drawMinis = () => MINI_PICTURE_PLACE.append(SIMILAR_POST_FRAGMENT);

export {drawMinis};
