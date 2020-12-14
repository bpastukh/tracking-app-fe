import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginInvalid = false;
  public form!: FormGroup;
  private subscription: Subscription[] = [];
  private returnUrl = '/task';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
  }

  async ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });

    this.subscription.push(
      this.userService.isAuthenticated.asObservable().subscribe((isAuthenticated) => {
        console.log(isAuthenticated);
        if (isAuthenticated) {
          this.router.navigate([this.returnUrl]);
        }
      })
    );
  }

  async onSubmit() {
    this.loginInvalid = false;
    if (this.form.valid) {
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;
      this.subscription.push(
        this.userService.login(username, password).subscribe(
          () => {
            this.router.navigate([this.returnUrl]);
          },
          () => this.loginInvalid = true
        )
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscr) => subscr.unsubscribe());
  }
}
