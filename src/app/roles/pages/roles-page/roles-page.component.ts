import { Component, inject, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles.service';
import { Rol } from '../../interfaces/role.interface';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-roles-page',
  templateUrl: './roles-page.component.html',
  styleUrls: ['./roles-page.component.css']
})
export class RolesPageComponent implements OnInit {

  private rolesService = inject(RolesService);
  private fb = inject(FormBuilder);

  public rolesFormGroup: FormGroup = this.fb.group({
    roles: this.fb.array([])
  });

  public get rolesFormArray(): FormArray<FormGroup> {
    return this.rolesFormGroup.get('roles') as FormArray<FormGroup>;
  }

  public allRoles: Rol[] = [];
  public permissions = ['Ver', 'Editar', 'Ocultar'];

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.rolesService.getRoles().subscribe(res => {
      this.allRoles = res;
      this.initializeForms();
    });
  }

  initializeForms(): void {
    this.rolesFormArray.clear();
    this.allRoles.forEach(rol => {
      this.rolesFormArray.push(this.createRoleForm(rol));
    });
  }

  createRoleForm(rol: Rol): FormGroup {
    return this.fb.group({
      name: [rol.name, Validators.required],
      Task: [this.getPermissionValue(rol.permissions, 'Task')],
      Users: [this.getPermissionValue(rol.permissions, 'Users')],
      Roles: [this.getPermissionValue(rol.permissions, 'Roles')],
      Category: [this.getPermissionValue(rol.permissions, 'Category')]
    });
  }

  getPermissionValue(permissions: { resourceName: string; permission: number }[], resource: string): number {
    const perm = permissions.find(p => p.resourceName === resource);
    return perm ? perm.permission : 1;
  }

  saveRole(index: number, rolId: string): void {
    const roleForm = this.rolesFormArray.at(index);
    const rol: Rol = {
      id: rolId,
      name: roleForm.value.name,
      permissions: [
        {resourceName: 'Task', permission: roleForm.value.Task},
        {resourceName: 'Roles', permission: roleForm.value.Roles},
        {resourceName: 'Users', permission: roleForm.value.Users},
        {resourceName: 'Category', permission: roleForm.value.Category}
      ]
    }
    if (roleForm.valid) {
      console.log('Role to save:', rol);
      this.rolesService.updateRol(rol).subscribe(res => {
         console.log(res);
       });
    }
  }

  deleteRole(rolId: string){
    this.rolesService.deleteRol(rolId).subscribe(res => {
      console.log(res)
      this.loadRoles()
    })
  }
}
