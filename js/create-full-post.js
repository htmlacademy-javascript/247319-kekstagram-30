const COMMENTS_PER_PAGE = 5;
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const photoDescription = document.querySelector('.social__caption');
const commentsList = document.querySelector('.social__comments');
const commentsCount = document.querySelector('.social__comment-shown-count');
const totalCommentsCount = document.querySelector('.social__comment-total-count');
const commentsLoader = document.querySelector('.comments-loader');
let commentsShownCount = COMMENTS_PER_PAGE;
let comments = [];

function createBigPhotoPost(photoData) {
  bigPictureImg.src = photoData.url;
  bigPictureImg.alt = photoData.description;
  photoDescription.textContent = photoData.description;
  likesCount.textContent = photoData.likes;
  comments = photoData.comments;
  commentsShownCount = COMMENTS_PER_PAGE;
  createCommentsForBigPhotoPost();
}

function createCommentsForBigPhotoPost() {
  commentsList.innerHTML = '';
  const commentsToShow = comments.slice(0, commentsShownCount);

  commentsToShow.forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');

    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentAvatar.width = 35;
    commentAvatar.height = 35;
    commentItem.appendChild(commentAvatar);

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;
    commentItem.appendChild(commentText);

    commentsList.appendChild(commentItem);
  });

  if (commentsShownCount >= comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
  commentsCount.textContent = Math.min(commentsShownCount, comments.length);
  totalCommentsCount.textContent = comments.length;
}

function onLoadMoreComments () {
  commentsShownCount += COMMENTS_PER_PAGE;
  if (commentsShownCount > comments.length) {
    commentsShownCount = comments.length;
  }
  createCommentsForBigPhotoPost();
}

commentsLoader.addEventListener('click', onLoadMoreComments);

export {createBigPhotoPost};
