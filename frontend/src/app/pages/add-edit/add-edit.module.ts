import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditComponent } from './add-edit.component';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';

const routes: Routes = [
  { path: '', component: AddEditComponent },
  { path: ':mode', component: AddEditComponent }
];
@NgModule({
  declarations: [AddEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MaterialModule,
    RouterModule.forChild(routes) 
  ]
})
export class AddEditModule {}
