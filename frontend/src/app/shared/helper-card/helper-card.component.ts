import { Component,Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePhotoComponent } from '../profile-photo/profile-photo.component';

@Component({
  selector: 'app-helper-card',
  standalone: true,
  imports: [CommonModule,ProfilePhotoComponent],
  templateUrl: './helper-card.component.html',
  styleUrl: './helper-card.component.css'
})
export class HelperCardComponent {
    @Input() qrcodeurl:string="";
    @Input() username:string="";
    @Input() employee_id:string="";
    @Input() typeofservice:string="";
    @Input() orgName:string="";
    @Input() phonenumber:string="";
    @Input() profilephotourl:string="";
    @Input() joineddate:string="";
  }
