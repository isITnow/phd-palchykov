import { useField } from 'formik';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';

import RequiredBadge from '@/components/shared/RequiredBadge';
import FormWarning from '@/components/FormComponents/FormWarning';

const CustomTextArea = ({ label, required, ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <FormGroup className="mb-3" controlId={label}>
      <FormLabel className="px-3 text-secondary fw-bold">
        {label}
        {required && <RequiredBadge />}
      </FormLabel>
      <FormControl as="textarea" {...field} {...props} />
      {/* <textarea {...field} {...props} className="form-control" /> */}
      {meta.touched && meta.error && <FormWarning>{meta.error}</FormWarning>}
    </FormGroup>
  );
};

export default CustomTextArea;
