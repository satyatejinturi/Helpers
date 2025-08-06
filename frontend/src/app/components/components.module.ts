
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from './aside-components/sidebar/sidebar.component';
import { StepSliderComponent } from './aside-components/step-slider/step-slider.component';
import { Helperform1Component } from './forms/helperform1/helperform1.component';
import { Helperform2Component } from './forms/helperform2/helperform2.component';
import { Helperform3Component } from './forms/helperform3/helperform3.component';
import { AdditionalcomponentComponent } from './dialog_components/additionalcomponent/additionalcomponent.component';
import { DeleteDialogComponent } from './dialog_components/delete-dialog/delete-dialog.component';
import { HelperDialogComponent } from './dialog_components/helper-dialog/helper-dialog.component';
import { KycdocumentComponent } from './dialog_components/kycdocument/kycdocument.component';
import { HelperCardComponent } from './helper-components/helper-card/helper-card.component';
import { ProfilePhotoComponent } from './helper-components/profile-photo/profile-photo.component';
import { HelperDataComponent } from './helper-data/helper-data.component';
import { MaterialModule } from '../shared/material.module';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    SidebarComponent,
    StepSliderComponent,
    
    Helperform1Component,
    Helperform2Component,
    Helperform3Component,
    AdditionalcomponentComponent,
    DeleteDialogComponent,
    
    HelperDialogComponent,
    KycdocumentComponent,
    
    HelperCardComponent,
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
    
    Helperform1Component,
    Helperform2Component,
    Helperform3Component,
    AdditionalcomponentComponent,
    DeleteDialogComponent,
    
    HelperDialogComponent,
    KycdocumentComponent,
    
    HelperCardComponent,
    ProfilePhotoComponent,
    HelperDataComponent
  ]
})
export class ComponentsModule {}
