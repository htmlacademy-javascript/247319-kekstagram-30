const DESCRIPTIONS = [
  'На фото - солнечный пляж с пальмами',
  'Эта фотография показывает цветущий сад',
  'Запечатлены водопады с белой пеной',
  'Фото показывает уютную улочку старого города',
  'На снимке - яркий рынок с фруктами',
  'Фотография показывает горы, покрытые снегом',
  'Запечатлены красочные цветы в парке',
  'На фото - каналы Венеции с гондолами',
  'Фотография показывает озеро с горами вокруг',
  'Запечатлены величественные скалы у океана',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Арина',
  'Евгения',
  'Ольга',
  'Роман',
  'Александр',
  'Дмитрий',
  'Иван',
  'София',
  'Николай',
  'Мария',
];

const SIMILAR_PHOTO_POSTS_COUNT = 25;

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function createMessage() {
  const MESSAGE_INDEX = getRandomInteger(0, MESSAGES.length - 1);
  const MESSAGE_INDEX_2 = getRandomInteger(0, MESSAGES.length - 1);
  let messageText;

  if (Math.random() <= 0.5) {
    messageText = MESSAGES[MESSAGE_INDEX];
  } else {
    messageText = MESSAGES[MESSAGE_INDEX] + MESSAGES[MESSAGE_INDEX_2];
  }

  return messageText;
}

function createCommentsArray () {
  const COMMENTS_LENGTH = Math.floor(Math.random() * 31);
  const COMMENTS_ARRAY = [];
  const RANDOM_COMMENTS_ID = createRandomIdFromRangeGenerator(0, Number.MAX_SAFE_INTEGER);

  for (let i = 0; i < COMMENTS_LENGTH; i++) {
    const RANDOM_AVATAR_ID = Math.floor(Math.random() * 6) + 1;
    const RANDOM_NAME_INDEX = getRandomInteger(0, NAMES.length - 1);

    const COMMENTS_OBJECT = {
      id: RANDOM_COMMENTS_ID(),
      avatar: `img/avatar-${ RANDOM_AVATAR_ID }.jpg`,
      message: createMessage(),
      name: NAMES[RANDOM_NAME_INDEX],
    };
    COMMENTS_ARRAY.push(COMMENTS_OBJECT);
  }

  return COMMENTS_ARRAY;
}

function createPhotoDescription () {
  const RANDOM_PHOTO_ID = createRandomIdFromRangeGenerator(1, 25);
  const DESCRIPTION_INDEX = getRandomInteger(0, DESCRIPTIONS.length - 1);
  const LIKES = createRandomIdFromRangeGenerator(15, 200);

  return {
    id: RANDOM_PHOTO_ID(),
    url: `photos/${ RANDOM_PHOTO_ID() }.jpg`,
    description: DESCRIPTIONS[DESCRIPTION_INDEX],
    likes: LIKES(),
    comments: createCommentsArray(),
  };
}

const createSimilarPhotoDescriptions = () => Array.from({length: SIMILAR_PHOTO_POSTS_COUNT}, createPhotoDescription);
createSimilarPhotoDescriptions();
