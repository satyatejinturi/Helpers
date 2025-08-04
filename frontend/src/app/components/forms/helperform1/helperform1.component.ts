import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { KycdocumentComponent } from '../../dialog_components/kycdocument/kycdocument.component';
import { MatDialog } from '@angular/material/dialog';
import { HelperServiceService } from '../../../shared/helper-service.service';
import { ElementRef, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-helperform1',
  templateUrl: './helperform1.component.html',
  styleUrl: './helperform1.component.css',
})
export class Helperform1Component implements OnInit {
  @Input() helperData: any = null;
  @ViewChild('helperForm') helperForm!: NgForm;
  @ViewChild('languageDropdownWrapper') languageDropdownWrapper!: ElementRef;
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
  profilePhotoPreview: string = ''
  languages = ['English', 'Hindi', 'Telugu', 'Tamil'];
  languageSelection: { [key: string]: boolean } = {};
  selectedLanguages: string[] = [];
  isDropdownOpen = false;
  isEditMode = false;
  kycUrl = '';
  existingKycUrl: string | null = null;
  organizationOptions: string[] = ['ASBL', 'Spring Helpers'];
  constructor(private dialog: MatDialog, private helperService: HelperServiceService,
    private snackBar: MatSnackBar
  ) { }
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
        profilePhotoPreview: this.helperData.profilePhotoUrl,
        Kyc: null,
        kycDocType: this.helperData.kycDocType || ''
      };
      this.existingKycUrl = this.helperData.kycDocUrl ?? null;
      if (this.existingKycUrl && this.helper.kycDocType) {
        this.showlabel = true;
      }
      if (this.helperData && this.helperData?.languages) {
        if (this.helperData?.languages?.length) {
          const raw = this.helperData.languages[0];
          this.selectedLanguages = raw.split(',').map((lang: string) => lang.trim());
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
        this.showlabel = true
        this.helper.kycDocType = result.kycDocType;
        this.existingKycUrl = null;
        console.log('KYC data received:', result);
      }
    });
  }
  onSaveForm1(): boolean {
    this.helperForm.form.markAllAsTouched();
    this.languageTouched = true;
    console.log(this.selectedLanguages)
    if (this.helperForm.invalid) {
      return false;
    }
    if (this.selectedLanguages.length === 0) {
      return false;
    }
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
  showlabel: boolean = false
  removeKyc() {
    this.helper.Kyc = null;
    this.helper.kycDocType = '';
    this.kycUrl = '';
    this.existingKycUrl = null;
    this.showlabel = false
  }
  visibleOptions: string[] = [];
  isLangDropdownOpen = false;
  maxLanguageSelection = 3;
  languageDisplayLimit = 5;
  languageTouched = false;
  openKycLink() {
    if (this.existingKycUrl) {
      window.open(this.existingKycUrl, '_blank');
    }
  }
  toggleLangDropdown() {
    this.isLangDropdownOpen = !this.isLangDropdownOpen;
    if (this.isLangDropdownOpen) this.updateVisibleLanguages();
  }
  toggleLanguage(lang: string) {
    const index = this.selectedLanguages.indexOf(lang);
    if (index >= 0) {
      this.selectedLanguages.splice(index, 1);
    } else if (this.selectedLanguages.length < this.maxLanguageSelection) {
      this.selectedLanguages.push(lang);
    }
    this.updateVisibleLanguages();
  }
  updateVisibleLanguages() {
    const all = [...this.selectedLanguages, ...this.languages];
    const deduped = Array.from(new Set(all));
    const selectedSet = new Set(this.selectedLanguages);
    const unselected = deduped.filter(lang => !selectedSet.has(lang));
    const result = [...this.selectedLanguages, ...unselected.slice(0, Math.max(0, this.languageDisplayLimit - this.selectedLanguages.length))];
    this.visibleOptions = result;
  }
  isLangChecked(lang: string): boolean {
    return this.selectedLanguages.includes(lang);
  }
  isLangDisabled(lang: string): boolean {
    return !this.isLangChecked(lang) && this.selectedLanguages.length >= this.maxLanguageSelection;
  }
  toggleSelectAllLanguages() {
    const allToSelect = this.visibleOptions.slice(0, this.maxLanguageSelection);
    const alreadySelected = this.selectedLanguages.filter(lang => allToSelect.includes(lang));
    if (alreadySelected.length === allToSelect.length) {
      this.selectedLanguages = this.selectedLanguages.filter(lang => !allToSelect.includes(lang));
    } else {
      const remaining = this.maxLanguageSelection - this.selectedLanguages.length;
      const toAdd = allToSelect.filter(lang => !this.selectedLanguages.includes(lang)).slice(0, remaining);
      this.selectedLanguages = [...this.selectedLanguages, ...toAdd];
    }
    this.updateVisibleLanguages();
  }
  isAllVisibleLanguagesSelected(): boolean {
    return this.visibleOptions.filter(lang => this.selectedLanguages.includes(lang)).length === Math.min(this.visibleOptions.length, this.maxLanguageSelection);
  }
  resetLanguages() {
    this.selectedLanguages = [];
    this.updateVisibleLanguages();
  }
  getLanguagesLabel(): string {
    if (!this.selectedLanguages.length) return 'Languages';
    if (this.selectedLanguages.length === 1) return this.selectedLanguages[0];
    return `${this.selectedLanguages[0]} +${this.selectedLanguages.length - 1} more`;
  }
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    if (
      this.isLangDropdownOpen &&
      this.languageDropdownWrapper &&
      !this.languageDropdownWrapper.nativeElement.contains(event.target)
    ) {
      this.isLangDropdownOpen = false;
      this.languageTouched = true
    }
  }
}