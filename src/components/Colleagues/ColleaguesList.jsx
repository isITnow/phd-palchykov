import { Col, Row } from "react-bootstrap";
import Colleague from "./Colleague";

const ColleaguesList = ({ colleagues }) => {
  return (
    <Col xs={10} className="mx-auto">
      <Row as={"ul"} xs={1} md={2} lg={3} className="row-gap-3 mb-0">
        {colleagues.map((colleague) => (
          <Col as={"li"} className="" key={colleague.id}>
            <Colleague colleague={colleague} />
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default ColleaguesList;
