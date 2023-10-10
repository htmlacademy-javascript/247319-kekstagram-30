function countStringLength (string, length) {
  if (string.length <= length) {
    return true;
  }

  return false;
}

console.log(countStringLength('dff', 3));

function isPalindrome (string) {
  let normalizedString = string.replaceAll(' ', '').toLowerCase();

  let reversedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString.at(i);
  }

  return normalizedString === reversedString;
}

console.log(isPalindrome('TEt TeNEt TeNET Tet'));
