import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://boolean-uk-api-server.fly.dev/brandsegg/todo';

  constructor(private http: HttpClient) {}

  // Fetch todos from the API
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  // Add a new todo using a POST request
  addTodo(title: string): Observable<Todo> {
    const newTodo = { title, completed: false };
    return this.http.post<Todo>(this.apiUrl, newTodo);
  }

  // Update an existing todo using a PUT request
  updateTodo(updatedTodo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${updatedTodo.id}`;
    return this.http.put<Todo>(url, updatedTodo);
  }
}
