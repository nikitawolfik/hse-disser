import React from 'react';
import PropTypes from 'prop-types';

const DocumentTitle = ({ children }) => {
  React.useEffect(() => {
    document.title = `${children} | Smart-marketing`;
  }, []);
  return null;
};

DocumentTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

export default DocumentTitle;
