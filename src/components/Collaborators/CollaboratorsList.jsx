import { Col, Row } from 'react-bootstrap';
import Collaborator from '@/components/Collaborators/Collaborator';

const CollaboratorsList = ({ collaborators }) => (
  <Col xs={10} className="mx-auto">
    <Row as={'ul'} xs={1} md={2} lg={3} className="row-gap-3 mb-0">
      {collaborators.map((collaborator) => (
        <Col as={'li'} key={collaborator.id}>
          <Collaborator collaborator={collaborator} />
        </Col>
      ))}
    </Row>
  </Col>
);

export default CollaboratorsList;
