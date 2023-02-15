export function getFormattedDate(date) {
  let year = `${date.getFullYear()}`
  let month = `${(date.getMonth()+1)}`
  let day = `${date.getDate()}`
  if ((date.getMonth()+1) < 10) month = `0${month}`;
  if (date.getDate() < 10) day = `0${day}`;


  let value = `${year}-${month}-${day}`
  return value;
}

export function getFormattedDateDDMM(date) {
  let month = `${(date.getMonth()+1)}`
  let day = `${date.getDate()}`
  if ((date.getMonth()+1) < 10) month = `0${month}`;
  if (date.getDate() < 10) day = `0${day}`;


  let value = `${day}-${month}`
  return value;
}

export function getFormattedTime(date) {
  let hours = `${date.getHours()}`
  let minutes = `${date.getMinutes()}`
  if (date.getHours() < 10) hours = `0${hours}`;
  if (date.getMinutes() < 10) minutes = `0${minutes}`;

  let value = `${hours}:${minutes}`
  return value;
}

export function getFirstDayOfTheMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getTimeBetweenDates(dateStart, dateEnd) {
  hourStart = dateStart.getHours();
  minuteStart = dateStart.getMinutes();
  hourEnd = dateEnd.getHours();
  minuteEnd = dateEnd.getMinutes();

  hoursBetween = (hourEnd-hourStart)
  minutesBetween = (minuteEnd-minuteStart)

  value = hoursBetween + minutesBetween/60

  return value;
}

export function getMMDDfromDDMM(DDMMString) {
  let DD = DDMMString.slice(0, 2)
  let MM = DDMMString.slice(-2)
  let resultMMDD = MM +'-'+ DD;
  //console.log(resultMMDD);

  return resultMMDD;
}