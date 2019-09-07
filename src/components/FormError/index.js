import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const FormError = ({ children }) => (
  <span className={styles.error}>{children}</span>
);

FormError.propTypes = {
  children: PropTypes.string,
};

export default FormError;
