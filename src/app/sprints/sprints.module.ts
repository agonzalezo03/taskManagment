import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintsRoutingModule } from './sprints-routing.module';
import { SprintsComponent } from './pages/sprints/sprints.component';
import { SprintFormComponent } from './components/sprint-form/sprint-form.component';
import { MaterialModule } from '../material/material.module';
import { NewSprintDialogComponent } from './components/new-sprint-dialog/new-sprint-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksModule } from '../tasks/tasks.module';
import { SprintPanelComponent } from './components/sprint-panel/sprint-panel.component';
import { SortByDatePipe } from './pipes/sort-by-date.pipe';


@NgModule({
  declarations: [
    SprintsComponent,
    SprintFormComponent,
    NewSprintDialogComponent,
    SprintPanelComponent,
    SortByDatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    SprintsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    TasksModule,

  ]
})
export class SprintsModule { }
