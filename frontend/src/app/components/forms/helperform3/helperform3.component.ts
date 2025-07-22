
import { Input } from '@angular/core';
import { ProfilePhotoComponent } from '../../helper-components/profile-photo/profile-photo.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HelperServiceService } from '../../../shared/helper-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-helperform3',
  standalone: true,
  imports: [ProfilePhotoComponent,CommonModule],
  templateUrl: './helperform3.component.html',
  styleUrl: './helperform3.component.css'
})
export class Helperform3Component implements OnInit {
  helper:any;
  constructor(private helperService: HelperServiceService, private http: HttpClient) {}

  ngOnInit() {
    const data1 = this.helperService.getForm1Data();
    const data2 = this.helperService.getForm2Data();
    this.helper={
      ...data1,...data2
    }
    console.log(this.helper)
  }

  submitHelper() {
    const data1 = this.helperService.getForm1Data();
    const data2 = this.helperService.getForm2Data();
    console.log(data1)
    console.log(data2)
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

    this.http.post('http://localhost:3000/api/allHelpers', formData).subscribe(res => {
      console.log('Posted successfully', res);
    });
  }
}