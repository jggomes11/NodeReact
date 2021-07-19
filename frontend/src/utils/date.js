/**
 * @param {Date} date
 * @returns {String}
 */
export const getDate = (date) => {
  const toDate = new Date(date);
  const day = toDate.getDate() < 10 ? `0${toDate.getDate()}` : toDate.getDate();
  const month =
    toDate.getMonth() < 10 ? `0${toDate.getMonth()}` : toDate.getMonth();
  const year = toDate.getFullYear();

  return `${year}-${month}-${day}`;
};
/**
 * @param {Date} date
 * @returns {String}

 */
export const getTime = (date) => {
  const toDate = new Date(date);

  const hours =
    toDate.getHours() < 10 ? `0${toDate.getHours()}` : toDate.getHours();
  const minutes =
    toDate.getMinutes() < 10 ? `0${toDate.getMinutes()}` : toDate.getMinutes();
  console.log(`${hours}:${minutes}`);
  return `${hours}:${minutes}`;
};
