import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.scss';


const Backdrop = ({ width, onClick }) => {
  const containerRef = React.useRef();

  const handleKeyDown = ({ key }) => {
    if (key === 'Escape') {
      onClick();
    }
  };

  React.useEffect(() => {
    containerRef.current.focus();
  }, []);

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={containerRef}
      onClick={onClick}
      className={cx(
        styles.backdrop,
      )}
      style={{
        width,
      }}
    />

  );
};

Backdrop.propTypes = {
  width: PropTypes.string,
  onClick: PropTypes.func,
};

export default Backdrop;
