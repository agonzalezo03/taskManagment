import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { MaterialModule } from '../material/material.module';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { NewTaskDialogComponent } from './components/new-task-dialog/new-task-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesModule } from '../categories/categories.module';
import { DifficultyComponent } from './components/difficulty/difficulty.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';


@NgModule({
  declarations: [
    ListTasksComponent,
    TasksComponent,
    TaskCardComponent,
    TaskFormComponent,
    NewTaskDialogComponent,
    DifficultyComponent,
    TaskDetailComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    CategoriesModule,
    FormsModule
  ],
  exports: [
    TasksComponent,
    TaskCardComponent
  ]
})
export class TasksModule { }
