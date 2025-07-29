import { Component, signal, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfilePhotoComponent } from '../../components/helper-components/profile-photo/profile-photo.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StepSliderComponent } from '../../components/aside-components/step-slider/step-slider.component';
import { Helperform1Component } from '../../components/forms/helperform1/helperform1.component';
import { Helperform2Component } from '../../components/forms/helperform2/helperform2.component';
import { Helperform3Component } from '../../components/forms/helperform3/helperform3.component';
import { RouterModule } from '@angular/router';
import { HelperServiceService } from '../../shared/helper-service.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-add-edit',

  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  presentstep = signal(1);
  isEditMode = false;
  selectedHelper: any = null;
  loading = false;
  @ViewChild(Helperform1Component) form1Comp!: Helperform1Component;
  @ViewChild(Helperform2Component) form2Comp!: Helperform2Component;
  @ViewChild(Helperform3Component) form3Comp!: Helperform3Component;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private helperService: HelperServiceService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      if (params['mode'] === 'edit') {
        this.isEditMode = true;
        this.selectedHelper = this.helperService.getSelectedHelper();
        console.log(this.selectedHelper)
        if (!this.selectedHelper) {
          alert('No helper data found. Redirecting...');
          this.router.navigate(['/']);
        }

      }
    });
    console.log(this.presentstep());
  }

  goback() {
    this.router.navigate(['/']);
  }
  onLoadingChange(value: boolean) {
    this.loading = value;
  }

  goto(step: number) {
    if (this.isEditMode) {
      this.presentstep.set(step);
      return;
    }

    if (this.presentstep() === 1 && step > 1) {
      const formValid = this.form1Comp?.onSaveForm1();
      if (!formValid) return;
    }

    if (this.presentstep() === 2 && step > 2) {
      const formValid = this.form2Comp?.onSaveForm2();
      if (!formValid) return;
    }

    this.presentstep.set(step);
  }


  submitHelper() {
    console.log("submit triggered");
    this.form3Comp?.submitHelper();
  }

  // In AddEditComponent
  saveAndExit() {
    if (this.presentstep() === 1) {
      const success = this.form1Comp?.onSaveForm1();
      if (success) {
        this.router.navigate(['/']);
      }
    } else if (this.presentstep() === 2) {
      const success = this.form2Comp?.onSaveForm2();
      if (success) {
        this.router.navigate(['/']);
      }
    }
  }

}