import { Input } from '@angular/core';
import { ProfilePhotoComponent } from '../../helper-components/profile-photo/profile-photo.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HelperServiceService } from '../../../shared/helper-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HelperCardComponent } from '../../helper-components/helper-card/helper-card.component';

@Component({
  selector: 'app-helperform3',
  standalone: true,
  imports: [ProfilePhotoComponent, CommonModule, HelperCardComponent],
  templateUrl: './helperform3.component.html',
  styleUrl: './helperform3.component.css'
})
export class Helperform3Component implements OnInit {
  @Input() isEditMode: boolean = false;
  @Input() employeeId: number | null = null;
  helper: any;

  constructor(
    private helperService: HelperServiceService,
    private http: HttpClient,
    private router: Router
  ) {}

  showcard: boolean = false;

  get showpopup(): boolean {
    return this.helperService.showsucess();
  }

  ngOnInit() {
    const data1 = this.helperService.getForm1Data();
    const data2 = this.helperService.getForm2Data();
    this.helper = {
      ...data1,
      ...data2
    };
    console.log(this.helper);
  }

  submitHelper() {
    const data1 = this.helperService.getForm1Data();
    const data2 = this.helperService.getForm2Data();
    const formData = new FormData();
    for (const key in data1) {
      formData.append(key, data1[key]);
    }
    data1.languages.forEach((lang: string) => {
      formData.append('languages[]', lang);
    });

    if (data2?.files) {
      data2.files.forEach((file: File) => {
        formData.append('additionalDocs', file);
      });
    }

    if (this.isEditMode && this.employeeId) {
      this.helperService.updateHelper(this.employeeId, formData);
    } else {
      this.helperService.postData(formData);
    }

    setTimeout(() => {
      this.helper = this.helperService.getlasthelper;
      this.showcard = true;
    }, 2500);
  }

  closepopup() {
    this.showcard = false;
    this.router.navigate(['/']);
  }
}