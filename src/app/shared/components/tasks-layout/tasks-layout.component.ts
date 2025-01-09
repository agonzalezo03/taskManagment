import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-layout',
  templateUrl: './tasks-layout.component.html',
  styleUrl: './tasks-layout.component.css'
})
export class TasksLayoutComponent {

  private router = inject(Router)

  public menuItems = [
    {name: 'task', url: '/task'}
  ]

  navigate(item :{name: string, url: string}){
    this.router.navigateByUrl(item.url)
  }
}
