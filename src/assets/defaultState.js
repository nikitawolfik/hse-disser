import { tasks } from './tasks';

export const defaultState = {
  currentTask: tasks[1],
  currentTaskId: 1,
  desiredGrade: null,
  overallTaskTime: tasks[1].time,
  remainingTaskTime: tasks[1].time,
  timeSpent: 0,
  grades: {},
  hasBonus: false,
  hasToSkip: false,
  bonusTime: 0,
};
