import moment from 'moment';

const checkDuration = async (startingTime, endingTime) => {
  const duration = moment(endingTime).diff(startingTime, 'minutes');
  if (duration < 0) {
    return 'Your booking ends before it starts. Please check your timing!';
  }
  if (duration < 15) {
    return 'No booking for less than 15 minutes!';
  }
  return null;
}


export { checkDuration };
