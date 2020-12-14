import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {TaskService} from '../../service/task.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent implements OnDestroy {
  public form: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    comment: [''],
    loggedTime: ['', [Validators.required]],
    createdAt: ['', Validators.required],
  });
  public error?: string;

  private subscription: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<CreateTaskDialogComponent>) {
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  submit(): void {
    this.error = undefined;
    this.subscription.push(
      this.taskService.create(this.form.getRawValue()).subscribe(
        () => this.dialogRef.close(true),
        err => this.error = err.message,
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscr) => subscr.unsubscribe());
  }
}
