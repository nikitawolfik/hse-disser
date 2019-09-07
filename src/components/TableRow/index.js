import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.scss';

const TableRow = ({ className, children, div, style }) => {
  const Element = div ? 'div' : 'tr';

  return (
    <Element
      className={cx(
        styles.row,
        className,
      )}
      style={style}
    >
      {children}
    </Element>
  );
};


TableRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  className: PropTypes.node,
  div: PropTypes.bool,
  style: PropTypes.shape({}),
};


export default TableRow;
