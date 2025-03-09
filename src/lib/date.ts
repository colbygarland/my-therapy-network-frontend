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
