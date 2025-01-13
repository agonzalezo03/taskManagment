import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  URL = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  getRoles(): Observable<Rol[]> {
      return this.http.get<Rol[]>(`${this.URL}/roles`);
    }
}
