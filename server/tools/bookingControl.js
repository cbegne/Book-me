import moment from 'moment';

const checkDuration = async (startingTime, endingTime) => {
  const duration = moment(endingTime).diff(startingTime, 'minutes');
  if (duration < 0) {
    return 'Votre réservation a une heure de fin antérieure à l\'heure de début. Vérifiez vos horaires !';
  }
  if (duration < 15) {
    return 'Pas de réservation de moins de 15 minutes !';
  }
  return null;
}


export { checkDuration };
