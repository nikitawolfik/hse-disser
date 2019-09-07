export default (query) => {
  if (!query) {
    return null;
  }
  const params = query.slice(1).split('&').reduce((pv, cv) => {
    const [key, value] = cv.split('=');
    return { ...pv, [key]: value };
  }, {});
  return params;
};
