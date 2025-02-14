const getYearsArray = (period) => {
  const [start, end] = period.title.split("-");

  let till = end;

  if (end === "present") {
    till = new Date().getFullYear();
  }

  let years = [];
  let i = start;
  while (till >= i) {
    years.push(i.toString());
    i++;
  }
  return years;
};

export default getYearsArray;
