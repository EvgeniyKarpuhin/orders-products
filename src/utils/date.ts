export function formatDateShort(d: string | Date): string {
  try {
    const date = typeof d === 'string' ? new Date(d) : d

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date')
    }

    const day = date.toLocaleString('ru-RU', { day: '2-digit' })
    let month = date.toLocaleString('ru-RU', { month: 'short' })
    month = month.replace('.', '')
    month = month.charAt(0).toUpperCase() + month.slice(1)
    const year = date.getFullYear()

    return `${day} / ${month} / ${year}`
  } catch {
    return typeof d === 'string' ? d : ''
  }
}