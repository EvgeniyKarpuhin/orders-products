import { useI18n } from 'vue-i18n';
export function formatDateShort(d: string | Date): string {
  const { locale } = useI18n()
  try {
    const date = typeof d === 'string' ? new Date(d) : d

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date')
    }

    const day = date.toLocaleString(locale.value, { day: '2-digit' })
    let month = date.toLocaleString(locale.value, { month: 'short' })
    month = month.replace('.', '')
    month = month.charAt(0).toUpperCase() + month.slice(1)
    const year = date.getFullYear()

    return `${day} / ${month} / ${year}`
  } catch {
    return typeof d === 'string' ? d : ''
  }
}