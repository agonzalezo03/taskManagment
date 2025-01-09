import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutLoginComponent } from './components/layout-login/layout-login.component';
import { TasksLayoutComponent } from './components/tasks-layout/tasks-layout.component';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { TasksModule } from '../tasks/tasks.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    LayoutLoginComponent,
    TasksLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class SharedModule { }
