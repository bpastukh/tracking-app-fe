import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {TaskService} from '../../service/task.service';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent {
  form: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    comment: [''],
    loggedTime: ['', [Validators.required]],
    createdAt: ['', Validators.required],
  });

  error?: string;

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
    this.taskService.create(this.form.getRawValue()).subscribe(
      () => this.dialogRef.close(true),
      err => this.error = err.message,
    );
  }
}
