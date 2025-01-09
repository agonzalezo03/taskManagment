import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    TasksModule,
    UsersModule,
    HttpClientModule

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
