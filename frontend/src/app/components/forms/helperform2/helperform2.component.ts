  import { Component, OnInit, ViewChild } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule, NgForm } from '@angular/forms';
  import { MatDialog } from '@angular/material/dialog';
  import { HelperServiceService } from '../../../shared/helper-service.service';
  import { KycdocumentComponent } from '../../dialog_components/kycdocument/kycdocument.component';
import { AdditionalcomponentComponent } from '../../dialog_components/additionalcomponent/additionalcomponent.component';
  @Component({
    selector: 'app-helperform2',
    standalone: true,
    templateUrl: './helperform2.component.html',
    styleUrl: './helperform2.component.css',
    imports: [CommonModule, FormsModule]
  })
  export class Helperform2Component implements OnInit {
    @ViewChild('helperForm2') helperForm2!: NgForm;

    additionalDocs: { file: File, docType: string }[] = [];

    constructor(private dialog: MatDialog, private helperService: HelperServiceService) {}

    ngOnInit() {
      const form2Data = this.helperService.getForm2Data();
      if (form2Data && form2Data.additionalDocs) {
        this.additionalDocs = form2Data.additionalDocs;
      }
    }

    onAdditionalDocUpload() {
      const dialogRef = this.dialog.open(AdditionalcomponentComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.additionalDocs.push({ file: result.kyc, docType: result.kycDocType });
          console.log('Additional document added:', result);
        }
      });
    }

    removeDoc(index: number) {
      this.additionalDocs.splice(index, 1);
    }

    onSaveForm2(): boolean {
      if (this.additionalDocs.length === 0) {
        this.helperForm2.control.markAllAsTouched();
        return false;
      }
      this.helperService.setForm2Data({ additionalDocs: this.additionalDocs });
      return true;
    }
  }