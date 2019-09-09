import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

import { Button, Select, Input, FormError } from 'components';

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
    <div className={styles.container}>

      <Form
        onSubmit={onSubmit}
        validate={validateNumber}
      >
        {({ handleSubmit, submitError, valid }) => (
          <>
            <Field
              component={Select}
              name="players"
              selectClassName={styles.select}
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
            />
          </>
        )}
      </Form>

      {number && (
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
              />
            ));
            return (
              <div>
                {fields}
                <Button
                  title="Начать игру"
                  onClick={handleSubmit}
                />
              </div>
            );
          }}
        </Form>
      )}
    </div>
  );
};

Initialize.propTypes = {
  startGame: PropTypes.func,
  history: PropTypes.shape({}),
};

export default Initialize;
