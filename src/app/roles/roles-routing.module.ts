import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksLayoutComponent } from '../shared/components/tasks-layout/tasks-layout.component';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';

const routes: Routes = [
  {
    path: '',
    component: TasksLayoutComponent,
    children: [
      { path: 'list', component: RolesPageComponent},
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
export class RolesRoutingModule { }
