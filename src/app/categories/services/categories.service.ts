import { inject, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Category } from '../interfaces/categorie.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  URL = 'http://localhost:3000';
    private http = inject(HttpClient);
    constructor() { }

    getCategories(): Observable<Category[]>{
      return this.http.get<Category[]>(`${this.URL}/categories`);
    }

    saveCategory( cat: Category): Observable<Category>{
      return this.http.post<Category>(`${this.URL}/categories`, cat)
    }

    deleteCategory(cat: Category): Observable<void> {
      return this.http.delete<void>(`${this.URL}/categories/${cat.id}`);
    }
}
