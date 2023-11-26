const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const uploadForm = document.querySelector('.img-upload__form');
const imgUploadPlace = document.querySelector('.img-upload__input');
const imgPreview = document.querySelector('.img-upload__preview img');

function getUserImage () {
  const file = imgUploadPlace.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
  const effectPreviews = uploadForm.querySelectorAll('.effects__preview');
  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  });
}

export {getUserImage};
