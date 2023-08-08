export function dateToDateInput(date: Date) {
  const dateFullYear = date.getFullYear();
  let dateMonth = (date.getMonth() + 1).toString();
  let dateDate = date.getDate().toString();
  let dateHours = date.getHours().toString();
  let dateMins = date.getMinutes().toString();

  if (dateMonth.length === 1) {
    dateMonth = "0" + dateMonth;
  }
  if (dateDate.length === 1) {
    dateDate = "0" + dateDate;
  }
  if (dateHours.length === 1) {
    dateHours = "0" + dateHours;
  }
  if (dateMins.length === 1) {
    dateMins = "0" + dateMins;
  }

  const result = `${dateFullYear}-${dateMonth}-${dateDate}T${dateHours}:${dateMins}`;

  // console.log(result);

  return result;
}
