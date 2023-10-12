class Todo {
  constructor(id, name, description, isEditing = false) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = 'NEW';
    this.isEditing = isEditing;
  }
}
