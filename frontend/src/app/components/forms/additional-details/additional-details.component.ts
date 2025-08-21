import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelperServiceService } from '../../../shared/helper-service.service';
import { AdditionalcomponentComponent } from '../../dialog_components/additionalcomponent/additionalcomponent.component';

@Component({
  selector: 'app-additional-details',
  templateUrl: './additional-details.component.html',
  styleUrls: ['./additional-details.component.scss']
})
export class AdditionalDetailsComponent implements OnInit {
  @Input() detailsform!: FormGroup;
  

  isEditMode: boolean = false;
  isfileupload: boolean = false;

  constructor(
    private dialog: MatDialog,
    private helperService: HelperServiceService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    console.log(this.detailsform);
    if(this.detailsform.get('additionaldocurl')?.value) {
      this.isfileupload = true;
    }
  }

  onAdditionalDocUpload() {
    const dialogRef = this.dialog.open(AdditionalcomponentComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.detailsform.patchValue({
          AdditionalDoc: result.AdditionalFile,
          additionalDocType: result.AdditionalDocType,
          additionalDocName: result.AdditionalFile.name,
        });
        console.log(this.detailsform)
        this.isfileupload = true;
      }
    });
  }

  removeDoc() {
    this.detailsform.patchValue({
      AdditionalDoc: null,
      additionalDocType: ''
    });
    this.isfileupload = false;
  }

  onSaveForm2(): boolean {
    this.detailsform.markAllAsTouched();
    return true;
  }
}