import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksLayoutComponent } from '../shared/components/tasks-layout/tasks-layout.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TasksLayoutComponent,
    children: [
      {
        path:'list', component: TasksComponent
      },
      {
        path:'detail/:id', component: TaskDetailComponent
      },
      {
        path: '**', redirectTo: 'list'
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
