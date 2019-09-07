/* eslint-disable */
import config from '../config';

export default () => {
  const w = window;
  w.intercomSettings = {
    app_id: config.intercomToken,
  };
  const ic = w.Intercom;
  if (typeof ic === 'function') {
    ic('reattach_activator');
    ic('update', w.intercomSettings);
  } else {
    const d = document;
    var i = function () {
      i.c(arguments);
    };
    i.q = [];
    i.c = function (args) {
      i.q.push(args);
    };
    if (process.env.NODE_ENV === 'production') {
      w.Intercom = i;
    } else {
      w.Intercom = function () {};
    }
    const l = function () {
      const s = d.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = `https://widget.intercom.io/widget/${config.intercomToken}`;
      const x = d.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    };
    if (process.env.NODE_ENV === 'production') {
      if (w.attachEvent) {
        w.attachEvent('onload', l);
      } else {
        w.addEventListener('load', l, false);
      }
    }
  }
};
/* eslint-enable */
