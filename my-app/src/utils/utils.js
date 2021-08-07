export const createInputMask = (pattern) => (str) => {
  let number = '';
  let currIndex = 0;
  if (!str) {
    return '';
  }
  pattern.split('').forEach((elem) => {
    if (elem === '_' && str[currIndex]) {
      number += str[currIndex];
      currIndex += 1;
    } else {
      number += elem;
    }
  });
  return number;
};
