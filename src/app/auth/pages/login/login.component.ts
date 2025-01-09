import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../users/services/users.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb          = inject(FormBuilder)
  private authService = inject(AuthService)

  public form: FormGroup = this.fb.group({
    name: ['admin', [Validators.required, Validators.minLength(3)]],
    password: ['admin', [Validators.required, Validators.minLength(3)]],
  })
  login(){
    const {name, password} = this.form.value

    this.authService.login(name, password).subscribe({

    })
  }
}
