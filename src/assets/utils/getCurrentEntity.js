const getCurrentEntity = (array, id) => {
  return array.find((entity) => entity.id === id);
};

export default getCurrentEntity;
