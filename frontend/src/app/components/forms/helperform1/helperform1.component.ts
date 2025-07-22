import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KycdocumentComponent } from '../../dialog_components/kycdocument/kycdocument.component';
import { RouterOutlet } from '@angular/router';
import {MatDialog} from '@angular/material/dialog'
import { HelperServiceService } from '../../../shared/helper-service.service';

@Component({
  selector: 'app-helperform1',
  standalone: true,
  templateUrl: './helperform1.component.html',
  styleUrl: './helperform1.component.css',
  imports: [CommonModule, FormsModule,KycdocumentComponent]
})
export class Helperform1Component implements OnInit {
  constructor(private dialog: MatDialog, private helperService: HelperServiceService) {}
  onSaveForm1() {
    const formData = {
      ...this.helper,
      languages: this.selectedLanguages
    };
    this.helperService.setForm1Data(formData);
  }
  onClick() {
  const dialogRef = this.dialog.open(KycdocumentComponent);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.helper.Kyc = result.kyc;
      this.helper.kycDocType = result.kycDocType;

      console.log('KYC data received:', result);
    }
  });
}

  helper = {
    typeOfService: '',
    organizationName: '',
    fullName: '',
    gender: '',
    countryCode:'+91',
    phno: '',
    email: '',
    vehicleType: 'none',
    vehicleNo: '',
    Kyc: null as File | null,
    kycDocType: ''
  };

  languages = ['English', 'Hindi', 'Telugu', 'Tamil'];
  languageSelection: { [key: string]: boolean } = {};
  selectedLanguages: string[] = [];
  isDropdownOpen = false;

  ngOnInit() {
    this.languages.forEach(lang => this.languageSelection[lang] = false);
    this.languageSelection['English'] = true;
    this.updateSelectedLanguages();
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
      console.log('Photo uploaded:', input.files[0]);
    }
  }

  onKycUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      console.log('KYC uploaded:', input.files[0]);
    }
  }
}
