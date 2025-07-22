import { Component } from '@angular/core';
import { AdditionalcomponentComponent } from '../../dialog_components/additionalcomponent/additionalcomponent.component';
import { HelperServiceService } from '../../../shared/helper-service.service';

import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-helperform2',
  standalone: true,
  imports: [AdditionalcomponentComponent],
  templateUrl: './helperform2.component.html',
  styleUrl: './helperform2.component.css'
})
export class Helperform2Component {
   constructor(private dialog: MatDialog, private helperService: HelperServiceService) {}
  AdditionalDoc: File[] = [];

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.AdditionalDoc.push(...Array.from(input.files));
    }
  }

  onSaveForm2() {
    this.helperService.setForm2Data({ files: this.AdditionalDoc });
  }
  openAdditionalUploadDialog() {
    this.dialog.open(AdditionalcomponentComponent);
  }
}
