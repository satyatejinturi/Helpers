import { CommonModule } from '@angular/common';
import { Component ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfilePhotoComponent } from '../../helper-components/profile-photo/profile-photo.component';

@Component({
  selector: 'app-helper-dialog',
  
  templateUrl: './helper-dialog.component.html',
  styleUrl: './helper-dialog.component.css'
})
export class HelperDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
  }
}
