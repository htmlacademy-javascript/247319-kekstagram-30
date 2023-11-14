const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectTitle = document.querySelectorAll('.effects__radio');

function changeScale(direction) {
  let currentValue = parseInt(scaleControlValue.value, 10);
  if (direction === 'smaller' && currentValue > 25) {
    currentValue -= 25;
  } else if (direction === 'bigger' && currentValue < 100) {
    currentValue += 25;
  }
  scaleControlValue.value = `${currentValue}%`;
  imgPreview.style.transform = `scale(${currentValue / 100})`;
}

scaleControlSmaller.addEventListener('click', () => {
  changeScale('smaller');
});

scaleControlBigger.addEventListener('click', () => {
  changeScale('bigger');
});

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  connect: 'lower',
});

function updateSliderOptions(min, max, step, unit) {
  slider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    step: step,
    unit: unit,
  });
}

function changeEffects(effect) {
  effectLevelValue.value = slider.noUiSlider.get();
  switch (effect) {
    case 'none':
      imgPreview.style.filter = 'none';
      effectLevel.style.display = 'none';
      break;
    case 'chrome':
      effectLevel.style.display = 'block';
      updateSliderOptions(0, 1, 0.1, '');
      imgPreview.style.filter = `grayscale(${effectLevelValue.value})`;
      break;
    case 'sepia':
      effectLevel.style.display = 'block';
      updateSliderOptions(0, 1, 0.1, '');
      imgPreview.style.filter = `sepia(${effectLevelValue.value})`;
      break;
    case 'marvin':
      effectLevel.style.display = 'block';
      updateSliderOptions(0, 100, 1, '%');
      imgPreview.style.filter = `invert(${effectLevelValue.value}%)`;
      break;
    case 'phobos':
      effectLevel.style.display = 'block';
      updateSliderOptions(0, 3, 0.1, 'px');
      imgPreview.style.filter = `blur(${effectLevelValue.value}px)`;
      break;
    case 'heat':
      effectLevel.style.display = 'block';
      updateSliderOptions(1, 3, 0.1, '');
      imgPreview.style.filter = `brightness(${effectLevelValue.value})`;
      break;
  }
}

effectTitle.forEach((radio) => {
  radio.addEventListener('change', () => {
    const currentEffect = document.querySelector('.effects__item input:checked').value;
    changeEffects(currentEffect);
    slider.noUiSlider.set(100);
  });
});

slider.noUiSlider.on('change', (values, handle) => {
  effectLevelValue.value = values[handle];
  const currentEffect = document.querySelector('.effects__item input:checked').value;
  changeEffects(currentEffect);
});

export {changeEffects};
