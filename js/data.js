import {getRandomInteger, createRandomIdFromRange} from './utils.js';

const SIMILAR_PHOTO_POSTS_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKES_COUNT_MIN = 15;
const LIKES_COUNT_MAX = 200;
const PHOTO_ID_COUNT_MIN = 1;
const PHOTO_ID_COUNT_MAX = 25;
const URL_ID_COUNT_MIN = 1;
const URL_ID_COUNT_MAX = 25;
const randomPhotoId = createRandomIdFromRange(PHOTO_ID_COUNT_MIN, PHOTO_ID_COUNT_MAX);
const randomUrlId = createRandomIdFromRange(URL_ID_COUNT_MIN, URL_ID_COUNT_MAX);

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

function createMessage () {
  const messageIndex = getRandomInteger(0, MESSAGES.length - 1);
  const messageIndex2 = getRandomInteger(0, MESSAGES.length - 1);
  let messageText;

  if (Math.random() <= 0.5) {
    messageText = MESSAGES[messageIndex];
  } else {
    messageText = MESSAGES[messageIndex] + MESSAGES[messageIndex2];
  }

  return messageText;
}

function createCommentsArray () {
  const commentsLength = Math.floor(Math.random() * 31);
  const commentsArray = [];
  const randomCommentsId = createRandomIdFromRange(0, Number.MAX_SAFE_INTEGER);

  for (let i = 0; i < commentsLength; i++) {
    const randomAvatarId = Math.floor(Math.random() * AVATAR_COUNT) + 1;
    const randomNameIndex = getRandomInteger(0, NAMES.length - 1);

    const commentsObject = {
      id: randomCommentsId(),
      avatar: `img/avatar-${ randomAvatarId }.svg`,
      message: createMessage(),
      name: NAMES[randomNameIndex],
    };
    commentsArray.push(commentsObject);
  }

  return commentsArray;
}

function createPhotoPost () {
  const descriptionIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);
  const likes = createRandomIdFromRange(LIKES_COUNT_MIN, LIKES_COUNT_MAX);

  return {
    id: randomPhotoId(),
    url: `photos/${ randomUrlId() }.jpg`,
    description: DESCRIPTIONS[descriptionIndex],
    likes: likes(),
    comments: createCommentsArray(),
  };
}

const createSimilarPhotoPosts = () => Array.from({length: SIMILAR_PHOTO_POSTS_COUNT}, createPhotoPost);

export {createSimilarPhotoPosts};
