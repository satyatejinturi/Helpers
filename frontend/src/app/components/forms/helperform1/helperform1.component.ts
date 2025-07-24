  import { Component, OnInit, Input, ViewChild } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule, NgForm } from '@angular/forms';
  import { KycdocumentComponent } from '../../dialog_components/kycdocument/kycdocument.component';
  import { MatDialog } from '@angular/material/dialog';
  import { HelperServiceService } from '../../../shared/helper-service.service';
import { CheckboxDropdownComponent } from '../checkbox-dropdown/checkbox-dropdown.component';
  @Component({
    selector: 'app-helperform1',
    standalone: true,
    templateUrl: './helperform1.component.html',
    styleUrl: './helperform1.component.css',
    imports: [CommonModule, FormsModule, KycdocumentComponent,CheckboxDropdownComponent]
  })
  export class Helperform1Component implements OnInit {
    @Input() helperData: any = null;
    @ViewChild('helperForm') helperForm!: NgForm;

    helper = {
      typeOfService: '',
      organizationName: '',
      fullName: '',
      gender: '',
      countryCode: '+91',
      phno: '',
      email: '',
      vehicleType: 'none',
      vehicleNo: '',
      profile: null as File | null,
      
      Kyc: null as File | null,
      kycDocType: ''
    };
    profilePhotoPreview:string=''
    languages = ['English', 'Hindi', 'Telugu', 'Tamil'];
    languageSelection: { [key: string]: boolean } = {};
    selectedLanguages: string[] = [];
    isDropdownOpen = false;
    isEditMode = false;
    kycUrl = ''; 
    existingKycUrl: string | null = null;


    constructor(private dialog: MatDialog, private helperService: HelperServiceService) {}

   ngOnInit() {
      this.languages.forEach(lang => (this.languageSelection[lang] = false));
      this.languageSelection['English'] = true;
      

      if (this.helperData) {
        this.isEditMode = true;
        this.kycUrl = this.helperData.kycURL || '';

        this.helper = {
          typeOfService: this.helperData.typeOfService || '',
          organizationName: this.helperData.organizationName || '',
          fullName: this.helperData.fullName || '',
          gender: this.helperData.gender || '',
          countryCode: this.helperData.countryCode || '+91',
          phno: this.helperData.phno || '',
          email: this.helperData.email || '',
          vehicleType: this.helperData.vehicleType || 'none',
          vehicleNo: this.helperData.vehicleNo || '',
          profile: null,
          
          Kyc: null,
          kycDocType: this.helperData.kycDocType || ''
        };
        this.existingKycUrl = this.helperData.kycDocUrl ?? null;
        if (this.helperData && this.helperData?.languages) {
          if (this.helperData?.languages?.length) {
            const raw = this.helperData.languages[0]; // single string
            this.selectedLanguages = raw.split(',').map((lang:string) => lang.trim());
          }

        }

        if (this.helperData.profilePhoto) {
          this.profilePhotoPreview = this.helperData.profilePhoto;
        }
      }
    }


    onLanguagesChange(selected: string[]) {
      this.selectedLanguages = selected;
    }

    onPhotoUpload(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files?.length) {
        const file = input.files[0];
        this.helper.profile = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.profilePhotoPreview = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }

    onKycUpload() {
      const dialogRef = this.dialog.open(KycdocumentComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.helper.Kyc = result.kyc;
          this.helper.kycDocType = result.kycDocType;
          this.existingKycUrl = null; 
          console.log('KYC data received:', result);
        }
      });
    }

    onSaveForm1(): boolean {
      if (!this.helperForm.valid) return false;
      if (!this.existingKycUrl && (!this.helper.Kyc || !this.helper.kycDocType)) {
        alert('Please upload KYC document and select type.');
        return false;
      }
    const formData = new FormData();

      formData.append('typeOfService', this.helper.typeOfService);
      formData.append('organizationName', this.helper.organizationName);
      formData.append('fullName', this.helper.fullName);
      formData.append('gender', this.helper.gender);
      formData.append('countryCode', this.helper.countryCode);
      formData.append('phno', this.helper.phno);
      formData.append('email', this.helper.email);
      formData.append('vehicleType', this.helper.vehicleType);
      formData.append('vehicleNo', this.helper.vehicleNo);
      formData.append('kycDocType', this.helper.kycDocType);

      formData.append('languages', this.selectedLanguages.join(','));

      if (this.helper.profile instanceof File) {
        formData.append('profile', this.helper.profile, this.helper.profile.name);
      }

      if (this.helper.Kyc instanceof File) {
        formData.append('Kyc', this.helper.Kyc, this.helper.Kyc.name);
      }
      console.log(this.helper);
      console.log(formData);
      formData.forEach((v, k) => console.log(k, v));

      const plainData = {
        ...this.helper,
        languages: this.selectedLanguages
      };

      if (this.isEditMode) {
        const empId = this.helperService.getSelectedHelper()?.employeeid;
        this.helperService.updateHelper(empId, formData);
      } 
      this.helperService.setForm1Data(plainData);
      

      return true;
    }


  }