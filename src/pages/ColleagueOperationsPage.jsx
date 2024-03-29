import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectColleagues } from "../redux/colleagues/selectorColleagues";

import { Col } from "react-bootstrap";
import ColleagueForm from "../components/Colleagues/ColleagueForm";
import FormCard from "../components/FormComponents/FormCard";
import NoItemToEdit from "../components/shared/NoItemToEdit";

import navTabs from "../assets/navTabs";

const ColleagueOperationsPage = ({ edit }) => {
  const { colleagues, status } = useSelector(selectColleagues);
  const { id } = useParams();

  const title = edit ? "Edit Colleague Card" : "Create Colleague Card";
  let colleague = null;

  if (edit) {
    colleague = colleagues.find((colleague) => colleague.id === parseInt(id));
  }

  if (edit && !colleague) {
    return <NoItemToEdit backPath={navTabs.colleagues.path} item="Colleague" />;
  }

  return (
    <Col lg="8" className="mx-auto">
      <FormCard
        title={title}
        body={
          <ColleagueForm colleague={edit ? colleague : null} status={status} />
        }
      />
    </Col>
  );
};

export default ColleagueOperationsPage;
