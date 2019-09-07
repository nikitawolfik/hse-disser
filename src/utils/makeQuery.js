export default (params) => {
  const query = Object.keys(params).reduce((pv, cv) => {
    if (pv === '?') {
      return `${pv}${cv}=${params[cv]}`;
    }

    return `${pv}&${cv}=${params[cv]}`;
  }, '?');
  return query;
};
