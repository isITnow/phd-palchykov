const getCurrentPeriod = (periods, id) => {
  return periods.find((period) => period.id === id);
};

export default getCurrentPeriod;
