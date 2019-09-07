import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Form, Field } from 'react-final-form';

import ToggleIconSrc from 'assets/svg/down.svg';
import ResetIconSrc from 'assets/svg/cross.svg';

import styles from './styles.module.scss';


const AnotherSelect = (props) => {
  const {
    options,
    onSubmit,
    fieldName,
    initialValue,
    initialPlaceholder,
    selectClassName,
    wrapperClassName,
    chevronClassName,
    resetClassName,
  } = props;

  const initialPropsValue = props[fieldName];

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        [fieldName]: initialPropsValue || initialValue,
      }}
      render={({ handleSubmit, form, values }) => (
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          onChange={handleSubmit}
        >
          <div className={cx(styles.selectDiv, wrapperClassName)}>

            <Field
              name={fieldName}
              component="select"
              value={initialPropsValue}
              className={cx(
                styles.select,
                selectClassName,
                {
                  [styles.managerSelected]:
                    values[fieldName] && !values[fieldName].includes(initialValue),
                },
              )}
            >
              <option className={styles.option} value={initialValue}>{initialPlaceholder}</option>
              {options}
            </Field>

            <button
              onClick={() => {
                form.reset();
                onSubmit({ [fieldName]: initialValue });
              }}
              type="button"
              className={cx(
                styles.selectButton,
                {
                  [styles.selectButtonReset]:
                    values[fieldName] && !values[fieldName].includes(initialValue),
                },
              )}
            >
              <img
                src={values[fieldName] && values[fieldName].includes(initialValue)
                  ? ToggleIconSrc : ResetIconSrc}
                className={cx({
                  [styles.selectImgReset]:
                    values[fieldName] && !values[fieldName].includes(initialValue),
                  [resetClassName]:
                    values[fieldName] && !values[fieldName].includes(initialValue),
                  [styles.selectImg]:
                    values[fieldName] && values[fieldName].includes(initialValue),
                  [chevronClassName]:
                    values[fieldName] && values[fieldName].includes(initialValue),
                })}
              />
            </button>

          </div>
        </form>
      )}
    />
  );
};


AnotherSelect.propTypes = {
  options: PropTypes.node,
  onSubmit: PropTypes.func,
  fieldName: PropTypes.string,
  initialValue: PropTypes.string,
  initialPlaceholder: PropTypes.string,
  selectClassName: PropTypes.node,
  wrapperClassName: PropTypes.node,
  chevronClassName: PropTypes.node,
  resetClassName: PropTypes.node,
};

export default AnotherSelect;
