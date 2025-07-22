import { Component, signal, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilePhotoComponent } from '../../components/helper-components/profile-photo/profile-photo.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { StepSliderComponent } from '../../components/aside-components/step-slider/step-slider.component';
import { Helperform1Component } from '../../components/forms/helperform1/helperform1.component';
import { Helperform2Component } from '../../components/forms/helperform2/helperform2.component';
import { Helperform3Component } from '../../components/forms/helperform3/helperform3.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [
    ProfilePhotoComponent,
    FormsModule,
    CommonModule,
    Helperform1Component,
    Helperform2Component,
    Helperform3Component,
    StepSliderComponent,
    RouterModule
  ],
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  presentstep = signal(1);

  @ViewChild(Helperform1Component) form1Comp!: Helperform1Component;
  @ViewChild(Helperform2Component) form2Comp!: Helperform2Component;
  @ViewChild(Helperform3Component) form3Comp!: Helperform3Component;

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.presentstep());
  }

  goback() {
    this.router.navigate(['/']);
  }

  goto(step: number) {
    // Call save before navigating
    if (this.presentstep() === 1 && step > 1) {
      this.form1Comp?.onSaveForm1();
      console.log(this.form1Comp)
    }
    if (this.presentstep() === 2 && step > 2) {
      this.form2Comp?.onSaveForm2();
    }
    this.presentstep.set(step);
  }

  submitHelper() {
    console.log("submit triggered")
    this.form3Comp?.submitHelper();
  }
}
