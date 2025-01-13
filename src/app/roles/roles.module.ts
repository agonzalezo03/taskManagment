import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { NewRolDialogComponent } from './components/new-rol-dialog/new-rol-dialog.component';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';
import { MaterialModule } from '../material/material.module';
import { RolOptionComponent } from './components/rol-option/rol-option.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RoleFormComponent,
    NewRolDialogComponent,
    RolesPageComponent,
    RolOptionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
