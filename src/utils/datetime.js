export function formatDateTime(dateTimeString) {
  const datetimeObj = new Date(dateTimeString);
  return datetimeObj.getUTCDate() + "." +
        ("0" + (datetimeObj.getUTCMonth()+1)).slice(-2) + "." +
        ("0" + datetimeObj.getUTCFullYear()).slice(-2) + " " +
        ("0" + datetimeObj.getUTCHours()).slice(-2) + ":" +
        ("0" + datetimeObj.getUTCMinutes()).slice(-2) + ":" +
        ("0" + datetimeObj.getUTCSeconds()).slice(-2);
}
