export const FormatTime = (time) => {
  let hour = `${parseInt(time / 60)}`.padStart(2, 0);
  let minute = `${time % 60}`.padStart(2, 0);
  let result = `${hour}:${minute}`;
  return result;
};
