import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
})
export class FilterDialogComponent {
  selectedServiceTypes: string[] = [];
  selectedOrganizations: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedServiceTypes = [...data.initialServices || []];
    this.selectedOrganizations = [...data.initialOrganizations || []];
  }

  applyFilters() {
    this.dialogRef.close({
      services: this.selectedServiceTypes,
      organizations: this.selectedOrganizations
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  resetFilters() {
    this.selectedServiceTypes = [];
    this.selectedOrganizations = [];
  }
}

