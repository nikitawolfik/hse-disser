import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { getFieldError } from 'utils/validation';

import styles from './styles.module.scss';


const Input = ({
  label,
  labelVertical,
  meta,
  input,
  inputProps,
  type,
  textarea,
  rows,
  className,
  customInputStyle,
  placeholder,
  hideError,
}) => {
  const error = getFieldError(meta);
  const InputElement = textarea ? 'textarea' : 'input';

  return (
    <div>
      <div className={cx(styles.container, labelVertical && styles.containerColumn, className)}>

        {label && label.length > 0 && (
          <label
            className={cx(
              styles.label,
              {
                [styles.labelVertical]: labelVertical,
                [styles.labelActive]: meta.active,
                [styles.labelError]: error,
              },
            )}
            htmlFor={input.name}
          >
            {label}
          </label>
        )}

        <div className={styles.inputContainer}>
          <InputElement
            className={cx(
              styles.input,
              {
                [styles.textarea]: textarea,
                [styles.inputError]: error,
              },
              customInputStyle,
            )}
            type={type}
            rows={rows}
            placeholder={placeholder}
            {...input}
            {...inputProps}
          />
        </div>

      </div>
      <div className={cx(
        styles.errorBox,
        {
          [styles.errorBoxVertical]: labelVertical,
          [styles.hide]: hideError && !error,
        },
      )}
      >
        {error && (
          <span>{error}</span>
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  meta: PropTypes.shape({
    error: PropTypes.string,
    submitError: PropTypes.string,
    active: PropTypes.bool.isRequired,
  }).isRequired,
  input: PropTypes.shape({}),
  inputProps: PropTypes.shape({}),
  type: PropTypes.string,
  textarea: PropTypes.bool,
  rows: PropTypes.number,
  label: PropTypes.string,
  labelVertical: PropTypes.bool,
  withLabel: PropTypes.bool,
  placeholder: PropTypes.string,
  hideError: PropTypes.bool,
};

Input.defaultProps = {
  inputProps: {},
};

export default Input;
