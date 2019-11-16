import PropTypes from 'prop-types';
import { windowResizeEffect } from 'effects';

const WindowResizer = ({ children }) => {
  const width = windowResizeEffect();

  return children(width);
};

WindowResizer.propTypes = {
  children: PropTypes.func,
};

export default WindowResizer;
