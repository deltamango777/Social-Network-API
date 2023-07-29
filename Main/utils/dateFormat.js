// Moved the month object outside of the function to avoid re-creation on every function call
const months = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

const addDateSuffix = (date) => {
  if (typeof date !== 'number') {
    throw new Error('Date should be a number');
  }

  let dateStr = date.toString();

  // get last char of date string
  const lastChar = dateStr.charAt(dateStr.length - 1);

  // Add suffix based on last char
  switch (lastChar) {
    case '1':
      dateStr += 'st';
      break;
    case '2':
      dateStr += 'nd';
      break;
    case '3':
      dateStr += 'rd';
      break;
    default:
      dateStr += 'th';
      break;
  }

  return dateStr;
};

// function to format a timestamp, accepts the timestamp and an `options` object as parameters
module.exports = (
  timestamp,
  { monthLength = 'short', dateSuffix = true } = {}
) => {
  if (isNaN(Date.parse(timestamp))) {
    throw new Error('Invalid timestamp');
  }

  const dateObj = new Date(timestamp);
  const formattedMonth = months[dateObj.getMonth()];

  const dayOfMonth = dateSuffix
    ? addDateSuffix(dateObj.getDate())
    : dateObj.getDate();

  const year = dateObj.getFullYear();
  let hour = dateObj.getHours() % 12;

  // if hour is 0 (12:00am), change it to 12
  if (hour === 0) {
    hour = 12;
  }

  const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();

  // set `am` or `pm`
  const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

  const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

  return formattedTimeStamp;
};
