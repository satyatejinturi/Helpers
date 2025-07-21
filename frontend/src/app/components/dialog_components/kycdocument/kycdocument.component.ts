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

@Component({
  selector: 'app-kycdocument',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FormsModule
  ],
  templateUrl: './kycdocument.component.html',
  styleUrl: './kycdocument.component.css'
})
export class KycdocumentComponent {
  name:string=""
  @Output() Kycdoctype=new EventEmitter<any>();
  @Output() Kycdoc=new EventEmitter<any>();
  constructor(private dialogRef: MatDialogRef<KycdocumentComponent>) {}
  submit(){
    this.dialogRef.close()
  }
  cancel(){
    this.dialogRef.close();
  }
  onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    console.log('Selected file:', file);
  }
}
}
