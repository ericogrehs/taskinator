export const formatDateToApi = date =>
  date && date.replace(/(\d*)\/(\d*)\/(\d*)/g, '$3-$2-$1T10:00:00.000Z')
