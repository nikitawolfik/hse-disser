import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Game, Initialize } from 'containers';

import styles from './styles.module.scss';


const LayoutRouter = (props) => {
  const [gameIsOn, startGame] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <div className={styles.main}>
          <Switch>
            {gameIsOn && (
              <Route path="/game" component={Game} />
            )}
            <Route path="/" render={() => <Initialize {...props} startGame={startGame} />} />
            {!gameIsOn && (
              <Redirect to="/" />
            )}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default LayoutRouter;
