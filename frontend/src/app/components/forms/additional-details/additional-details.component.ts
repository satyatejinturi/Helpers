import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelperServiceService } from '../../../shared/helper-service.service';
import { AdditionalcomponentComponent } from '../../dialog_components/additionalcomponent/additionalcomponent.component';

@Component({
  selector: 'app-additional-details',
  templateUrl: './additional-details.component.html',
  styleUrls: ['./additional-details.component.css']
})
export class AdditionalDetailsComponent implements OnInit {
  @Input() detailsform!: FormGroup;
  @Input() helperData: any = null;
  @Input() employeeId!: number;

  isEditMode: boolean = false;
  isfileupload: boolean = false;

  constructor(
    private dialog: MatDialog,
    private helperService: HelperServiceService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.helperData && this.helperData.additionalDocUrl && this.helperData.additionalDocType) {
      this.isEditMode = true;
      this.detailsform.patchValue({
        additionalDoc: new File([""], this.helperData.additionalDocUrl.split('/').pop(), {
          type: 'application/octet-stream'
        }),
        additionalDocType: this.helperData.additionalDocType
      });
      this.isfileupload = true;
    } else {
      const form2Data = this.helperService.getForm2Data();
      if (form2Data?.additionalDoc) {
        this.detailsform.patchValue({
          additionalDoc: form2Data.additionalDoc.file,
          additionalDocType: form2Data.additionalDoc.docType
        });
        
        this.isfileupload = true;
      }
    }

    // Add validators
    this.detailsform.get('additionalDoc')?.setValidators([Validators.required]);
    this.detailsform.get('additionalDocType')?.setValidators([Validators.required]);
  }

  onAdditionalDocUpload() {
    const dialogRef = this.dialog.open(AdditionalcomponentComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.detailsform.patchValue({
          additionaldoc: result.AdditionalFile,
          additionaldoctype: result.AdditionalDocType,
          additionaldocname : result.AdditionalFile.name,
        });
        console.log(this.detailsform)
        this.isfileupload = true;
      }
    });
  }

  removeDoc() {
    this.detailsform.patchValue({
      additionalDoc: null,
      additionalDocType: ''
    });
    this.isfileupload = false;
  }

  onSaveForm2(): boolean {
    this.detailsform.markAllAsTouched();

    if (this.detailsform.invalid && this.detailsform.get('additionalDoc')?.value) {
      return false;
    }

    if (this.detailsform.get('additionalDoc')?.value) {
      const formData = new FormData();
      formData.append('additionalDoc', this.detailsform.get('additionalDoc')?.value);
      formData.append('additionalDocType', this.detailsform.get('additionalDocType')?.value);

      if (this.isEditMode) {
        this.helperService.updateHelper(this.employeeId, formData);
        this.snackBar.open('Helper edited successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      } else {
        this.helperService.setForm2Data({
          additionalDoc: {
            file: this.detailsform.get('additionalDoc')?.value,
            docType: this.detailsform.get('additionalDocType')?.value
          }
        });
      }
    }

    return true;
  }
}