import { format as formatDfns, parse } from 'date-fns'
import { fr } from 'date-fns/locale'

export const longDateFormat = 'd MMMM yyyy'
export const dateFormat = 'dd/MM/yyyy'

export function formatDate(date: Date): string {
  return formatDfns(date, longDateFormat, { locale: fr })
}

export function parseDate(date: string): Date {
  return parse(date, dateFormat, new Date())
}
