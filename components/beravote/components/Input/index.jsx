import { ErrorMessage, Field } from 'formik';
import { InputWrapper, StyledError, StyledLabel } from './styled';

// Common Input Component
const FormInput = ({ label, name, type = 'text', placeholder, as = 'input', ...rest }) => {
  return (
    <InputWrapper>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        as={as}
        {...rest}
      />
      <ErrorMessage name={name} component={StyledError} />
    </InputWrapper>
  );
};

export default FormInput;
