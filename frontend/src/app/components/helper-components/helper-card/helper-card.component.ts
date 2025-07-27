import { Component,Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePhotoComponent } from '../profile-photo/profile-photo.component';

@Component({
  selector: 'app-helper-card',
  
  templateUrl: './helper-card.component.html',
  styleUrl: './helper-card.component.css'
})
export class HelperCardComponent {
    @Input() helper:any;
  }
