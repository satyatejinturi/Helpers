import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelperDataComponent } from '../../components/helper-data/helper-data.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HelperCardComponent } from '../../components/helper/helper-card/helper-card.component';
import { HelperServiceService } from '../../shared/helper-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-portal',
   standalone: true,
   imports: [RouterOutlet, SidebarComponent, HelperCardComponent, HelperDataComponent,CommonModule,FormsModule],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css'
})
export class PortalComponent implements OnInit{
  allhelper=this.helperservice.helper;
  selectedhelper:any=null;
  searchterm:string="";
  constructor(public helperservice:HelperServiceService){}
  ngOnInit(): void {
    this.helperservice.getData();
  }
  handleselect(helper: any) {
    this.selectedhelper = helper;
  }
}
