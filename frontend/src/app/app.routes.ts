// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { PortalComponent } from './pages/portal/portal.component';
import { AddEditComponent } from './pages/add-edit/add-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: PortalComponent
  },
  {
    path: 'add-edit-helper',
    component: AddEditComponent
  },
  {
    path: 'add-edit-helper/:mode',
    component: AddEditComponent
  }
];
