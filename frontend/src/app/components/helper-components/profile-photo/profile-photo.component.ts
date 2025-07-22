import { Component ,Input} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile-photo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-photo.component.html',
  styleUrl: './profile-photo.component.css'
})
export class ProfilePhotoComponent {
  @Input() userName:String="";
  @Input() profilephotourl:string ="";
  @Input() width:string="12";
  @Input() height:string='12';
  get profile():string{
    if(!this.userName) return "";
    const parts=this.userName[0]+this.userName[1];
    return parts;
  }
}
