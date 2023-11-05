const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const photoDescription = document.querySelector('.social__caption');
const commentsList = document.querySelector('.social__comments');
const commentsCount = document.querySelector('.social__comment-shown-count');
const totalCommentsCount = document.querySelector('.social__comment-total-count');

function createBigPhotoPost(photoData) {
  bigPictureImg.src = photoData.url;
  bigPictureImg.alt = photoData.description;
  photoDescription.textContent = photoData.description;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length;
  totalCommentsCount.textContent = photoData.comments.length;

  commentsList.innerHTML = '';
  photoData.comments.forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');

    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentAvatar.width = 35;
    commentAvatar.height = 35;

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;

    commentItem.appendChild(commentAvatar);
    commentItem.appendChild(commentText);
    commentsList.appendChild(commentItem);
  });
}

export {createBigPhotoPost};
