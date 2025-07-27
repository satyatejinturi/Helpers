import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal.component';
import { ComponentsModule } from '../../components/components.module';
import { MaterialModule } from '../../shared/material.module';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: PortalComponent }
];

@NgModule({
  declarations: [PortalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // ✅ Fix here
    ComponentsModule,
    MaterialModule,
    SharedModule
  ]
})
export class PortalModule {}
