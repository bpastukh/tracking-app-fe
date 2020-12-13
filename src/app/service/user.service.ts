import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {ApiResponse} from '../model/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private client: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    return this.client.post<{ code: number, payload: any }>(`${environment.apiUrl}/login`, {email, password}, {withCredentials: true})
      .pipe(
        map(
          data => {
            if (data === null) {
              return throwError('null data');
            }
            this.isAuthenticated.next(true);
            return data;
          }
        )
      );
  }

  logout(): void {
    this.isAuthenticated.next(false);
  }

  register(email: string, password: string): Observable<ApiResponse> {
    return this.client.post<{ code: number, payload: object }>(`${environment.apiUrl}/register`, {email, password});
  }
}
