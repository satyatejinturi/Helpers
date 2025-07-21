  import { Component, effect, OnInit } from '@angular/core';
  import { Router, RouterOutlet } from '@angular/router';
  import { HelperDataComponent } from '../../components/helper-data/helper-data.component';
  import { SidebarComponent } from '../../components/aside-components/sidebar/sidebar.component';
  import { HelperCardComponent } from '../../components/helper-components/helper-card/helper-card.component';
  import { HelperServiceService } from '../../shared/helper-service.service';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms'; 
  @Component({
    selector: 'app-portal',
    standalone: true,
    imports: [ SidebarComponent, HelperCardComponent, HelperDataComponent,CommonModule,FormsModule],
    templateUrl: './portal.component.html',
    styleUrl: './portal.component.css'
  })
  export class PortalComponent implements OnInit{
    allhelper=this.helperservice.helper;
    selectedhelper:any=null;
    searchterm:string="";
    nofhelpers = this.helperservice.noofhelpers;
    constructor(public helperservice:HelperServiceService,public router:Router){}
    ngOnInit(): void {
      this.helperservice.getData();
    
    }
    handleselect(helper: any) {
      this.selectedhelper = helper;
    }
    onclick(){
      this.router.navigate(['/add-edit-helper']);
      console.log("buton clicked");
    }
  }
