import ColleagueForm from "../components/Colleagues/ColleagueForm";
import { useLocation } from "react-router-dom";

const EditColleaguePage = () => {
  const location = useLocation();
  const colleague = location.state;

  return (
    <section className="py-4">
      <h4>Edit news</h4>
      {/* <p>required fields: title, date</p> */}
      <ColleagueForm colleague={colleague} />
    </section>
  );
};

export default EditColleaguePage;
