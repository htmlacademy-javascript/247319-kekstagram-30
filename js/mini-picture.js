import {openBigPicture} from './modal.js';
import {createBigPhotoPost} from './big-photo-post.js';

const miniPictureTemplate = document.querySelector('#picture').content;
const miniPicturePlace = miniPictureTemplate.querySelector('.picture');
const similarPhotoPostsFragment = document.createDocumentFragment();

const createMiniPicture = (pictures) => {
  pictures.forEach((post) => {
    const miniPicture = miniPicturePlace.cloneNode(true);
    miniPicture.addEventListener('click', () => {
      openBigPicture();
      createBigPhotoPost(post);
    });
    miniPicture.querySelector('.picture__img').src = post.url;
    miniPicture.querySelector('.picture__img').alt = post.description;
    miniPicture.querySelector('.picture__likes').textContent = post.likes;
    miniPicture.querySelector('.picture__comments').textContent = post.comments.length;
    similarPhotoPostsFragment.append(miniPicture);
  });
  return similarPhotoPostsFragment;
};

const renderMiniPicture = (pictures) => {
  const miniPicturesList = document.querySelector('.pictures');
  const similarPictures = createMiniPicture(pictures);
  miniPicturesList.append(similarPictures);
  return miniPicturesList.querySelectorAll('.picture');
};

export {renderMiniPicture};
