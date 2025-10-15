export function formatDateShort(d) {
  try {
    const date = new Date(d)
    const day = date.toLocaleString('ru-RU', { day: '2-digit'})
    let month = date.toLocaleString('ru-RU', { month: 'short'})
    month = month.replace('.', '')
    month = month.charAt(0).toUpperCase() + month.slice(1)
    const year = date.getFullYear()
    return `${day} / ${month} / ${year}`
  } catch { 
    return d 
  }
}