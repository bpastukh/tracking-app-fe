import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public requestFailed = false;
  public form!: FormGroup;
  private returnUrl = '/task';
  private subscription: Subscription[] = [];

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
        if (isAuthenticated) {
          this.router.navigate([this.returnUrl]);
        }
      })
    );
  }

  async onSubmit() {
    this.requestFailed = false;
    if (this.form.valid) {
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;

      this.userService.register(username, password).subscribe(
        () => {
          this.userService.login(username, password).subscribe(
            () => {
            },
            () => this.requestFailed = true
          );
        },
        () => this.requestFailed = true
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscr) => subscr.unsubscribe());
  }
}
