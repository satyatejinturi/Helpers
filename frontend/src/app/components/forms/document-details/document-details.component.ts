import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { KycdocumentComponent } from '../../dialog_components/kycdocument/kycdocument.component';
import { MatDialog } from '@angular/material/dialog';
import { HelperServiceService } from '../../../shared/helper-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {
  @Input() detailsform!: FormGroup;
  @Input() helperData: any = null;

  profilePhotoPreview: string = '';
  isEditMode = false;
  kycUrl = '';
  existingKycUrl: string | null = null;
  showlabel: boolean = false;

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
    private helperService: HelperServiceService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.detailsform.get('countryCode')?.setValue('+91');
    this.detailsform.get('vehicleType')?.setValue('none');
    console.log(this.helperData);
    this.profilePhotoPreview=this.detailsform.get('profileurl')?.value;
    console.log(this.profilePhotoPreview);
    console.log(this.detailsform);
    
    if (this.helperData) {
      this.isEditMode = true;
      this.kycUrl = this.helperData.kycURL || '';
      this.existingKycUrl = this.helperData.kycDocUrl ?? null;
      this.detailsform.patchValue({
        typeOfService: this.helperData.typeOfService || '',
        organizationName: this.helperData.organizationName || '',
        fullName: this.helperData.fullName || '',
        gender: this.helperData.gender || '',
        countryCode: '+91',
        phno: this.helperData.phno || '',
        email: this.helperData.email || '',
        vehicleType: this.helperData.vehicleType || 'none',
        vehicleNo: this.helperData.vehicleNo || '',
        kycDocType: this.helperData.kycDocType || '',
        profileurl: this.helperData.profilePhotourl || '',
        languages: this.helperData.languages?.length
          ? this.helperData.languages[0].split(',').map((lang: string) => lang.trim())
          : []
      });
      if (this.existingKycUrl && this.helperData.kycDocType) {
        this.showlabel = true;
      }
      this.profilePhotoPreview = this.helperData.profilePhoto || '';
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
        this.existingKycUrl = null;
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

    if (!this.existingKycUrl && (!this.detailsform.get('Kyc')?.value || !this.detailsform.get('kycDocType')?.value)) {
      alert('Please upload KYC document and select type.');
      return false;
    }

    const formData = new FormData();
    formData.append('typeOfService', this.detailsform.get('typeOfService')?.value);
    formData.append('organizationName', this.detailsform.get('organizationName')?.value);
    formData.append('fullName', this.detailsform.get('fullName')?.value);
    formData.append('gender', this.detailsform.get('gender')?.value);
    formData.append('phno', this.detailsform.get('phno')?.value);
    formData.append('email', this.detailsform.get('email')?.value || '');
    formData.append('vehicleType', this.detailsform.get('vehicleType')?.value);
    formData.append('vehicleNo', this.detailsform.get('vehicleNo')?.value || '');
    formData.append('kycDocType', this.detailsform.get('kycDocType')?.value || '');
    formData.append('languages', this.detailsform.get('languages')?.value.join(','));

    const profileFile = this.detailsform.get('profile')?.value;
    if (profileFile instanceof File) {
      formData.append('profile', profileFile, profileFile.name);
    }

    const kycFile = this.detailsform.get('kycdoc')?.value;
    if (kycFile instanceof File) {
      formData.append('Kyc', kycFile, kycFile.name);
    }

    const plainData = {
      typeOfService: this.detailsform.get('typeOfService')?.value,
      organizationName: this.detailsform.get('organizationName')?.value,
      fullName: this.detailsform.get('fullname')?.value,
      gender: this.detailsform.get('gender')?.value,
      phno: this.detailsform.get('phno')?.value,
      email: this.detailsform.get('email')?.value,
      vehicleType: this.detailsform.get('vehicleType')?.value,
      vehicleNo: this.detailsform.get('vehicleNo')?.value,
      kycDocType: this.detailsform.get('kycDocType')?.value,
      languages: this.detailsform.get('languages')?.value,
      profilePhotoPreview: this.profilePhotoPreview
    };

    if (this.isEditMode) {
      const empId = this.helperService.getSelectedHelper()?.employeeid;
      this.helperService.updateHelper(empId, formData);
      this.snackBar.open('Helper edited successfully!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    }

    this.helperService.setForm1Data(plainData);
    return true;
  }

  removeKyc() {
    this.detailsform.patchValue({
      Kyc: null,
      kycDocType: '',
      kycdocurl: ''
    });
    this.kycUrl = '';
    this.existingKycUrl = null;
    this.showlabel = false;
  }

  openKycLink() {
    if (this.existingKycUrl) {
      window.open(this.existingKycUrl, '_blank');
    }
  }
}