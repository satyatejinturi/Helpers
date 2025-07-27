import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-kycdocument',
  
  templateUrl: './kycdocument.component.html',
  styleUrl: './kycdocument.component.css'
})
export class KycdocumentComponent {
  name:string=""
  Kycdoctype=new EventEmitter<any>();
  Kycdoc=new EventEmitter<any>();
  documentTypes: string[] = ['Aadhar', 'PAN', 'Driving License', 'Passport', 'Voter ID'];

  constructor(private dialogRef: MatDialogRef<KycdocumentComponent>) {}
  submit() {
    if (this.uploadedFile && this.name.trim()) {
      this.dialogRef.close({
        kyc: this.uploadedFile,
        kycDocType: this.name.trim()
      });
    } else {
      alert('Please provide both document type and file');
    }
  }
  cancel(){
    this.dialogRef.close();
  }
  uploadedFile: File | null = null;

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFile = input.files[0];
      console.log('Selected file:', this.uploadedFile);
    }
  }

}
