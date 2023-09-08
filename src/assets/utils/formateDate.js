import moment from "moment";

const formateDate = (entity) => {
  const postedDate = moment(entity.created_at).fromNow();
  const editedDate = moment(entity.updated_at).fromNow();
  const isEdited = entity.updated_at > entity.created_at;
  return { postedDate, editedDate, isEdited };
};

export default formateDate;
