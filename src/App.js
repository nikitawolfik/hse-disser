import React, { PureComponent, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'normalize.css';

import { LayoutRouter } from 'containers';


class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={LayoutRouter} />
          </Switch>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
