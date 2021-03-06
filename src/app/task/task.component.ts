import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from '../service/task.service';
import {Task} from '../model/Task';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {CreateTaskDialogComponent} from './create-task-dialog/create-task-dialog.component';
import {GenerateReportDialogComponent} from './generate-report-dialog/generate-report-dialog.component';
import {UserService} from '../service/user.service';
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
  public pageNumber = 0;
  public totalPages = 0;
  public displayedColumns: string[] = ['title', 'comment', 'loggedTime', 'createdAt'];
  public dataSource = new MatTableDataSource<Task>();

  private subscription: Subscription[] = [];

  constructor(private taskService: TaskService, private dialog: MatDialog, public userService: UserService) {
  }

  addTask(): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent);

    this.subscription.push(
      dialogRef.afterClosed().subscribe((shouldUpdateData = false) => {
        if (shouldUpdateData) {
          this.pageNumber = 0;
          this.fetchTasks();
        }
      })
    );
  }

  generateReport(): void {
    this.dialog.open(GenerateReportDialogComponent);
  }

  ngOnInit(): void {
    this.fetchTasks();
  }

  onPageChanged(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.fetchTasks();
  }

  private fetchTasks() {
    this.subscription.push(
      this.taskService.list(this.pageNumber).subscribe(
        (data) => {
          this.dataSource.data = data.payload.items;
          this.totalPages = data.payload.totalPages;
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscr) => subscr.unsubscribe());
  }
}
