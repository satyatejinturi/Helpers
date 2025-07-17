import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelperDataComponent } from './helper-data/helper-data.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HelperCardComponent } from './shared/helper-card/helper-card.component';
import { HelperServiceService } from './shared/helper-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,HelperCardComponent,HelperDataComponent],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  allhelper:any[]=[];
  selectedhelper:any=null;
  constructor(public helpersharedservice:HelperServiceService){}
  ngOnInit(): void {
    this.helpersharedservice.getData().subscribe(
      data=>{
        this.allhelper=data;
        console.log("data received");
        if(this.allhelper.length){
          this.selectedhelper=this.allhelper[0];
        }
      },
      error=>{
        console.log(error);
      }
    )
  }
  handleselect(helper:any){
    this.selectedhelper=helper;
  }
}
