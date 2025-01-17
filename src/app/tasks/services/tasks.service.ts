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

  getTaskId(id :string): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.URL}/tasks?id=${id}`)
  }

  newTask(task: Task): Observable<Task>{
    return this.http.post<Task>(`${this.URL}/tasks`, task)
  }

  updateTasks(task:Task): Observable<Task>{
    return this.http.put<Task>(`${this.URL}/tasks/${task.id}`, task);
  }
}
