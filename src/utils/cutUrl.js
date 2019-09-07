export default (url, amount = 1) => url.split('/').slice(0, -amount).join('/');
