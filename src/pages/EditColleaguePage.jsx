import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectColleagues } from "../redux/colleagues/selectorColleagues";

import ColleagueForm from "../components/Colleagues/ColleagueForm";

const EditColleaguePage = () => {
  const { colleagues } = useSelector(selectColleagues);
  const { id } = useParams();

  const colleague = colleagues.find(
    (colleague) => colleague.id === parseInt(id)
  );
  console.log("EDIT colleague: ", colleague);

  return (
    <section className="py-4">
      <h4>Edit news</h4>
      <p>required fields: title, date</p>
      <ColleagueForm colleague={colleague} />
    </section>
  );
};

export default EditColleaguePage;
