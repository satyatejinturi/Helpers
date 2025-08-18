import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HelperServiceService } from '../../../shared/helper-service.service';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.css']
})
export class ReviewDetailsComponent implements OnInit {
  @Input() detailsform!: FormGroup;
  @Input() helperData: any = null;

  helper: any = {};

  constructor(private helperService: HelperServiceService) {}

  ngOnInit() {
    // Prioritize FormGroup values
    this.helper = {
      fullName: this.detailsform.get('fullName')?.value || '',
      typeOfService: this.detailsform.get('typeOfService')?.value || '',
      gender: this.detailsform.get('gender')?.value || '',
      languages: this.detailsform.get('languages')?.value?.join(', ') || '',
      phno: this.detailsform.get('phno')?.value || '',
      email: this.detailsform.get('email')?.value || '-',
      kycDocUrl: this.detailsform.get('kycDocUrl')?.value || '',
      organizationName: this.detailsform.get('organizationName')?.value || '',

      createdAt: '-' // Placeholder, as not in FormGroup
    };

    if (!this.helperData && !this.detailsform.dirty) {
      const data1 = this.helperService.getForm1Data();
      const data2 = this.helperService.getForm2Data();
      const plainData1: any = {};

      if (data1) {
        for (const [key, value] of Object.entries(data1)) {
          if (key === 'languages' || key === 'languages[]') {
            plainData1.languages = Array.isArray(value) ? value.join(', ') : value;
          } else {
            plainData1[key] = value;
          }
        }
      }

      this.helper = {
        ...this.helper,
        ...plainData1,
        ...(data2 || {})
      };
    }
  }
}