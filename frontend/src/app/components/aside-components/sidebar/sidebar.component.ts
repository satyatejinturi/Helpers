import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-sidebar',

  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnChanges {
  @Input() allhelper: any[] = [];
  @Output() selectedhelper = new EventEmitter<any>();
  @Input() sortType: 'employeeid' | 'fullName' | null = null;
  @Output() lengthEmitted = new EventEmitter<number>();
  curind = 0;
  sortedHelpers: any[] = [];
  
  ngOnInit(): void {
    this.lengthEmitted.emit(this.allhelper.length);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allhelper'] || changes['sortType']) {
      this.applySort();
      this.lengthEmitted.emit(this.allhelper.length);
      if (this.sortedHelpers.length > 0) {
        this.selectedhelper.emit(this.sortedHelpers[0]);
      }
      if (this.sortedHelpers.length === 0) {
        this.selectedhelper.emit(null);
      }
    }
  }
  selectuser(user: any, ind: number) {
    this.curind = ind;
    this.selectedhelper.emit(user);
  }
  applySort() {
    if (!this.allhelper) return;

    this.sortedHelpers = [...this.allhelper];

    if (this.sortType === 'employeeid') {
      this.sortedHelpers.sort((a, b) => a.employeeid - b.employeeid);
    } else if (this.sortType === 'fullName') {
      this.sortedHelpers.sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
      );
    }
  }

}
