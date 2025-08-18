
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from './aside-components/sidebar/sidebar.component';
import { StepSliderComponent } from './aside-components/step-slider/step-slider.component';
import { AdditionalcomponentComponent } from './dialog_components/additionalcomponent/additionalcomponent.component';
import { DeleteDialogComponent } from './dialog_components/delete-dialog/delete-dialog.component';
import { HelperDialogComponent } from './dialog_components/helper-dialog/helper-dialog.component';
import { KycdocumentComponent } from './dialog_components/kycdocument/kycdocument.component';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';
import { HelperDataComponent } from './helper-data/helper-data.component';
import { MaterialModule } from '../shared/material.module';
import { DatePipe } from '@angular/common';
import { AdditionalDetailsComponent } from './forms/additional-details/additional-details.component';
import { ReviewDetailsComponent } from './forms/review-details/review-details.component';
import { DocumentDetailsComponent } from './forms/document-details/document-details.component';
import { InputComponent } from './forms/input/input.component';
import { SelectDropdownComponent } from './forms/select-dropdown/select-dropdown.component';
import { CheckboxDropdownComponent } from './forms/checkbox-dropdown/checkbox-dropdown.component';
@NgModule({

  declarations: [
    SidebarComponent,
    StepSliderComponent,
    AdditionalDetailsComponent,
    ReviewDetailsComponent,
    DocumentDetailsComponent,
    AdditionalcomponentComponent,
    DeleteDialogComponent,
    InputComponent,
    SelectDropdownComponent,
    CheckboxDropdownComponent,
    HelperDialogComponent,
    KycdocumentComponent,
    ProfilePhotoComponent,
    HelperDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MaterialModule,
    DatePipe
  ],
  exports: [
    SidebarComponent,
    StepSliderComponent,
    AdditionalDetailsComponent,
    ReviewDetailsComponent,
    DocumentDetailsComponent,
    AdditionalcomponentComponent,
    DeleteDialogComponent,
    InputComponent,
    SelectDropdownComponent,
    CheckboxDropdownComponent,
    HelperDialogComponent,
    KycdocumentComponent,
    
    ProfilePhotoComponent,
    HelperDataComponent
  ]
})
export class ComponentsModule {}
