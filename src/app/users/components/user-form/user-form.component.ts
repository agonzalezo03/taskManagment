import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Rol } from '../../../roles/interfaces/role.interface';
import { RolesService } from '../../../roles/services/roles.service';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<UserFormComponent>);
  private fb = inject(FormBuilder);
  private roleService = inject(RolesService);
  private userService = inject(UsersService)

  public allRoles: Rol[] = [];
  public userForm: FormGroup;

  constructor() {
    this.userForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(3)]],
        repassword: ['', [Validators.required]],
        rol: [ , Validators.required]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(res => {
      this.allRoles = res;
    });
  }

  addUser() {
    if (this.userForm.valid) {

      const {repassword, ...user} = this.userForm.value;
      this.userService.newUser(user).subscribe(res => {
        console.log(res)
      })

    } else {
      console.log("Formulario no válido");
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password');
    const repassword = form.get('repassword');

    if (password && repassword && password.value !== repassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }
}
