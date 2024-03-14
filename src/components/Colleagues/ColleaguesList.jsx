import { Col, Row } from "react-bootstrap";
import Colleague from "./Colleague";

const ColleaguesList = ({ colleagues }) => {
  return (
    <Row as={"ul"} xs={1} md={2}>
      {colleagues.map((colleague) => (
        <Col as={"li"} className="mb-3" key={colleague.id}>
          <Colleague colleague={colleague} />
        </Col>
      ))}
    </Row>
  );
};

export default ColleaguesList;
