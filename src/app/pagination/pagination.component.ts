import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pagesAmount = 0;
  @Output() pageChanged: EventEmitter<any> = new EventEmitter<number>();

  currentPage = 1;
  pages: any[] = [];

  ngOnInit() {
    this.countPagesAmount();
  }

  ngOnChanges(): void {
    this.countPagesAmount();
  }

  changePage(page: number, isEmit = true) {
    if (page < 1 || page > this.pages[this.pages.length - 1]) {
      return;
    }
    this.currentPage = page;
    if (isEmit) {
      this.pageChanged.emit(page);
    }
  }

  private countPagesAmount() {
    const totalPages = this.pagesAmount;
    this.pages = [1];
    if (isNaN(totalPages) || totalPages <= 1) {
      this.changePage(1, false);
      return;
    }

    let i = Math.max(2, this.currentPage - 5);
    if (i > 2) {
      this.pages.push('...');
    }

    for (; i < Math.min(this.currentPage + 6, totalPages); i++) {
      this.pages.push(i);
    }

    if (i !== totalPages) {
      this.pages.push('...');
    }
    this.pages.push(totalPages);
    this.changePage(1, false);
  }
}
