import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sprint } from '../interfaces/sprint.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintsService {

  URL = 'http://localhost:3000'
    constructor(private http: HttpClient) { }

  addSprint(sprint :Sprint): Observable<Sprint>{
      return this.http.post<Sprint>(`${this.URL}/sprints`, sprint)
  }

  getAllSprints(): Observable<Sprint[]>{
    return this.http.get<Sprint[]>(`${this.URL}/sprints`)
  }
}
