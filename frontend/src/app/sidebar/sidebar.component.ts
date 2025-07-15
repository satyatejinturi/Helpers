import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sidebarService } from './sidebar.service';
import { ProfilePhotoComponent } from '../shared/profile-photo/profile-photo.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,ProfilePhotoComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
    getdata: any;
    constructor (private sidebarservice:sidebarService){}
    ngOnInit(): void {
      this.sidebarservice.getData().subscribe(
        data=>{
          this.getdata=data;
          console.log(`data received ${this.getdata}`);
        },
        error =>{
          console.log(`error fetching ${error}`);
        }
      );
    }
}
