import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelperServiceService } from '../../shared/helper-service.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ProfilePhotoComponent } from '../helper-components/profile-photo/profile-photo.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../dialog_components/delete-dialog/delete-dialog.component'; 

@Component({
  selector: 'app-helper-data',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProfilePhotoComponent,
    MatDialogModule,
    DeleteDialogComponent
  ],
  templateUrl: './helper-data.component.html',
  styleUrls: ['./helper-data.component.css']
})
export class HelperDataComponent {
  @Input() helper: any;

  constructor(
  public service4all: HelperServiceService,
  private router: Router,
  private dialog: MatDialog
) {}


  ondeletehelper(id: number) {
    
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: {
        fullName: this.helper.fullName,
        typeOfService:this.helper.typeOfService
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service4all.deletehelper(id);
      }
    });
  }

  onEditHelper() {
    this.service4all.setSelectedHelper(this.helper);
    this.router.navigate(['/add-edit-helper', 'edit']);
  }
}