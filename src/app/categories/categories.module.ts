import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';
import { CategoriesDialogComponent } from './components/categories-dialog/categories-dialog.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoriesFormComponent,
    CategoriesDialogComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    CategoriesDialogComponent
  ]
})
export class CategoriesModule { }
