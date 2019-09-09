import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { tasks } from 'assets';
import { Button } from 'components';
import CloseIcon from 'assets/svg/cross.svg';

import styles from './styles.module.scss';


const TaskList = ({ currentPlayerProgress, close, className }) => {
  const { currentTaskId, desiredGrade } = currentPlayerProgress || {};
  const taskIds = Object.keys(tasks);

  const handleKeyDown = ({ key }) => {
    if (key === 'Escape') {
      close();
    }
  };

  return (
    <>
      <div tabIndex={0} onKeyDown={handleKeyDown} className={cx(styles.container, className)}>
        <div className={styles.header}>
          <h2>Список задач</h2>
          <Button
            className={styles.button}
            withIcon
            icon={CloseIcon}
            onClick={close}
          />

        </div>
        {taskIds.map((id) => {
          const {
            description,
            time,
            title,
            grades,
          } = tasks[id];

          return (
            <div key={title} className={cx(styles.task, { [styles.activeTask]: id == currentTaskId })}>
              <div className={styles.description}>
                <span>{title}: {description}</span>
              </div>
              {grades && (
                <div className={styles.grades}>
                  {grades.map(grade => (
                    <p
                      key={`${id}${grade}`}
                      className={cx(
                        { [styles.activeGrade]: grade == desiredGrade && id == currentTaskId },
                      )}
                    >{
                      grade}: {time[grade]} hours
                    </p>
                  ))}

                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

TaskList.propTypes = {
  currentPlayerProgress: PropTypes.shape({}),
};

export default TaskList;
