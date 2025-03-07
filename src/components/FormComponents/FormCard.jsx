import { Card } from 'react-bootstrap';
import FormTitle from '@/components/FormComponents/FormTitle';

const FormCard = ({ title, body }) => {
  return (
    <Card>
      <Card.Header>
        <FormTitle>{title}</FormTitle>
      </Card.Header>
      <Card.Body>{body}</Card.Body>
    </Card>
  );
};

export default FormCard;
