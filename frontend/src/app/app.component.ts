// app.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelperDataComponent } from './helper-data/helper-data.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HelperCardComponent } from './shared/helper-card/helper-card.component';
import { HelperServiceService } from './shared/helper-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HelperCardComponent, HelperDataComponent,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  searchTerm : string ="";
  allhelper = this.helpersharedservice.helper;
  selectedhelper: any = null;
  constructor(public helpersharedservice: HelperServiceService) {}
  ngOnInit(): void {
    this.helpersharedservice.getData();
    
  }
  handleselect(helper: any) {
    this.selectedhelper = helper;
  }
  handlechange(){
    
  }
}
