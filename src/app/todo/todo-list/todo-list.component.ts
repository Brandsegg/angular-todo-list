import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  showCompleted = true;

  constructor(private readonly todoService: TodoService) {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      this.filterTodos();
    });
  }

  filterTodos() {
    this.filteredTodos = this.todos.filter(todo => this.showCompleted ? todo.completed : !todo.completed);
  }

  toggleFilter() {
    this.showCompleted = !this.showCompleted;
    this.filterTodos();
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(() => {
      this.loadTodos();
    });
  }

  newTodo(title: string) {
    this.todoService.addTodo(title).subscribe(() => {
      this.loadTodos();
    });
  }
}