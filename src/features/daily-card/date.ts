function padDatePart(value: number) {
  return String(value).padStart(2, '0');
}

export function getLocalCardDate(date = new Date()) {
  return [
    date.getFullYear(),
    padDatePart(date.getMonth() + 1),
    padDatePart(date.getDate()),
  ].join('-');
}
