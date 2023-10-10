function countStringLength (string, length) {
  if (string.length <= length) {
    return true;
  }

  return false;
}

countStringLength('dff', 3);

function isPalindrome (string) {
  const NORMALISED_STRING = string.replaceAll(' ', '').toLowerCase();

  let reversedString = '';
  for (let i = NORMALISED_STRING.length - 1; i >= 0; i--) {
    reversedString += NORMALISED_STRING.at(i);
  }

  return NORMALISED_STRING === reversedString;
}

isPalindrome('TEt TeNEt TeNET Tet');
