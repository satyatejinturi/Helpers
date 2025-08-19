import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { KycdocumentComponent } from '../../dialog_components/kycdocument/kycdocument.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {
  @Input() detailsform!: FormGroup;
  showlabel: boolean = false;
  profilePhotoPreview: string = '';
  typeOfServiceOptions = [
    { value: 'Cook', label: 'Cook' },
    { value: 'Maid', label: 'Maid' },
    { value: 'Cleaner', label: 'Cleaner' },
    { value: 'Driver', label: 'Driver' }
  ];
  organizationOptions = [
    { value: 'ASBL', label: 'ASBL' },
    { value: 'Spring Helpers', label: 'Spring Helpers' }
  ];
  vehicleTypeOptions = [
    { value: 'none', label: 'None' },
    { value: 'bike', label: 'Bike' },
    { value: 'car', label: 'Car' },
    { value: 'van', label: 'Van' }
  ];
  countryCodeOptions = [{ value: '+91', label: '+91' }];
  genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];
  languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Telugu', label: 'Telugu' },
    { value: 'Tamil', label: 'Tamil' }
  ];

  constructor(
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.detailsform.get('countryCode')?.setValue('+91');
    this.detailsform.get('vehicleType')?.setValue('none');
    this.profilePhotoPreview=this.detailsform.get('profileurl')?.value;
    console.log(this.profilePhotoPreview);
    console.log(this.detailsform);
    
    if ( this.detailsform.get('kycdocurl')?.value  && this.detailsform.get('kycDocType')?.value) {
      this.showlabel = true;
    }
    
    this.detailsform.get('typeOfService')?.setValidators([Validators.required]);
    this.detailsform.get('organizationName')?.setValidators([Validators.required]);
    this.detailsform.get('fullName')?.setValidators([Validators.required]);
    this.detailsform.get('gender')?.setValidators([Validators.required]);
    this.detailsform.get('countryCode')?.setValidators([Validators.required]);
    this.detailsform.get('phno')?.setValidators([Validators.required, Validators.pattern('[0-9]{10}')]);
    this.detailsform.get('email')?.setValidators([Validators.email]);
    this.detailsform.get('vehicleType')?.setValidators([Validators.required]);
    this.updateVehicleNoValidator();
  }

  updateVehicleNoValidator() {
    const vehicleType = this.detailsform.get('vehicleType')?.value;
    const vehicleNoControl = this.detailsform.get('vehicleNo');
    if (vehicleType !== 'none') {
      vehicleNoControl?.setValidators([Validators.required]);
    } else {
      vehicleNoControl?.clearValidators();
    }
    vehicleNoControl?.updateValueAndValidity();
  }

  onPhotoUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.detailsform.patchValue({ profile: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePhotoPreview = reader.result as string;
        this.detailsform.patchValue({ profileurl: this.profilePhotoPreview });
      };
      reader.readAsDataURL(file);
    }
  }

  onKycUpload() {
    const dialogRef = this.dialog.open(KycdocumentComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.detailsform.patchValue({
          Kyc: result.kyc,
          kycDocType: result.kycDocType,
          kycDocName: result.kyc.name,
        });
        this.showlabel = true;
       
      }
    });
  }

  onSaveForm1(): boolean {
    this.detailsform.markAllAsTouched();
    this.updateVehicleNoValidator();

    if (this.detailsform.invalid) {
      return false;
    }

    if (!this.detailsform.get('languages')?.value.length) {
      return false;
    }

    if ((!this.detailsform.get('Kyc')?.value || !this.detailsform.get('kycDocType')?.value)) {
      alert('Please upload KYC document and select type.');
      return false;
    }
    return true;
  }

  removeKyc() {
    this.detailsform.patchValue({
      Kyc: null,
      kycDocType: '',
      kycdocurl: ''
    });
    this.showlabel = false;
  }

  openKycLink() {
    if (this.detailsform.get('kycdocurl')?.value) {
      window.open(this.detailsform.get('kycdocurl')?.value, '_blank');
    }
  }
}