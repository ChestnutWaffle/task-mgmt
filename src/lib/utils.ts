export function dateToDateInput(date: Date) {
  const dateFullYear = date.getFullYear();
  let dateMonth = (date.getMonth() + 1).toString();
  let dateDate = date.getDate().toString();
  const dateHours = date.getHours();
  const dateMins = date.getMinutes();

  if (dateMonth.length === 1) {
    dateMonth = "0" + dateMonth;
  }
  if (dateDate.length === 1) {
    dateDate = "0" + dateDate;
  }

  return `${dateFullYear}-${dateMonth}-${dateDate}T${dateHours}:${dateMins}`;
}
