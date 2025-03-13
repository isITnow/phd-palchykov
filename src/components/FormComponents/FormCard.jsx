import { Card } from 'react-bootstrap';
import FormTitle from '@/components/FormComponents/FormTitle';

const FormCard = ({ title, children }) => {
  return (
    <Card>
      <Card.Header>
        <FormTitle>{title}</FormTitle>
      </Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export default FormCard;
