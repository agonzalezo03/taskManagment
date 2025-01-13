import { Component } from '@angular/core';
import { RoleOptions } from '../../interfaces/role-options.enum';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.css'
})
export class RoleFormComponent {

  public rolSections = [
    { name: 'taks'},
    { name: 'category'},
    { name: 'users'},
  ]

  public roles = Object.values(RoleOptions);
}
