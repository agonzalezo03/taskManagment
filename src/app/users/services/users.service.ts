import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User} from '../interfaces/user.interface'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  URL = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User> {
    return this.http.get<User>(this.URL);
  }

  login(name: string, password: string): Observable<User | null> {
    const loginUrl = `${this.URL}users`;

    return this.http.get<User[]>(loginUrl, {
      params: {
        name: name,
        password: password
      }
    }).pipe(
      map(users => users.length > 0 ? users[0] : null)
    );
  }
}
