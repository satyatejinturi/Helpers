import { Component } from '@angular/core';
import { ProfilePhotoComponent } from '../../components/helper/profile-photo/profile-photo.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [ProfilePhotoComponent,FormsModule,CommonModule],
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent {
    username:string="example";
    
}
