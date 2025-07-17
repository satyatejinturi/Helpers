import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilePhotoComponent } from '../shared/profile-photo/profile-photo.component';
import { HelperCardComponent } from '../shared/helper-card/helper-card.component';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,ProfilePhotoComponent,HelperCardComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  @Input() allhelper:any[]=[];
  @Output() selectedhelper = new EventEmitter<any>();
  curind=0;
    ngOnInit(): void {
      if(this.allhelper.length){
        this.selectedhelper.emit(this.allhelper[0]);
      }
    }
    selectuser(user:any,ind:number){
      this.curind=ind;
      this.selectedhelper.emit(user);
    }
}
