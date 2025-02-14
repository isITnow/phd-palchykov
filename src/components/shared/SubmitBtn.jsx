import { Button } from 'react-bootstrap';
import SpinnerThreeDots from '@/components/shared/SpinnerThreeDots';

const SubmitBtn = ({ text, disabled }) => (
  <Button disabled={disabled} type="submit" variant="primary">
    {disabled ? <SpinnerThreeDots /> : text}
  </Button>
);

export default SubmitBtn;
