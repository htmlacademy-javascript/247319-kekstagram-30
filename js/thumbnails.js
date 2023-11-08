import {createSimilarPhotoPosts} from './data.js';
import {openBigPicture} from './modal.js';
import {createBigPhotoPost} from './big-photo-post.js';

const miniPicturePlace = document.querySelector('.pictures');
const miniPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPhotoPosts = createSimilarPhotoPosts();
const similarPhotoPostsFragment = document.createDocumentFragment();

similarPhotoPosts.forEach((post) => {
  const miniPicture = miniPictureTemplate.cloneNode(true);

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

const renderThumbnails = () => miniPicturePlace.append(similarPhotoPostsFragment);

export {renderThumbnails};
