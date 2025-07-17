// helper-data.component.ts
import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperServiceService } from '../shared/helper-service.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-helper-data',
  standalone: true,
  imports: [CommonModule,FormsModule],
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
