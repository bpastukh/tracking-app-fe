import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {ReportService} from '../../service/report.service';
import * as _moment from 'moment';
import {Moment} from 'moment';

const moment = _moment;

@Component({
  selector: 'app-generate-report-dialog',
  templateUrl: './generate-report-dialog.component.html',
  styleUrls: ['./generate-report-dialog.component.scss'],
  providers: [],
})
export class GenerateReportDialogComponent {
  form: FormGroup = this.formBuilder.group({
    dateFrom: ['', [Validators.required]],
    dateTo: ['', [Validators.required]],
    format: ['pdf', [Validators.required]],
  });

  error?: string;

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private dialogRef: MatDialogRef<GenerateReportDialogComponent>) {
  }


  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.error = undefined;
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;
    const dateFrom: Moment = moment(formValue.dateFrom);
    const dateTo: Moment = moment(formValue.dateTo);
    const format: string = formValue.format;

    window.open(this.reportService.generateUrl(dateFrom, dateTo, format));
    this.dialogRef.close();
  }
}
