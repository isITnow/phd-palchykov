const getCollaboratorsByCategory = (collaborators = []) => {
  return collaborators.reduce(
    (acc, collaborator) => {
      const { category } = collaborator;
      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(collaborator);
      return acc;
    },
    { alumni: [], local: [], international: [] }
  );
};

export default getCollaboratorsByCategory;
