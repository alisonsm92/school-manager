export function getDateAfter ({ days }) {
  const date = new Date()
  const calculatedDate = date.getDate() + days
  date.setDate(calculatedDate)
  return date
}
