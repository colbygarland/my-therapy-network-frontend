export const formatDate = (dateInUTC: string) => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const date = new Date(dateInUTC)
  return date.toLocaleString('en-US', {
    timeZone: userTimezone,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

export const toUTC = (date: Date) => {
  return date.toISOString().replace('Z', '000Z')
}

export const today = () => {
  return new Date()
}
