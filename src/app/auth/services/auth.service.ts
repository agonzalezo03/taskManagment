import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../../users/interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = 'http://localhost:3000';
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    if (typeof localStorage === 'undefined') {
      return false;
    }
    localStorage.setItem('token', user.name);
    console.log(user)
    return true;
  }

  login(name: string, password: string): Observable<boolean> {
    const url = `${this.URL}/users?name=${name}&password=${password}`;

    return this.http.get<User[]>(url).pipe(
      map((user) => {
        if (user) {
          console.log(user)
          this.setAuthentication(user[0]);

          return true;
        } else {
          return false;
        }
      }),
      catchError(err => {
        console.error('Error en el login:', err);
        return throwError(() => err.error.message);
      })
    );
  }


  checkAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      this._authStatus.set(AuthStatus.noAuthenticated);
      return of(false);
    }


    this._authStatus.set(AuthStatus.authenticated);
    return of(true);
  }

  logout() {
    localStorage.removeItem('token');
    this._authStatus.set(AuthStatus.noAuthenticated);
  }
}
