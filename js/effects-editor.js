const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectTitle = document.querySelectorAll('.effects__radio');

function changeScale (direction) {
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

function updateSliderOptions (min, max, step, unit) {
  slider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    step: step,
    unit: unit,
  });
}

function changeEffects (effect) {
  effectLevelValue.value = slider.noUiSlider.get();
  if (effect === 'none') {
    effectLevel.style.display = 'none';
  } else {
    effectLevel.style.display = 'block';
  }
  switch (effect) {
    case 'none':
      imgPreview.style.filter = 'none';
      break;
    case 'chrome':
      imgPreview.style.filter = `grayscale(${effectLevelValue.value})`;
      break;
    case 'sepia':
      imgPreview.style.filter = `sepia(${effectLevelValue.value})`;
      break;
    case 'marvin':
      imgPreview.style.filter = `invert(${effectLevelValue.value}%)`;
      break;
    case 'phobos':
      imgPreview.style.filter = `blur(${effectLevelValue.value}px)`;
      break;
    case 'heat':
      imgPreview.style.filter = `brightness(${effectLevelValue.value})`;
      break;
  }
}

function getMinValueForEffect (effect) {
  switch (effect) {
    case 'phobos':
      return 1;
    default:
      return 0;
  }
}

function getMaxValueForEffect (effect) {
  switch (effect) {
    case 'marvin':
      return 100;
    case 'phobos':
    case 'heat':
      return 3;
    case 'none':
      return 0;
    default:
      return 1;
  }
}

function getStepForEffect (effect) {
  switch (effect) {
    case 'none':
      return 0;
    case 'marvin':
      return 1;
    default:
      return 0.1;
  }
}

function getUnitForEffect (effect) {
  switch (effect) {
    case 'marvin':
      return '%';
    case 'phobos':
      return 'px';
    default:
      return '';
  }
}

effectTitle.forEach((radio) => {
  radio.addEventListener('change', (evt) => {
    if (evt.target.checked){
      const currentEffect = evt.target.value;
      updateSliderOptions(getMinValueForEffect(currentEffect), getMaxValueForEffect(currentEffect), getStepForEffect(currentEffect), getUnitForEffect(currentEffect));
      slider.noUiSlider.set(100);
      effectLevelValue.value = 100;
      changeEffects(currentEffect);
    }
  });
});

slider.noUiSlider.on('update', (values) => {
  effectLevelValue.value = values[0];
  const currentEffect = document.querySelector('.effects__item input:checked').value;
  changeEffects(currentEffect);
});


export {changeEffects};
