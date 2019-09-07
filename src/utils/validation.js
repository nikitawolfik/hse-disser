export const getFieldError = ({ touched, error, submitError, dirtySinceLastSubmit }) => {
  if (touched && (error || (submitError && !dirtySinceLastSubmit))) {
    return error || submitError;
  }

  return undefined;
};

export const validateArray = (v) => {
  if (!v || !v.length) {
    return 'This field is required';
  }

  return undefined;
};
