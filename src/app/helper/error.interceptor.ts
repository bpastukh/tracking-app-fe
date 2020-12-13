import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Router} from '@angular/router';
import {UserService} from '../service/user.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: UserService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 && err.message !== 'Bad credentials') {
        this.authenticationService.logout();

        this.router.navigateByUrl('/login');
      }

      if (err.error.hasOwnProperty('payload')) {
        return throwError(err.error.payload);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
