import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../../users/interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Rol } from '../../roles/interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = 'http://localhost:3000';
  private http = inject(HttpClient);
  private router = inject(Router);

  private _currentUser = signal<User | null>(null);
  private _currentRol = signal<Rol | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public currentRol = computed(() => this._currentRol());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);

    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('token', user.id);
    } else {
      return false;
    }

    return true;
  }

  login(name: string, password: string): Observable<boolean> {
    const url = `${this.URL}/users?name=${name}&password=${password}`;

    return this.http.get<User[]>(url).pipe(
      map((users) => {
        if (users && users.length > 0) {
          this.setAuthentication(users[0]);
          this.router.navigateByUrl('/task');
          return true;
        } else {
          return false;
        }
      }),
      catchError(err => {
        console.error('Error en el login:', err);
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  checkAuthStatus(): Observable<boolean> {
    const token = sessionStorage.getItem('token');

    if (!token) {
      this._authStatus.set(AuthStatus.noAuthenticated);
      return of(false);
    }

    return this.getUserToken(token).pipe(
      switchMap(user => {
        if (user && user.length > 0) {
          this._authStatus.set(AuthStatus.authenticated);
          this._currentUser.set(user[0]);

          // Usamos switchMap para esperar por el rol
          return this.loadUserRole(user[0]).pipe(
            map(() => true),  // Cuando todo esté listo, retornar true
            catchError(() => of(false)) // Manejo de errores si algo sale mal
          );
        } else {
          this._authStatus.set(AuthStatus.noAuthenticated);
          return of(false);
        }
      }),
      catchError(() => {
        this._authStatus.set(AuthStatus.noAuthenticated);
        return of(false);
      })
    );
  }



  private loadUserRole(user: User): Observable<Rol> {
    // Obtener el rol del usuario de forma asíncrona y devolver el observable
    return this.getRol(user.rol).pipe(
      map((role) => {
        if (role && role.length > 0) {
          // Asignar el rol al usuario
          this._currentRol.set(role[0]);
          return role[0];
        }
        throw new Error('No se pudo cargar el rol');
      })
    );
  }

  getRol(rolId: string): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.URL}/roles?id=${rolId}`);
  }

  getUserToken(token: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.URL}/users?id=${token}`);
  }

  logout() {
    sessionStorage.removeItem('token');  // Cambiar para usar sessionStorage
    this._authStatus.set(AuthStatus.noAuthenticated);
    this._currentUser.set(null);  // Limpiar el usuario actual
    this.router.navigateByUrl('/login');  // Redirigir a la página de login
  }

  hasPermission(resourceName: string, permissionLevel: number): boolean {
    const permissions = this._currentRol()?.permissions || [];
    const resourcePermission = permissions.find(p => p.resourceName === resourceName);

    console.log(resourcePermission)
    if (!resourcePermission) {
      return false;
    }

    switch (permissionLevel) {
      case 1:
        return resourcePermission.permission === 1 || resourcePermission.permission === 2;
      case 2:
        return resourcePermission.permission === 2;
      case 3:
        return resourcePermission.permission !== 3;
      default:
        return false;
    }
  }


}
