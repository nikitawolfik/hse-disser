export default (url) => {
  const arr = url.split('=');
  return arr[arr.length - 1];
};
