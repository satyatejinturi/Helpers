import { Component ,Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperServiceService } from '../shared/helper-service.service';
@Component({
  selector: 'app-helper-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './helper-data.component.html',
  styleUrls: ['./helper-data.component.css']
})
export class HelperDataComponent {
  @Input() helper:any;
  Alldata:any;
  
  constructor(public service4all:HelperServiceService){}
  ondeletehelper(id:number){
    this.service4all.deletehelper(id).subscribe({
      next:(Response)=>{
        console.log(`deleted success ${id} and ${Response}`)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  onGetData()
  {
    this.service4all.getData().subscribe((data)=>{
      this.Alldata=data;
    },
    (error)=>{
      console.log(error);
    }
    )
  }
}
