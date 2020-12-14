import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Moment} from 'moment';
import {formatDate} from '../utils/date-formatter';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private static ROOT_ENDPOINT = '/api/report';

  public generateUrl(dateFrom: Moment, dateTo: Moment, format: string): string {
    const dateFromFormatted: string = formatDate(dateFrom);
    const dateToFormatted: string = formatDate(dateTo);
    return `${environment.apiUrl}${ReportService.ROOT_ENDPOINT}?date-from=${dateFromFormatted}&date-to=${dateToFormatted}&format=${format}`;
  }
}
