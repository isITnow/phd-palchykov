import { useField } from 'formik';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';

import RequiredBadge from '@/components/shared/RequiredBadge';
import FormWarning from '@/components/FormComponents/FormWarning';

const CustomInput = ({ label, classnames = '', required, ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <FormGroup className={classnames} controlId={label}>
      <FormLabel className="px-3 text-secondary fw-bold">
        {label}
        {required && <RequiredBadge />}
      </FormLabel>
      <FormControl {...field} {...props} />
      {meta.touched && meta.error && <FormWarning>{meta.error}</FormWarning>}
    </FormGroup>
  );
};

export default CustomInput;
