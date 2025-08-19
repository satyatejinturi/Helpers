import { Component, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HelperServiceService } from '../../shared/helper-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HelperDialogComponent } from '../../components/dialog_components/helper-dialog/helper-dialog.component';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  presentstep = signal(1);
  isEditMode = false;
  loading = false;
  selectedHelper: any = null;

  documentForm: FormGroup;
  additionalDetailsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private helperService: HelperServiceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.documentForm = this.fb.group({
      fullName: [''],
      typeOfService: [''],
      organizationName: [''],
      phno: [''],
      email: [''],
      languages: [[]],
      vehicleType: [''],
      vehicleNo: [''],
      profile: [null],
      profileurl: [''],
      gender: [''],
      countryCode: ['+91'],
      kycDocName: [''],
      kycDocType: [''],
      Kyc: [null],
      kycdocurl: ['']
    });

    this.additionalDetailsForm = this.fb.group({
      additionalDocName: [''],
      additionalDocType: [''],
      AdditionalDoc: [null],
      additionaldocurl: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['mode'] === 'edit') {
        this.isEditMode = true;

        this.selectedHelper = this.helperService.getSelectedHelper();
        console.log(this.selectedHelper);

        if (!this.selectedHelper) {
          alert('No helper data found. Redirecting...');
          this.router.navigate(['/']);
        } else {
          this.documentForm.patchValue({
            fullName: this.selectedHelper.fullName,
            typeOfService: this.selectedHelper.typeOfService,
            organizationName: this.selectedHelper.organizationName,
            phno: this.selectedHelper.phno,
            email: this.selectedHelper.email,
            languages: this.selectedHelper.languages ,
            vehicleType: this.selectedHelper.vehicleType,
            vehicleNo: this.selectedHelper.vehicleNo,
            profile: this.selectedHelper.profile,
            profileurl: this.selectedHelper.profilePhotourl,
            gender: this.selectedHelper.gender,
            countryCode: this.selectedHelper.countryCode,
            kycDocName: this.selectedHelper.kycDocName,
            kycDocType: this.selectedHelper.kycDocType,
            Kyc: this.selectedHelper.Kyc,
            kycdocurl: this.selectedHelper.kycDocUrl
          });

          this.additionalDetailsForm.patchValue({
            additionalDocName: this.selectedHelper.additionalDocName,
            additionalDocType: this.selectedHelper.additionalDocType,
            AdditionalDoc: this.selectedHelper.AdditionalDoc,
            additionaldocurl: this.selectedHelper.additionalDocUrl
          });
        }

      }
    });
  }

  goback(): void {
    this.router.navigate(['/']);
  }

  onLoadingChange(value: boolean): void {
    this.loading = value;
  }

  goto(step: number): void {
    if (this.isEditMode) {
      this.presentstep.set(step);
      return;
    }
    if (!this.documentForm.valid) {
      this.documentForm.markAllAsTouched();
    }

    if (this.documentForm.invalid) {
      return ;
    }

    if (!this.documentForm.get('languages')?.value.length) {
      return ;
    }

    if ((!this.documentForm.get('Kyc')?.value || !this.documentForm.get('kycDocType')?.value)) {
      alert('Please upload KYC document and select type.');
      return ;
    }
    

    this.presentstep.set(step);
    console.log(`Navigated to step ${step}`);
  }

  submitHelper(): void {
    this.loading=true;
    const formDataValue = {
      ...this.documentForm.value,
      ...this.additionalDetailsForm.value
    };

    const formdata = new FormData();
    Object.keys(formDataValue).forEach(key => {
      const value = formDataValue[key];
      if (Array.isArray(value)) {
        value.forEach((v: any) => {
          formdata.append(`${key}[]`, v); 
        });
      } else if (value instanceof File) {
        formdata.append(key, value, value.name);
      } else {
        formdata.append(key, value);
      }
    });
    console.log('Submitting helper with data:', formDataValue);

    this.helperService.postData(formdata).subscribe({
      next: (res) => {
        this.loading=false
        this.dialog.open(HelperDialogComponent, {
          width: '50%',
          height: '50%',
          data: res
        });
        this.snackBar.open('Helper submitted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/']);

      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to submit helper. Try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        this.loading=false
      }
      
    });
  }

  saveAndExit(): void {
    this.loading=true
    if (this.documentForm.valid && this.additionalDetailsForm.valid) {
      console.log(`Saved step ${this.presentstep()}, exiting...`);
      
      const formDataValue = {
        ...this.documentForm.value,
        ...this.additionalDetailsForm.value
      };

      const formdata = new FormData();
      Object.keys(formDataValue).forEach(key => {
        const value = formDataValue[key];
        if (Array.isArray(value)) {
          value.forEach((v: any) => {
            formdata.append(`${key}[]`, v);
          });
        } else if (value instanceof File) {
          formdata.append(key, value, value.name);
        } else {
          formdata.append(key, value);
        }
      });
      console.log('Submitting helper with data:', formDataValue);
      this.helperService.updateHelper(this.selectedHelper.employeeid,formdata).subscribe({
        next: (res) => {
          
          this.snackBar.open('Helper updated successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            verticalPosition: 'top',
            horizontalPosition: 'right'

          });
          this.loading=false
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Failed to update helper. Try again.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
          this.loading=false
          this.router.navigate(['/']);
        }
      });
    }
  }
}