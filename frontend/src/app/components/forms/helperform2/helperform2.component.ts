import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HelperServiceService } from '../../../shared/helper-service.service';
import { AdditionalcomponentComponent } from '../../dialog_components/additionalcomponent/additionalcomponent.component';

@Component({
  selector: 'app-helperform2',
  templateUrl: './helperform2.component.html',
  styleUrl: './helperform2.component.css'
})
export class Helperform2Component implements OnInit {
  @ViewChild('helperForm2') helperForm2!: NgForm;
  @Input() isEditMode: boolean = false;
  @Input() employeeId!: number;
  @Input() helperData: any = null;
  additionalDoc: { file: File, docType: string } | null = null;
  isfileupload: boolean = false;

  constructor(
    private dialog: MatDialog,
    private helperService: HelperServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    if (this.helperData && this.helperData.additionalDocUrl && this.helperData.additionalDocType) {

      this.isEditMode = true;
      this.additionalDoc = {
        file: new File([""], this.helperData.additionalDocUrl.split('/').pop(), {
          type: 'application/octet-stream',
        }),
        docType: this.helperData.additionalDocType
      };
      this.isfileupload = true;
    } else {

      const form2Data = this.helperService.getForm2Data();
      if (form2Data?.additionalDoc) {
        this.additionalDoc = form2Data.additionalDoc;
        this.isfileupload = true;
      }
    }
  }


  onAdditionalDocUpload() {
    const dialogRef = this.dialog.open(AdditionalcomponentComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.additionalDoc = {
          file: result.AdditionalFile,
          docType: result.AdditionalDocType
        };
        this.isfileupload = true;
      }
    });
  }

  removeDoc() {
    this.additionalDoc = null;
    this.isfileupload = false;
  }

  onSaveForm2(): boolean {
    if (!this.additionalDoc) {
      return true;
    }
    const formData = new FormData();
    formData.append('additionalDoc', this.additionalDoc.file);
    formData.append('additionalDocType', this.additionalDoc.docType);

    if (this.isEditMode) {
      this.helperService.updateHelper(this.employeeId, formData);
      this.snackBar.open('Helper edited successfully!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    } else {
      this.helperService.setForm2Data({ additionalDoc: this.additionalDoc });
    }

    return true;
  }
}
