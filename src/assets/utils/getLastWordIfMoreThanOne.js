const getLastWordIfMoreThanOne = (text) => {
  const wordsArr = text.split(" ");
  return wordsArr.length > 1 ? wordsArr[wordsArr.length - 1] : text;
};

export default getLastWordIfMoreThanOne;
