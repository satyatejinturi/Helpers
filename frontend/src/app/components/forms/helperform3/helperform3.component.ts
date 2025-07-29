import { Input, effect, Output, EventEmitter } from '@angular/core';
import { ProfilePhotoComponent } from '../../helper-components/profile-photo/profile-photo.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HelperServiceService } from '../../../shared/helper-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HelperCardComponent } from '../../helper-components/helper-card/helper-card.component';
import { MatDialog } from '@angular/material/dialog';
import { HelperDialogComponent } from '../../dialog_components/helper-dialog/helper-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-helperform3',

  templateUrl: './helperform3.component.html',
  styleUrl: './helperform3.component.css'
})
export class Helperform3Component implements OnInit {
  @Input() isEditMode: boolean = false;
  @Input() employeeId: number | null = null;
  @Output() loadingChange = new EventEmitter<boolean>();
  helper: any;
  loading = false;

  constructor(
    private snackBar: MatSnackBar,
    private helperService: HelperServiceService,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) { }

  showcard: boolean = false;

  get showpopup(): boolean {
    return this.helperService.showsucess();
  }

  ngOnInit() {
    const data1 = this.helperService.getForm1Data();
    const data2 = this.helperService.getForm2Data();
    const plainData1: any = {};
    console.log('data1 is:', data1);
    console.log('Type:', typeof data1);

    for (const [key, value] of Object.entries(data1)) {
      if (key === 'languages[]' || key === 'languages') {
        if (!plainData1.languages) plainData1.languages = [];
        plainData1.languages.push(value);
      } else {
        plainData1[key] = value;
      }
    }

    this.helper = {
      ...plainData1,
      ...data2
    };

    console.log('data1:', plainData1);
    console.log('data2:', data2);
    console.log('helper:', this.helper);
  }

  submitHelper() {
    const data1 = this.helperService.getForm1Data();
    const data2 = this.helperService.getForm2Data();
    const formData = new FormData();

    this.loading = true;
    this.loadingChange.emit(true);

    for (const key in data1) {
      if (key === 'languages' && Array.isArray(data1.languages)) {
        data1.languages.forEach((lang: string) => {
          formData.append('languages[]', lang);
        });
      } else {
        formData.append(key, data1[key]);
      }
    }

    if (data2?.files) {
      data2.files.forEach((file: File) => {
        formData.append('additionalDocs', file);
      });
    }

    formData.forEach((v, k) => console.log(k, v));
    if (this.isEditMode && this.employeeId) {
      this.helperService.updateHelper(this.employeeId, formData);
      this.snackBar.open('Helper updated successfully!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });

      this.loading = false;
      this.loadingChange.emit(false);
      this.router.navigate(['/']);
    } else {
      this.helperService.postData(formData).subscribe({
        next: (res) => {
          this.snackBar.open('Helper added successfully!', 'Close', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.loading = false;
          this.loadingChange.emit(false);

          const dialogRef = this.dialog.open(HelperDialogComponent, {
            width: '700px',
            height: '600px',
            data: res,
            panelClass: 'custom-dialog-container'
          });

          dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/']);
          });
        },
        error: (err) => {
          this.loading = false;
          console.error('Post failed:', err);
          this.snackBar.open('Failed to add helper.', 'Close', {
            horizontalPosition: 'right',
            verticalPosition: 'top',

            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }


  closepopup() {
    this.showcard = false;
    this.router.navigate(['/']);
  }
}