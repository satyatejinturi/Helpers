  import { Component, OnInit, ViewChild } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule, NgForm } from '@angular/forms';
  import { MatDialog } from '@angular/material/dialog';
  import { HelperServiceService } from '../../../shared/helper-service.service';
  import { KycdocumentComponent } from '../../dialog_components/kycdocument/kycdocument.component';
import { AdditionalcomponentComponent } from '../../dialog_components/additionalcomponent/additionalcomponent.component';
import { MatSnackBar } from '@angular/material/snack-bar';
  @Component({
    selector: 'app-helperform2',
    
    templateUrl: './helperform2.component.html',
    styleUrl: './helperform2.component.css',
    
  })
  export class Helperform2Component implements OnInit {
    @ViewChild('helperForm2') helperForm2!: NgForm;

    additionalDoc: { file: File, docType: string } | null = null;

    isfileupload:boolean=false;
    constructor(private dialog: MatDialog, private helperService: HelperServiceService, private snackBar: MatSnackBar) {}

    ngOnInit() {
      const form2Data = this.helperService.getForm2Data();
      if (form2Data && form2Data.additionalDoc) {
        this.additionalDoc = form2Data.additionalDoc;
        this.isfileupload = true;
      }
    }


    onAdditionalDocUpload() {
      const dialogRef = this.dialog.open(AdditionalcomponentComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log('Popup result:', result);
        if (result) {
          this.additionalDoc = {
            file: result.AdditionalFile,
            docType: result.AdditionalDocType
          };
          this.isfileupload = true;
          console.log('Additional document set:', result);
        }
      });
    }


    removeDoc() {
      this.additionalDoc = null;
      this.isfileupload = false;
    }


    onSaveForm2(): boolean {
      const formData = new FormData();

      if (this.additionalDoc) {
        formData.append('AdditionalDoc', this.additionalDoc.file);
        formData.append('AdditionalDocType', this.additionalDoc.docType);
      }

      this.isfileupload = !!this.additionalDoc;
      this.helperService.setForm2Data({ additionalDoc: this.additionalDoc });
      this.snackBar.open('Additional document updated successfully!', 'Close', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 3000,
              panelClass: ['bg-green-500', 'text-white']
            });

      return true;
    }

  }