import { CommonModule } from '@angular/common';
import { ProfilePhotoComponent } from '../../helper-components/profile-photo/profile-photo.component';
import { HelperCardComponent } from '../../helper-components/helper-card/helper-card.component';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnChanges {
  @Input() allhelper: any[] = [];
  @Output() selectedhelper = new EventEmitter<any>();
  @Input() sortType: 'employeeid' | 'fullName' | null = null;
  curind = 0;
  sortedHelpers: any[] = [];
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allhelper']  || changes['sortType'] ) {
      this.applySort();
      
      if (this.sortedHelpers.length > 0) {
        this.selectedhelper.emit(this.sortedHelpers[0]);
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
