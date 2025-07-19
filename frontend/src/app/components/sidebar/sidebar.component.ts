
import { CommonModule } from '@angular/common';

import { ProfilePhotoComponent } from '../helper/profile-photo/profile-photo.component';
import { HelperCardComponent } from '../helper/helper-card/helper-card.component';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ProfilePhotoComponent, HelperCardComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnChanges {
  @Input() allhelper: any[] = [];
  @Output() selectedhelper = new EventEmitter<any>();

  curind = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allhelper'] && this.allhelper.length > 0) {
      this.selectedhelper.emit(this.allhelper[0]);
    }
  }

  selectuser(user: any, ind: number) {
    this.curind = ind;
    this.selectedhelper.emit(user);
  }
}
