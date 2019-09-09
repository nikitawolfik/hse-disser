import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import cx from 'classnames';

import { Button, Select, Input, FormError, Card } from 'components';

import { validateNumber } from './validate';
import styles from './styles.module.scss';


const Initialize = ({ startGame, history }) => {
  const [number, setNumber] = useState(null);

  // to be removed
  //  useEffect(() => {
  //    localStorage.setItem('players', JSON.stringify({
  //      player1: 'nikita',
  //      player2: 'ne nikita',
  //      player3: 'player 3',
  //      player4: 'player 4',
  //    }));
  //    startGame(true);
  //    history.push('/game');
  //  }, []);

  const onSubmit = ({ players }) => {
    setNumber(parseInt(players, 10));
  };

  const onSubmitNameForm = (names) => {
    localStorage.setItem('players', JSON.stringify(names));
    startGame(true);
    history.push('/game');
  };

  return (
    <Card className={styles.container}>

      <div className={styles.left}>
        <Form
          onSubmit={onSubmit}
          validate={validateNumber}
        >
          {({ handleSubmit, submitError, valid }) => (
            <>
              <h2 className={styles.title}>Выберите количество игроков</h2>
              <Field
                component={Select}
                name="players"
                selectClassName={cx(styles.select, styles.input)}
                initialValue="Выберите количество игроков"
                values={[
                  {
                    value: '2',
                    name: '2',
                  },
                  {
                    value: '3',
                    name: '3',
                  },
                  {
                    value: '4',
                    name: '4',
                  },
                ]}
              />
              {submitError && (
                <FormError>{submitError}</FormError>
              )}
              <Button
                disabled={!valid}
                primary
                title="Подвердить"
                onClick={handleSubmit}
                className={styles.buttonQuantity}
              />
            </>
          )}
        </Form>

      </div>

      {number && (
        <div className={styles.right}>
          <Form onSubmit={onSubmitNameForm}>
            {({ handleSubmit }) => {
              const arr = [];
              for (let i = 0; i < number; i++) {
                arr.push(i + 1);
              }
              const fields = arr.map(el => (
                <Field
                  component={Input}
                  name={`player ${el}`}
                  key={`${el} player`}
                  className={styles.input}
                />
              ));
              return (
                <div>
                  <h2 className={styles.title}>Введите имена игроков</h2>
                  {fields}
                  <Button
                    title="Начать игру"
                    onClick={handleSubmit}
                    className={styles.buttonQuantity}
                  />
                </div>
              );
            }}
          </Form>
        </div>
      )}
    </Card>
  );
};

Initialize.propTypes = {
  startGame: PropTypes.func,
  history: PropTypes.shape({}),
};

export default Initialize;
