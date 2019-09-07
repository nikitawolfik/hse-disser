import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import LoaderIconSrc from 'assets/svg/loader.svg';
import styles from './styles.module.scss';

const Spinner = ({ inverted, large }) => (
  <img
    src={LoaderIconSrc}
    className={cx(styles.loaderIcon, {
      [styles.inverted]: inverted,
      [styles.large]: large,
    })}
  />
);

Spinner.propTypes = {
  inverted: PropTypes.bool,
  large: PropTypes.bool,
};

export default Spinner;
