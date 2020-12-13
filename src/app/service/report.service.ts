import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Moment} from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private static ROOT_ENDPOINT = '/api/report';

  public generateUrl(dateFrom: Moment, dateTo: Moment, format: string): string {
    const dateFromFormatted: string = dateFrom.format('Y-MM-DD 00:00:00');
    const dateToFormatted: string = dateTo.format('Y-MM-DD 00:00:00');
    return `${environment.apiUrl}${ReportService.ROOT_ENDPOINT}?date-from=${dateFromFormatted}&date-to=${dateToFormatted}&format=${format}`;
  }
}
