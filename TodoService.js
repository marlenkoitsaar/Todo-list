class TodoService {
  constructor() {
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  getTodos() {
    return this.todos;
  }

  getTodoById(id) {
    return this.todos.find((todo) => todo.id === id);
  }

  removeById(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  getNextTodoId() {
    return this.todos.length + 1;
  }

  clearTodos() {
    this.todos = [];
  }
  editTodo(id) {
    // set todo isEditing prop to true if passed id is equal to todo's id
    this.todos = this.todos.map((todo) => {
      if (todo.id !== id) return todo;
      return new Todo(todo.id, todo.name, todo.description, true);
    });
  }

  saveTodo(id, name, description) {
    this.todos = this.todos.map((todo) => {
      if (todo.id !== id) return todo;
      return new Todo(id, name, description, false);
    });
  }
}
