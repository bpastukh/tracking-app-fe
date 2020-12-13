import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../model/ApiResponse';
import {environment} from '../../environments/environment';
import {Task} from '../model/Task';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private static ROOT_ENDPOINT = '/api/task';

  constructor(private httpClient: HttpClient) {
  }

  public create(task: Task): Observable<ApiResponse> {
    const createdAt = moment(task.createdAt).format('Y-MM-DD 00:00:00');
    return this.httpClient.post<ApiResponse>(`${environment.apiUrl}${TaskService.ROOT_ENDPOINT}`, {
      ...task,
      createdAt
    }, {withCredentials: true});
  }

  public list(page: number): Observable<ApiResponse> {
    const params = new HttpParams().append('page', String(page));
    return this.httpClient.get<ApiResponse>(`${environment.apiUrl}${TaskService.ROOT_ENDPOINT}`, {params, withCredentials: true});
  }
}
