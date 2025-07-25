import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button'; 
@Component({
  selector: 'app-sort-dialog',
  templateUrl: './sortdialog.component.html',
  styleUrls: ['./sortdialog.component.css'],
  standalone: true,
  imports: [CommonModule,MatMenuModule,MatButtonModule],
})
export class SortDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SortDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentSort: string }
  ) {}

  sortOptions = [
    { label: 'Employee ID', value: 'employeeid' },
    { label: 'Helper Name', value: 'fullName' },
  ];

  onSelect(option: string): void {
    this.dialogRef.close(option);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
