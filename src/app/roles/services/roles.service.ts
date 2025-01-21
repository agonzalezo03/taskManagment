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

  addRol(rol :Rol): Observable<Rol>{
    return this.http.post<Rol>(`${this.URL}/roles`, rol)
  }

  updateRol(rol: Rol): Observable<Rol>{
    return this.http.put<Rol>(`${this.URL}/roles/${rol.id}`, rol)
  }

  deleteRol(rolId: string): Observable<Rol>{
    return this.http.delete<Rol>(`${this.URL}/roles/${rolId}`)
  }
}
