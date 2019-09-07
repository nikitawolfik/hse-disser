import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ChevronDown from 'assets/svg/down.svg';
import { getFieldError } from 'utils/validation';

import styles from './styles.module.scss';

const Select = ({
  input,
  meta,
  values,
  label,
  selectClassName,
  initialValue,
  hidePlaceholder,
  hideInitialValue,
  wrapperClassName,
}) => {
  const error = getFieldError(meta);

  return (
    <div>
      <div className={styles.container}>
        {label && (
          <label
            className={cx(styles.label, {
              [styles.withErrors]: error,
            })}
            htmlFor={input.name}
          >
            {label}
          </label>
        )}
        <div className={cx(styles.inputContainer, wrapperClassName)}>
          <select
            {...input}
            value={String(input.value)}
            className={cx(
              styles.select,
              selectClassName,
              {
                [styles.placeholder]: !input.value
                || (String(input.value) === initialValue && !hidePlaceholder),
              },
            )}
          >
            {!hideInitialValue && (
              <option value="">{initialValue}</option>
            )}
            {values.map(({ value, name }) => (
              <option key={value} value={value}>{name}</option>
            ))}
          </select>
          <img
            src={ChevronDown}
            className={cx(
              styles.icon,
              {
                [styles.invert]: !input.value
                || (String(input.value) === initialValue && !hidePlaceholder),
              },
            )}
          />
        </div>
      </div>
      {error && (
        <div className={styles.errorBox}>
          {error}
        </div>
      )}
    </div>
  );
};

Select.propTypes = {
  input: PropTypes.shape({}),
  meta: PropTypes.shape({}),
  label: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    name: PropTypes.any.isRequired,
  })).isRequired,
  hidePlaceholder: PropTypes.bool,
  hideInitialValue: PropTypes.bool,
};

export default Select;
