import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User} from '../interfaces/user.interface'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  URL = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.URL}/users`);
  }

  newUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.URL}/users`, user)
  }

}
