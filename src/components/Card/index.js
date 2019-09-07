import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.scss';

const Card = ({ children, className, shadow1 }) => (
  <div
    className={cx(styles.container, {
      [styles.shadow1]: shadow1,
    }, className)}
  >
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  shadow1: PropTypes.bool,
};

export default Card;
