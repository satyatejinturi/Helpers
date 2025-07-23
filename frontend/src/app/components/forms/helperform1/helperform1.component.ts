  import { Component, OnInit, Input, ViewChild } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule, NgForm } from '@angular/forms';
  import { KycdocumentComponent } from '../../dialog_components/kycdocument/kycdocument.component';
  import { MatDialog } from '@angular/material/dialog';
  import { HelperServiceService } from '../../../shared/helper-service.service';

  @Component({
    selector: 'app-helperform1',
    standalone: true,
    templateUrl: './helperform1.component.html',
    styleUrl: './helperform1.component.css',
    imports: [CommonModule, FormsModule, KycdocumentComponent]
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
  this.updateSelectedLanguages();

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
    if (this.helperData.languages && Array.isArray(this.helperData.languages)) {
      this.selectedLanguages = [...this.helperData.languages];
      for (const lang of this.languages) {
        this.languageSelection[lang] = this.selectedLanguages.includes(lang);
      }
    }

    if (this.helperData.profilePhoto) {
      this.profilePhotoPreview = this.helperData.profilePhoto;
    }
  }
}


    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    }

    onLanguageChange() {
      const selected = Object.keys(this.languageSelection).filter(lang => this.languageSelection[lang]);
      if (selected.length > 3) {
        alert('You can select a maximum of 3 languages.');
        const lastSelected = selected[selected.length - 1];
        this.languageSelection[lastSelected] = false;
      }
      if (selected.length === 0) {
        this.languageSelection['English'] = true;
      }
      this.updateSelectedLanguages();
    }

    removeLanguage(lang: string) {
      this.languageSelection[lang] = false;
      this.updateSelectedLanguages();
    }

    updateSelectedLanguages() {
      this.selectedLanguages = Object.keys(this.languageSelection).filter(lang => this.languageSelection[lang]);
      if (this.selectedLanguages.length === 0) {
        this.languageSelection['English'] = true;
        this.selectedLanguages = ['English'];
      }
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

      const formData = {
        typeOfService: this.helper.typeOfService,
        organizationName: this.helper.organizationName,
        fullName: this.helper.fullName,
        gender: this.helper.gender,
        countryCode: this.helper.countryCode,
        phno: this.helper.phno,
        email: this.helper.email,
        vehicleType: this.helper.vehicleType,
        vehicleNo: this.helper.vehicleNo,
        profile: this.helper.profile,
        Kyc: this.helper.Kyc,
        kycDocType: this.helper.kycDocType,
        kycURL: this.kycUrl || '',
        languages: this.selectedLanguages,
      };

      console.log(formData);
      if (this.isEditMode) {
        const empId = this.helperService.getSelectedHelper()?.employeeid;
        this.helperService.updateHelper(empId, formData);
      } else {
        this.helperService.setForm1Data(formData);
      }

      return true;
    }


  }