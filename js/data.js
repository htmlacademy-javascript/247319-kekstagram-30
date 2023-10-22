import {getRandomInteger, createRandomIdFromRangeGenerator} from './utils.js';

const SIMILAR_PHOTO_POSTS_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKES_COUNT_MIN = 15;
const LIKES_COUNT_MAX = 200;
const PHOTO_ID_COUNT_MIN = 1;
const PHOTO_ID_COUNT_MAX = 25;
const URL_ID_COUNT_MIN = 1;
const URL_ID_COUNT_MAX = 25;
const RANDOM_PHOTO_ID = createRandomIdFromRangeGenerator(PHOTO_ID_COUNT_MIN, PHOTO_ID_COUNT_MAX);
const RANDOM_URL_ID = createRandomIdFromRangeGenerator(URL_ID_COUNT_MIN, URL_ID_COUNT_MAX);

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
    const RANDOM_AVATAR_ID = Math.floor(Math.random() * AVATAR_COUNT) + 1;
    const RANDOM_NAME_INDEX = getRandomInteger(0, NAMES.length - 1);

    const COMMENTS_OBJECT = {
      id: RANDOM_COMMENTS_ID(),
      avatar: `img/avatar-${ RANDOM_AVATAR_ID }.svg`,
      message: createMessage(),
      name: NAMES[RANDOM_NAME_INDEX],
    };
    COMMENTS_ARRAY.push(COMMENTS_OBJECT);
  }

  return COMMENTS_ARRAY;
}

function createPhotoDescription () {
  const DESCRIPTION_INDEX = getRandomInteger(0, DESCRIPTIONS.length - 1);
  const LIKES = createRandomIdFromRangeGenerator(LIKES_COUNT_MIN, LIKES_COUNT_MAX);

  return {
    id: RANDOM_PHOTO_ID(),
    url: `photos/${ RANDOM_URL_ID() }.jpg`,
    description: DESCRIPTIONS[DESCRIPTION_INDEX],
    likes: LIKES(),
    comments: createCommentsArray(),
  };
}

const createSimilarPhotoDescriptions = () => Array.from({length: SIMILAR_PHOTO_POSTS_COUNT}, createPhotoDescription);

export {createSimilarPhotoDescriptions};
