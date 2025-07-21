import { Component, signal } from '@angular/core';
import { ProfilePhotoComponent } from '../../components/helper-components/profile-photo/profile-photo.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { StepSliderComponent } from '../../components/aside-components/step-slider/step-slider.component';
import { Helperform1Component } from '../../components/forms/helperform1/helperform1.component';
import { Helperform2Component } from '../../components/forms/helperform2/helperform2.component';
import { Helperform3Component } from '../../components/forms/helperform3/helperform3.component';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [ProfilePhotoComponent,FormsModule,CommonModule,Helperform1Component,Helperform2Component,Helperform3Component,StepSliderComponent,RouterModule],
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit{
    presentstep = signal(1);
  mockHelper = {
  name: 'John Doe',
  role: 'Caretaker',
  gender: 'Male',
  languages: ['English', 'Hindi'],
  phone: '9876543210',
  email: 'john@example.com',
  kycDocUrl: 'https://example.com/kyc.pdf',
  serviceType: 'Home Care',
  organization: 'HealthCare Inc.',
  joinedOn: '2023-02-01'
};

  goto(step: number) {
    this.presentstep.set(step);
  }
    ngOnInit(): void {
      console.log(this.presentstep)
    }
}
