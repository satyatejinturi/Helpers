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
    profilePhotoPreview: '',
    Kyc: null as File | null,
    kycDocType: ''
  };

  languages = ['English', 'Hindi', 'Telugu', 'Tamil'];
  languageSelection: { [key: string]: boolean } = {};
  selectedLanguages: string[] = [];
  isDropdownOpen = false;

  constructor(private dialog: MatDialog, private helperService: HelperServiceService) {}

  ngOnInit() {
    this.languages.forEach(lang => (this.languageSelection[lang] = false));
    this.languageSelection['English'] = true;
    this.updateSelectedLanguages();

    if (this.helperData) {
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
        profilePhotoPreview: this.helperData.profilePhotoPreview || '',
        Kyc: null,
        kycDocType: this.helperData.kycDocType || ''
      };
      if (this.helperData.languages) {
        this.languages.forEach(lang => {
          this.languageSelection[lang] = this.helperData.languages.includes(lang);
        });
        this.updateSelectedLanguages();
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
        this.helper.profilePhotoPreview = reader.result as string;
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
        console.log('KYC data received:', result);
      }
    });
  }

  onSaveForm1(): boolean {
    if (this.helperForm.invalid || !this.helper.Kyc) {
      this.helperForm.control.markAllAsTouched();
      return false;
    }
    const formData = {
      ...this.helper,
      languages: this.selectedLanguages
    };
    this.helperService.setForm1Data(formData);
    return true;
  }
}