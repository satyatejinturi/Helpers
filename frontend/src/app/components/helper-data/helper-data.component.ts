import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperServiceService } from '../../shared/helper-service.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ProfilePhotoComponent } from '../profile-photo/profile-photo.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../dialog_components/delete-dialog/delete-dialog.component';
import { HelperDialogComponent } from '../dialog_components/helper-dialog/helper-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-helper-data',

  templateUrl: './helper-data.component.html',
  styleUrls: ['./helper-data.component.scss']
})
export class HelperDataComponent {
  @Input() helper: any;

  constructor(
    private snackBar: MatSnackBar,
    public service4all: HelperServiceService,
    private router: Router,
    private dialog: MatDialog
  ) { }


  ondeletehelper(id: number) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: {
        fullName: this.helper.fullName,
        typeOfService: this.helper.typeOfService
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service4all.deletehelper(id);
        this.snackBar.open('Helper deleted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      }
    });
  }

  onEditHelper() {
    this.service4all.setSelectedHelper(this.helper);
    this.router.navigate(['/add-edit-helper', 'edit']);
  }
  openHelperCardDialog(helper: any) {
    this.dialog.open(HelperDialogComponent, {
      data: helper,
      width: '700px',
      height: '600px',
      panelClass: 'custom-helper-dialog'
    });
  }
}