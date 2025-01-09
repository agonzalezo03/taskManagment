import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task.interdace';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  URL = 'http://localhost:3000';
  private http = inject(HttpClient);
  constructor() { }

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.URL}/tasks`);
  }

  updateTasks(task:Task): Observable<Task>{
    return this.http.put<Task>(`${this.URL}/tasks/${task.id}`, task);
  }
}
