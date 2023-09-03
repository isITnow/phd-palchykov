const getYearsArray = (start, end) => {
  let years = [];
  let i = start;
  while (end >= i) {
    years.push(i.toString());
    i++;
  }
  return years;
};

export default getYearsArray;
