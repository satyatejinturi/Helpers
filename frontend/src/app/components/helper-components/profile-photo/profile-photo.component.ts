import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrl: './profile-photo.component.css'
})
export class ProfilePhotoComponent {
  @Input() userName: string = "";
  @Input() profilephotourl: string = "";
  @Input() width: string = "12";
  @Input() height: string = "12";
  get profile(): string {
    if (!this.userName) return "";
    return this.userName.slice(0, 2).toUpperCase();
  }

}
