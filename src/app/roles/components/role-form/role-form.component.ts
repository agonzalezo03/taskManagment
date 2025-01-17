import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RolesService } from '../../services/roles.service';
import { Rol } from '../../interfaces/role.interface';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent {

  readonly dialogRef = inject(MatDialogRef<RoleFormComponent>);

  roleForm!: FormGroup;

  resources = [
    { name: 'Task', permissions: ['Ver', 'Modificar/Crear', 'Ocultar'] },
    { name: 'Users', permissions: ['Ver', 'Modificar/Crear', 'Ocultar'] },
    { name: 'Roles', permissions: ['Ver', 'Modificar/Crear', 'Ocultar'] },
    { name: 'Category', permissions: ['Ver', 'Modificar/Crear', 'Ocultar'] }
  ];

  constructor(private fb: FormBuilder, private roleService: RolesService) {}

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      permissions: this.fb.array([
      ])
    });

    this.addPermissions();
  }

  get permissions(): FormArray {
    return this.roleForm.get('permissions') as FormArray;
  }

  addPermissions(): void {
    this.resources.forEach(resource => {
      const resourceFormGroup = this.fb.group({
        resourceName: [resource.name],
        permission: this.fb.control(1)
      });
      this.permissions.push(resourceFormGroup);
    });
  }

  addRol() {
    console.log(this.roleForm.value);
    let rol : Rol = this.roleForm.value
    console.log(rol)
    this.roleService.addRol(rol).subscribe( res => {
      console.log(res)
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
