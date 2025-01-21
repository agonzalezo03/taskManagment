import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksLayoutComponent } from '../shared/components/tasks-layout/tasks-layout.component';
import { SprintsComponent } from './pages/sprints/sprints.component';

const routes: Routes = [
  {
    path: '',
    component: TasksLayoutComponent,
    children:[
      {
        path: 'list',
        component: SprintsComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintsRoutingModule { }
