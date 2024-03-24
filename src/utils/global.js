export default function convertDateFormat(dateStr) {
  // Split the string by spaces to remove the day of the week
  const parts = dateStr.split(' ')

  // Rejoin the parts without the first element (the day of the week)
  const newDateStr = parts.slice(1).join(' ')

  return newDateStr
}
