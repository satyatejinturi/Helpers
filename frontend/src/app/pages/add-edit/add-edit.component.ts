// import { Component, signal, ViewChild, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { Helperform1Component } from '../../components/forms/helperform1/helperform1.component';
// import { Helperform2Component } from '../../components/forms/helperform2/helperform2.component';
// import { Helperform3Component } from '../../components/forms/helperform3/helperform3.component';
// import { HelperServiceService } from '../../shared/helper-service.service';

// @Component({
//   selector: 'app-add-edit',
//   templateUrl: './add-edit.component.html',
//   styleUrls: ['./add-edit.component.css']
// })
// export class AddEditComponent implements OnInit {
//   presentstep = signal(1);
//   isEditMode = false;
//   selectedHelper: any = null;
//   loading = false;
//   @ViewChild(Helperform1Component) form1Comp!: Helperform1Component;
//   @ViewChild(Helperform2Component) form2Comp!: Helperform2Component;
//   @ViewChild(Helperform3Component) form3Comp!: Helperform3Component;

//   constructor(
//     private router: Router,
//     private route: ActivatedRoute,
//     private helperService: HelperServiceService
//   ) { }

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       if (params['mode'] === 'edit') {
//         this.isEditMode = true;
//         this.selectedHelper = this.helperService.getSelectedHelper();
//         console.log(this.selectedHelper)
//         if (!this.selectedHelper) {
//           alert('No helper data found. Redirecting...');
//           this.router.navigate(['/']);
//         }
//       }
//     });
//     console.log(this.presentstep());
//   }

//   goback() {
//     this.router.navigate(['/']);
//   }
//   onLoadingChange(value: boolean) {
//     this.loading = value;
//   }

//   goto(step: number) {
//     if (this.isEditMode) {
//       this.presentstep.set(step);
//       return;
//     }
//     if (this.presentstep() === 1 && step > 1) {
//       const formValid = this.form1Comp?.onSaveForm1();
//       if (!formValid) return;
//     }
//     if (this.presentstep() === 2 && step > 2) {
//       const formValid = this.form2Comp?.onSaveForm2();
//       if (!formValid) return;
//     }
//     this.presentstep.set(step);
//   }


//   submitHelper() {
//     console.log("submit triggered");
//     this.form3Comp?.submitHelper();
//   }
//   saveAndExit() {
//     if (this.presentstep() === 1) {
//       const success = this.form1Comp?.onSaveForm1();
//       if (success) {
//         this.router.navigate(['/']);
//       }
//     } else if (this.presentstep() === 2) {
//       const success = this.form2Comp?.onSaveForm2();
//       if (success) {
//         this.router.navigate(['/']);
//       }
//     }
//   }

// }
import { Component, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HelperServiceService } from '../../shared/helper-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
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
            languages: this.selectedHelper.languages,
            vehicleType: this.selectedHelper.vehicleType,
            vehicleNo: this.selectedHelper.vehicleNo,
            profile: this.selectedHelper.profile,
            profileurl: this.selectedHelper.profileurl,
            gender: this.selectedHelper.gender,
            countryCode: this.selectedHelper.countryCode,
            kycDocName: this.selectedHelper.kycDocName,
            kycDocType: this.selectedHelper.kycDocType,
            Kyc: this.selectedHelper.Kyc,
            kycdocurl: this.selectedHelper.kycdocurl
          });

          this.additionalDetailsForm.patchValue({
            additionalDocName: this.selectedHelper.additionalDocName,
            additionalDocType: this.selectedHelper.additionalDocType,
            AdditionalDoc: this.selectedHelper.AdditionalDoc,
            additionaldocurl: this.selectedHelper.additionaldocurl
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

    this.presentstep.set(step);
    console.log(`Navigated to step ${step}`);
  }

  submitHelper(): void {
    // merge form values
    const formDataValue = {
      ...this.documentForm.value,
      ...this.additionalDetailsForm.value
    };

    const formdata = new FormData();
    Object.keys(formDataValue).forEach(key => {
      const value = formDataValue[key];
      if (value instanceof File) {
        formdata.append(key, value, value.name);
      } else {
        formdata.append(key, value);
      }
    });
    console.log('Submitting helper with data:', formDataValue);

    this.helperService.postData(formdata).subscribe({
      next: (res) => {
        this.snackBar.open('Helper submitted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to submit helper. Try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  saveAndExit(): void {
    if (this.documentForm.valid && this.additionalDetailsForm.valid) {
      console.log(`Saved step ${this.presentstep()}, exiting...`);
      this.router.navigate(['/']);
    }
  }
}