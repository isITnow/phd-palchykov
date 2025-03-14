import { Col } from 'react-bootstrap';

import CreateResearchForm from '@/components/Research/CreateResearchForm';
import FormCard from '@/components/FormComponents/FormCard';

const CreateResearchPage = () => (
  <Col lg="8" className="mx-auto">
    <FormCard title="Create Research">
      <CreateResearchForm />
    </FormCard>
  </Col>
);

export default CreateResearchPage;
