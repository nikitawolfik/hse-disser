import { useState, useEffect } from 'react';

const windowResizer = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const setNewWidth = () => {
      if (width !== window.innerWidth) {
        setWidth(window.innerWidth);
      }
    };

    window.addEventListener('resize', setNewWidth);

    return () => {
      window.removeEventListener('resize', setNewWidth);
    };
  });

  return width;
};

export default windowResizer;
