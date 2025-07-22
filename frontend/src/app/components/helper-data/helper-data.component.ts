// helper-data.component.ts
import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperServiceService } from '../../shared/helper-service.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfilePhotoComponent } from '../helper-components/profile-photo/profile-photo.component';
@Component({
  selector: 'app-helper-data',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,ProfilePhotoComponent],
  templateUrl: './helper-data.component.html',
  styleUrls: ['./helper-data.component.css']
})
export class HelperDataComponent {
  @Input() helper: any;
searchTerm: string = '';
  helpers = this.service4all.helper;

  constructor(public service4all: HelperServiceService) {}

  ondeletehelper(id: number) {
    this.service4all.deletehelper(id);
  }
  onGetData() {
    this.service4all.getData();
  }
}
