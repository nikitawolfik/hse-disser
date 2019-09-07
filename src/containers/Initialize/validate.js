export const validateNumber = ({ players }) => {
  const errors = {};
  if (players === 'Выберите количество игроков') {
    errors.players = 'Необходимо выбрать количество игроков.';
  }
  if (!players) {
    errors.players = 'Необходимо выбрать количество игроков.';
  }

  return errors;
};
