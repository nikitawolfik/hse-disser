import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Transition from 'react-transition-group/Transition';

import { TaskList } from 'containers';
import { Button, DocumentTitle, Card, Modal, Backdrop, WindowResizer } from 'components';
import { events, defaultState, tasks } from 'assets';
import sortNumbers from 'utils/sortNumbers';
import MenuIcon from 'assets/svg/menu.svg';

import styles from './styles.module.scss';

const timePlaceholder = 'No time yet';
const descriptionPLaceholder = 'No description yet';

const Game = ({ history: { push } }) => {
  const [gameStarted, startGame] = useState(localStorage.getItem('game'));
  const [event, setEvent] = useState(null);
  const [time, setTime] = useState(null);
  const [lap, setLap] = useState(0);
  const [players, setPlayers] = useState([]);
  const [progress, setProgress] = useState({});
  const [currentPlayerIndex, setCurrentPlayer] = useState(null);
  const [turn, setTurn] = useState(null);
  const [factualValueDisplay, setFactualValue] = useState(null);
  const [results, setResults] = useState({});

  const [showTaskList, setShowTaskList] = useState(false);

  let toggleModalOutside = () => {};
  let closeModalOutside = () => {};
  let toggleSkipModalOutside = () => {};

  const currentPlayer = players[currentPlayerIndex];
  const currentPlayerProgress = progress[currentPlayer];
  const { value } = event || {};
  const currentPlayerTime = time;
  let newTaskId = currentPlayerProgress?.currentTaskId + 1 || 1;
  if (newTaskId === 10 && currentPlayerProgress?.hasBonus) {
    newTaskId += 1;
  }

  let niceLitReview = false;

  if (currentPlayerProgress?.currentTaskId < 10) { // 10 is a random number
    niceLitReview = parseInt(currentPlayerProgress?.grades[4], 10) >= 8
      && parseInt(currentPlayerProgress?.desiredGrade, 10) >= 8;
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
    const bonusTime = factualValue - currentPlayerProgress?.remainingTaskTime;

    const grades = currentPlayerProgress?.desiredGrade
      ? {
        ...currentPlayerProgress?.grades,
        [currentPlayerProgress?.currentTaskId]: currentPlayerProgress?.desiredGrade,
      }
      : currentPlayerProgress?.grades;

    const nextProgress = {
      ...currentPlayerProgress,
      hasBonus: value === 'database' ? true : currentPlayerProgress?.hasBonus,
      currentTaskId: newTaskId,
      currentTask: newTask,
      overallTaskTime: hasGrade ? time : newTask.time,
      remainingTaskTime: hasGrade ? time - bonusTime : newTask.time - bonusTime,
      timeSpent: currentPlayerProgress?.timeSpent + factualValue,
      desiredGrade: hasGrade ? grade : null,
      grades: {
        ...grades,
      },
    };
    if (currentPlayer) {
      setProgress({
        ...progress,
        [currentPlayer]: nextProgress,
      });
    }
  };


  const handleProgress = () => {
    // logic here to handle progress as player changes

    if (value === 'skip') {
      // handle skip logic here
      // and return to finish function

      toggleSkipModalOutside();
      return;
    }

    const factualValue = !Number.isInteger(value)
      ? currentPlayerTime + currentPlayerProgress?.bonusTime
      : value + currentPlayerTime + currentPlayerProgress?.bonusTime;

    setFactualValue(factualValue);

    if (factualValue >= currentPlayerProgress?.remainingTaskTime) {
      // task finished

      if (!newTask || !Number.isInteger(newTask.time)) {
        toggleModalOutside();
        return;
      }

      setProgressIfNext({
        hasGrade: false,
      });
    } else {
      //  task not finished
      if (currentPlayerProgress?.remainingTaskTime
        - factualValue
        - currentPlayerProgress?.bonusTime === 0 && currentPlayerProgress.currentTaskId === 18) {
        setProgressIfNext({
          hasGrade: false,
        });
        return;
      }
      if (currentPlayer) {
        setProgress({
          ...progress,
          [currentPlayer]: {
            ...currentPlayerProgress,
            bonusTime: 0,
            hasBonus: value === 'database' ? true : currentPlayerProgress?.hasBonus,
            remainingTaskTime:
              currentPlayerProgress?.remainingTaskTime
              - factualValue
              - currentPlayerProgress?.bonusTime,
            timeSpent:
              factualValue > 0
                ? currentPlayerProgress?.timeSpent + factualValue
                : currentPlayerProgress?.timeSpent,
          },
        });
      }
    }
  };

  useEffect(() => {
    if (currentPlayerIndex === 0 || currentPlayerIndex) {
      handleProgress();
    }
  }, [turn]);


  const handleClick = () => {
    if (!gameStarted) {
      if (Object.keys(results).length) {
        push('/');
      }
      startGame(true);
    }

    // logic to get event & hours and set player index
    const eventIndex = Math.floor(Math.random() * events.length);
    setEvent(events[eventIndex]);

    const hours = Math.floor(Math.random() * 8 + 1);
    setTime(hours);

    if (currentPlayerIndex === players.length - 1) {
      setLap(lap + 1);
      setCurrentPlayer(0);
      setTurn(turn + 1);
    } else if (!currentPlayerIndex && currentPlayerIndex !== 0) {
      setCurrentPlayer(0);
      setTurn(1);
    } else if (players.length === 1) {
      setCurrentPlayer(0);
      setTurn(turn + 1);
      setLap(lap + 1);
    } else {
      setCurrentPlayer(currentPlayerIndex + 1);
      setTurn(turn + 1);
    }
  };

  //  useEffect(() => {
  //    setPlayers([]);
  //    setResults({
  //      nikita: {
  //        name: 'nikita',
  //        timeSpent: 10,
  //        grade: 10,
  //      },
  //      nikita2: {
  //        name: 'nikita',
  //        timeSpent: 10,
  //        grade: 10,
  //      },
  //    });
  //  }, []);


  return (
    <div className={styles.container}>
      <DocumentTitle>Написание диссертации</DocumentTitle>
      {showTaskList && (
        <Backdrop width="100%" onClick={() => setShowTaskList(false)} />
      )}
      <Transition
        in={showTaskList}
        timeout={350}
        unmountOnExit
        mountOnEnter
        enter
      >
        {menuAnimation => (
          <TaskList
            currentPlayerProgress={currentPlayerProgress}
            close={() => setShowTaskList(false)}
            className={cx(
              {
                [styles.entering]: menuAnimation === 'entering',
                [styles.exiting]: menuAnimation === 'exiting',
              },
            )}
          />
        )}
      </Transition>
      <Modal
        closeOnOverlayClick={false}
        title={`${currentPlayer}, вы пропускаете этот ход.`}
        hideSubmitButton
        //  onClose={handleClick}
      >
        {(toggleSkipModal) => {
          toggleSkipModalOutside = toggleSkipModal;

          return (
            <Modal
              closeOnEsc={false}
              renderTitle={() => {
                if (!newTask) {
                  const { grades } = currentPlayerProgress;
                  const gradesValues = Object.values(grades);
                  const slicedGrades = gradesValues.slice(2);

                  const calcAverage = array => array.reduce(
                    (pv, cv) => pv + parseInt(cv, 10), 0,
                  ) / array.length;

                  const average = grades[7]
                    ? calcAverage(slicedGrades)
                    : calcAverage(gradesValues);

                  return (
                    <div>
                      {`${currentPlayer}, вы успешно написали диссертацию!`}
                      {`Ваш итоговый балл: ${average.toFixed(1)}`}
                      {`Вы потратили ${currentPlayerProgress?.timeSpent} часов на написание диссертации`}
                    </div>
                  );
                }

                return (
                  <div>
                    <strong>{currentPlayer}</strong>
                    <span>, выберите оценку для следующего шага: </span>
                    <p>{newTask.description}</p>
                  </div>
                );
              }}
              hideCloseButton
              hideSubmitButton={!!newTask}
              submit={() => {
                if (!newTask) {
                  const { grades } = currentPlayerProgress;
                  const gradesValues = Object.values(grades);
                  const slicedGrades = gradesValues.slice(2);

                  const calcAverage = array => array.reduce(
                    (pv, cv) => pv + parseInt(cv, 10), 0,
                  ) / array.length;

                  const average = grades[7]
                    ? calcAverage(slicedGrades)
                    : calcAverage(gradesValues);

                  setResults({
                    ...results,
                    [currentPlayer]: {
                      name: currentPlayer,
                      timeSpent: currentPlayerProgress?.timeSpent,
                      grade: average.toFixed(1),
                    },
                  });

                  if (players.length === 1) {
                    // alert results here
                    setPlayers([]);
                    startGame(false);
                  } else {
                    setPlayers(players.filter(player => player !== currentPlayer));
                    handleClick();
                  }
                }
              }}
              closeOnOverlayClick={false}
              withContent
              content={
                newTask
                  ? (
                    <div>
                      {Object.keys(newTask.time).sort(sortNumbers).map(grade => (
                        <Button
                          key={grade}
                          title={`${grade}: ${newTask.time[grade]} часов`}
                          className={styles.hoursButton}
                          onClick={() => {
                            setProgressIfNext({
                              hasGrade: true,
                              grade,
                              time: newTask.time[grade],
                            });
                            closeModalOutside();
                          }}
                        />
                      ))}
                    </div>
                  )
                  : null
              }
            >
              {(toggleModal, closeModal) => {
                toggleModalOutside = toggleModal;
                closeModalOutside = closeModal;

                return (
                  <>
                    <div className={styles.gameEvents}>
                      <div className={styles.laps}>
                        <span className={styles.title}>
                          {gameStarted ? `Круг: ${lap}` : 'Игра еще не началась'}
                        </span>
                        <Button
                          withIcon
                          icon={MenuIcon}
                          className={styles.buttonMenu}
                          onClick={() => setShowTaskList(!showTaskList)}
                        />
                      </div>
                      <div className={styles.eventsCardsContainer}>
                        <div className={styles.cardContainer}>
                          <span className={styles.title}>
                            Случайное событие
                          </span>
                          <div className={styles.descriptionCard}>
                            {gameStarted ? `${event?.description || descriptionPLaceholder}` : ''}
                          </div>
                        </div>
                        <div className={styles.cardContainer}>
                          <span className={styles.title}>
                            Количество фактических часов
                          </span>
                          <div className={styles.timeCard}>
                            {gameStarted ? `${time || timePlaceholder}` : ''}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.cardsContainer}>
                      {players.map((player) => {
                        const {
                          currentTask,
                          currentTaskId,
                          desiredGrade,
                          overallTaskTime,
                          remainingTaskTime,
                          timeSpent,
                        } = progress[player];

                        const taskProgress = currentTaskId / 18 * 100;

                        let divProgress = (overallTaskTime - remainingTaskTime)
                          / overallTaskTime
                          * 100;

                        if (remainingTaskTime < 0) {
                          divProgress = 100;
                        }

                        const isActive = player === players[currentPlayerIndex];

                        return (
                          <WindowResizer>
                            {(width) => {
                              const isMobile = width <= 767;

                              return (
                                <Transition
                                  in={!isMobile || isActive}
                                  timeout={350}
                                  unmountOnExit
                                  mountOnEnter
                                  enter
                                >
                                  {cardAnimation => (
                                    <Card
                                      key={player}
                                      className={cx(
                                        styles.card,
                                        {
                                          [styles.cardActive]: isActive,
                                          [styles.cardEntering]: cardAnimation === 'entering',
                                          [styles.cardExiting]: cardAnimation === 'exiting',
                                        },
                                      )}
                                    >
                                      <span className={styles.cardName}>{player}</span>
                                      <div className={styles.progressContainer}>
                                        <div
                                          className={styles.progress}
                                          style={{ width: `${taskProgress}%` }}
                                        />
                                      </div>
                                      <span className={styles.cardTask}>#{currentTask.title}: {currentTask.description}</span>
                                      <span className={styles.cardTaskTime}>Время для выполнения задания: {overallTaskTime}</span>
                                      {desiredGrade && (
                                        <span className={styles.cardTaskTime}>Оценка: {desiredGrade}</span>
                                      )}
                                      <span className={styles.cardTaskTime}>
                                        {remainingTaskTime > 0 ? 'Выполненное время: ' : 'Бонусное время: '}
                                        {remainingTaskTime > 0 ? overallTaskTime - remainingTaskTime : -remainingTaskTime}
                                      </span>
                                      <div className={styles.progressContainerTask}>
                                        <div
                                          className={styles.progress}
                                          style={
                                            divProgress > 0
                                              ? { width: `${divProgress}%` }
                                              : { width: '0%' }
                                          }
                                        />
                                      </div>
  
                                      {progress[player]?.hasBonus && (
                                        <span className={styles.cardTaskTime}>
                                          Бонус: Игрок пропускает шаг №7, у него уже есть база данных.
                                        </span>
                                      )}
                                    </Card>
                                  )}
                                </Transition>
                              );
                            }}
                          </WindowResizer>
                        );
                      })}
                    </div>

                    {!players.length && Object.keys(results).length && (
                      <div className={styles.resultContainer}>
                        {Object.keys(results).map((playerName) => {
                          const {
                            name,
                            timeSpent,
                            grade,
                          } = results[playerName];

                          return (
                            <Card key={name} className={styles.resultCard}>
                              <span>Name: {name}</span>
                              <span>Time: {timeSpent}</span>
                              <span>Grade: {grade}</span>
                            </Card>
                          );
                        })}
                      </div>
                    )}

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
