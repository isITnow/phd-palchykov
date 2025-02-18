import { useField } from 'formik';
import { FormGroup, FormLabel, FormSelect } from 'react-bootstrap';

import RequiredBadge from '@/components/shared/RequiredBadge';
import FormWarning from '@/components/FormComponents/FormWarning';

const CustomSelect = ({
  classnames = '',
  label,
  items,
  required,
  ...props
}) => {
  const [field, meta] = useField(props.name);

  return (
    <FormGroup className={classnames} controlId={label}>
      <FormLabel className="px-3 text-secondary fw-bold">
        {label}
        {required && <RequiredBadge />}
      </FormLabel>
      <FormSelect {...field} {...props}>
        <option defaultValue={'Select'}>Select a value</option>
        {items.map(({ label, value }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </FormSelect>
      {meta.touched && meta.error && <FormWarning>{meta.error}</FormWarning>}
    </FormGroup>
  );
};

export default CustomSelect;
