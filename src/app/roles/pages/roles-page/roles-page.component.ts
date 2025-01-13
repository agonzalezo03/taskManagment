import { Component, inject, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles.service';
import { Rol } from '../../interfaces/role.interface';

@Component({
  selector: 'app-roles-page',
  templateUrl: './roles-page.component.html',
  styleUrl: './roles-page.component.css'
})
export class RolesPageComponent implements OnInit {

  private rolesService = inject(RolesService);

  public allRoles :Rol[] = []

  ngOnInit(): void {
    this.loadRoles()
  }

  loadRoles(){
    this.rolesService.getRoles().subscribe( res => {
      this.allRoles = res
    })
  }


}
