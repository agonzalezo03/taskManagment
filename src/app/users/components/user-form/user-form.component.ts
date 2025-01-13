import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Rol } from '../../../roles/interfaces/role.interface';
import { RolesService } from '../../../roles/services/roles.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  readonly dialogRef          = inject(MatDialogRef<UserFormComponent>);
  private fb                  = inject(FormBuilder);
  private roleService         = inject(RolesService);

  public allRoles :Rol[] = []


  public userForm: FormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
      rol: []
    })


    ngOnInit(): void {
      this.loadRoles()
    }

    loadRoles(){
      this.roleService.getRoles().subscribe( res => {
        this.allRoles = res
      })
    }

    addUser(){
      console.log(this.userForm.value)
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
}
