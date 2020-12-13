import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public authService: UserService, public router: Router) {
  }

  async canActivate() {
    if (!await this.authService.isAuthenticated) {
      await this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
