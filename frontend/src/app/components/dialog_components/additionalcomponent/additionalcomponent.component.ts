import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-additionalcomponent',
  templateUrl: './additionalcomponent.component.html',
  styleUrls: ['./additionalcomponent.component.scss']
})
export class AdditionalcomponentComponent {
  name: string = '';
  uploadedFile: File | null = null;
  uploadfile: boolean = false;
  constructor(private dialogRef: MatDialogRef<AdditionalcomponentComponent>) { }

  submit() {
    if (this.uploadedFile && this.name.trim()) {
      this.dialogRef.close({
        AdditionalFile: this.uploadedFile,
        AdditionalDocType: this.name.trim()
      });
    }

  }
  removekyc() {
    this.name = '';
    this.uploadedFile = null;
    this.uploadfile = false;
  }

  cancel() {
    this.dialogRef.close();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadfile = true;
      this.uploadedFile = input.files[0];
      console.log('Selected file:', this.uploadedFile);
    }
    else {
      this.uploadfile = false;
    }
  }
}
