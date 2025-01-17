import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { permissionGuard } from './auth/guards/permission.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: 'task',
    canActivate: [permissionGuard],
    data: {
      resource: 'Task',
      permissionLevel: 1
    },
    loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
  },
  {
    path: 'users',
    canActivate: [permissionGuard],
    data: {
      resource: 'Users',
      permissionLevel: 1
    },
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'roles',
    canActivate: [permissionGuard],
    data: {
      resource: 'Roles',
      permissionLevel: 1
    },
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule)
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
