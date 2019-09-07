import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import { Button, DocumentTitle, Card, Modal } from 'components';
import { events, defaultState, tasks } from 'assets';

import styles from './styles.module.scss';

const timePlaceholder = 'No time yet';
const descriptionPLaceholder = 'No description yet';

const Game = () => {
  const [gameStarted, startGame] = useState(localStorage.getItem('game'));
  const [event, setEvent] = useState(null);
  const [time, setTime] = useState(null);
  const [lap, setLap] = useState(0);
  const [players, setPlayers] = useState([]);
  const [progress, setProgress] = useState({});
  const [currentPlayerIndex, setCurrentPlayer] = useState(null);

  let toggleModalOutside = () => {};
  let closeModalOutside = () => {};
  let toggleSkipModalOutside = () => {};

  const currentPlayer = players[currentPlayerIndex];
  const currentPlayerProgress = progress[currentPlayer];
  const { value } = event || {};
  const currentPlayerTime = time;
  let newTaskId = currentPlayerProgress?.currentTaskId + 1 || 1;
  if (newTaskId === 10 && currentPlayerProgress.hasBonus) {
    newTaskId += 1;
  }
  const niceLitReview = parseInt(currentPlayerProgress?.grades[4], 10) >= 8
    && parseInt(currentPlayerProgress?.desiredGrade, 10) >= 8;
  if (!niceLitReview) {
    console.log(currentPlayerProgress?.grades);
  }
  if (newTaskId === 7 && niceLitReview) {
    newTaskId += 1;
  }
  const newTask = tasks[newTaskId];

  useEffect(() => {
    const playerNames = Object.values(JSON.parse(localStorage.getItem('players')));
    setPlayers(playerNames);
    const initialProgress = playerNames.reduce((pv, cv) => ({
      ...pv,
      [cv]: defaultState,
    }), {});
    setProgress(initialProgress);
  }, []);

  const setProgressIfNext = ({ hasGrade, grade, time }) => {
    const factualValue = !Number.isInteger(value) ? currentPlayerTime : value + currentPlayerTime;
    const bonusTime = factualValue - currentPlayerProgress.remainingTaskTime;
    const grades = currentPlayerProgress.desiredGrade
      ? { ...currentPlayerProgress.grades, [currentPlayerProgress.currentTaskId]: currentPlayerProgress.desiredGrade }
      : currentPlayerProgress.grades;
    const nextProgress = {
      ...currentPlayerProgress,
      hasBonus: value === 'database' ? true : currentPlayerProgress.hasBonus,
      currentTaskId: newTaskId,
      currentTask: newTask,
      overallTaskTime: hasGrade ? time : newTask.time,
      remainingTaskTime: hasGrade ? time - bonusTime : newTask.time - bonusTime,
      timeSpent: currentPlayerProgress.timeSpent + factualValue,
      desiredGrade: hasGrade ? grade : null,
      grades: {
        ...grades,
      },
    };

    setProgress({
      ...progress,
      [currentPlayer]: nextProgress,
    });
  };

  const handleProgress = () => {
    // logic here to handle progress as player changes
    //  const currentPlayer = players[currentPlayerIndex];
    //  const currentPlayerProgress = progress[currentPlayer];
    //  const { value } = event;
    //  const currentPlayerTime = time;

    if (value === 'skip') {
      // handle skip logic here
      // and return to finish function
      toggleSkipModalOutside();
      return;
    }

    const factualValue = !Number.isInteger(value) ? currentPlayerTime : value + currentPlayerTime;

    if (factualValue >= currentPlayerProgress.remainingTaskTime) {
      // task finished

      if (!Number.isInteger(newTask.time)) {
        toggleModalOutside();
        return;
      }

      setProgressIfNext({
        hasGrade: false,
      });
    } else {
      //  task not finished
      setProgress({
        ...progress,
        [currentPlayer]: {
          ...currentPlayerProgress,
          hasBonus: value === 'database' ? true : currentPlayerProgress.hasBonus,
          remainingTaskTime: currentPlayerProgress.remainingTaskTime - factualValue,
          timeSpent:
            factualValue > 0
              ? currentPlayerProgress.timeSpent + factualValue
              : currentPlayerProgress.timeSpent,
        },
      });
    }

    //  console.log(currentPlayer, currentPlayerProgress.grades);
    //  console.log(currentPlayerTime);
    //  console.log(factualValue);
  };

  useEffect(() => {
    if (currentPlayerIndex === 0 || currentPlayerIndex) {
      handleProgress();
    }
  }, [currentPlayerIndex]);


  const handleClick = () => {
    if (!gameStarted) {
      startGame(true);
    }
    // logit to get event & hours and set player index
    const eventIndex = Math.floor(Math.random() * events.length);
    setEvent(events[eventIndex]);
    const hours = Math.floor(Math.random() * 8 + 1);
    setTime(hours);
    if (currentPlayerIndex === players.length - 1) {
      setLap(lap + 1);
      setCurrentPlayer(0);
    } else if (!currentPlayerIndex && currentPlayerIndex !== 0) {
      setCurrentPlayer(0);
    } else {
      setCurrentPlayer(currentPlayerIndex + 1);
    }
  };

  //  console.log('PROGRESS', progress);

  return (
    <div className={styles.container}>
      <DocumentTitle>Написание диссертации</DocumentTitle>
      <Modal
        closeOnOverlayClick={false}
        title={`${currentPlayer}, вы пропускаете этот ход.`}
        hideSubmitButton
        onClose={handleClick}
      >
        {(toggleSkipModal) => {
          toggleSkipModalOutside = toggleSkipModal;

          return (
            <Modal
              title={`${currentPlayer}, выберите оценку для следующего шага`}
              hideSubmitButton
              hideCloseButton
              closeOnOverlayClick={false}
              withContent
              content={(
                <div>
                  {Object.keys(newTask.time).map((grade) => {
                    return (
                      <Button
                        key={grade}
                        title={`${grade}: ${newTask.time[grade]} hours`}
                        secondary
                        onClick={() => {
                          setProgressIfNext({
                            hasGrade: true,
                            grade,
                            time: newTask.time[grade],
                          });
                          closeModalOutside();
                        }}
                      />
                    );
                  })}
                </div>
              )}
            >
              {(toggleModal, closeModal) => {
                toggleModalOutside = toggleModal;
                closeModalOutside = closeModal;

                return (
                  <>
                    <span className={styles.title}>
                      Круг - {lap}
                    </span>
                    <span className={styles.title}>
                      Случайное событие
                    </span>
                    <div className={styles.descriptionCard}>
                      {event?.description || descriptionPLaceholder}
                    </div>
                    <span className={styles.title}>
                      Количество фактических часов
                    </span>
                    <div className={styles.timeCard}>
                      {time || timePlaceholder}
                    </div>
                    <div>
                      {players.map((player) => {
                        const {
                          currentTask,
                          currentTaskId,
                          desiredGrade,
                          overallTaskTime,
                          remainingTaskTime,
                        } = progress[player];

                        const divProgress = (overallTaskTime - remainingTaskTime) / overallTaskTime * 100;

                        return (
                          <Card
                            key={player}
                            className={cx(
                              styles.card,
                              { [styles.cardActive]: player === players[currentPlayerIndex] },
                            )}
                          >
                            <span>{player}</span>
                            <span>Current Task: {currentTask.description}</span>
                            <span>Current Task Id: {currentTaskId}</span>
                            {desiredGrade && (
                              <span>Grade: {desiredGrade}</span>
                            )}
                            <span>Time: {overallTaskTime}</span>
                            <span>Time Remaining: {remainingTaskTime}</span>
                            <div className={styles.progressContainer}>
                              <div
                                className={styles.progress}
                                style={
                                  divProgress > 0
                                    ? { width: `${divProgress}%` }
                                    : { width: '0%' }
                                }
                              />
                            </div>

                          </Card>
                        );
                      })}
                    </div>
                    <Button
                      title={gameStarted ? 'Next Round' : 'Start Game'}
                      primary
                      className={styles.button}
                      onClick={handleClick}
                    />
                  </>
                );
              }}
            </Modal>
          );
        }}
      </Modal>
    </div>
  );
};

export default Game;
