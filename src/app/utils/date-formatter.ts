import {Moment} from 'moment';

export function formatDate(date: Moment): string {
  return date.format('Y-MM-DD 00:00:00');
}
