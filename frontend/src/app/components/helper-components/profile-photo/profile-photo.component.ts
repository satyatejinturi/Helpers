import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-photo',
  standalone: true,
  imports: [CommonModule],
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

  get sizeClasses(): string {
    const w = this.width || '12';
    const h = this.height || '12';
    return `w-${w} h-${h}`;
  }
}
