import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ProfilePhotoComponent } from '../../helper-components/profile-photo/profile-photo.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-helperform3',
  standalone: true,
  imports: [ProfilePhotoComponent,CommonModule],
  templateUrl: './helperform3.component.html',
  styleUrl: './helperform3.component.css'
})
export class Helperform3Component {
 @Input () helper:any;
}
