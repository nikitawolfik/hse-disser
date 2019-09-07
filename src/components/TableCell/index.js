import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.scss';


const TableCell = ({ className, text, type, onClick, children, textClassName }) => {
  const Element = type;

  return (
    <Element
      className={cx(
        styles.cell,
        className,
      )}
      onClick={onClick}
    >
      <span className={cx(textClassName, styles.text)}>{text}</span>
      {children}
    </Element>
  );
};

TableCell.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.node,
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  textClassName: PropTypes.node,
};

TableCell.defaultProps = {
  type: 'td',
};

export default TableCell;
