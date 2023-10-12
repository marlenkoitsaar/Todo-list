const addTodoButton = document.querySelector('#add-todo-button');
const todoService = new TodoService();

const statuses = [
  { key: 'NEW', label: 'New' },
  { key: 'IN_PROGRESS', label: 'In progress' },
  { key: 'DONE', label: 'Done' },
];

if (!addTodoButton) {
  throw new Error('button with id x#add-todo-button does not exist');
}

addTodoButton.addEventListener('click', () => {
  const todoName = document.getElementById('todo-input-name');
  const todoDescription = document.getElementById('todo-input-description');

  if (todoName.value.trim().length === 0) {
    alert('Pls enter name');
    return;
  }
  if (todoDescription.value.trim().length === 0) {
    alert('Pls enter desc.');
    return;
  }

  const id = todoService.getNextTodoId();
  const todo = new Todo(id, todoName.value, todoDescription.value);

  todoService.addTodo(todo);
  renderTodos();
  todoName.value = '';
  todoDescription.value = '';
});

function renderTodos() {
  const todoList = document.getElementById('todos');
  todoList.innerHTML = '';

  const todos = todoService.getTodos();
  console.log({ todos });
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];

    const div = document.createElement('div');
    div.className = 'col-sm-6 col-md-4 col-lg-3';

    const card = document.createElement('div');
    card.className = 'card';
    card.style.height = '180px';

    div.appendChild(card);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    card.appendChild(cardBody);

    if (todo.isEditing) {
      const nameInput = document.createElement('input');
      nameInput.className = 'form-control form-control-sm';
      nameInput.id = 'name-edit-field';
      nameInput.placeholder = 'Name';
      nameInput.value = todo.name;

      cardBody.appendChild(nameInput);

      const descriptionInput = document.createElement('input');
      descriptionInput.className = 'form-control form-control-sm mt-2';
      descriptionInput.placeholder = 'Description';
      descriptionInput.id = 'desc-edit-field';
      descriptionInput.value = todo.description;

      cardBody.appendChild(descriptionInput);
    } else {
      const cardTitle = document.createElement('h5');
      cardTitle.className = 'card-title';
      cardTitle.textContent = todo.name;

      cardBody.appendChild(cardTitle);

      const cardText = document.createElement('p');
      cardText.className = 'card-text';
      cardText.textContent = todo.description;

      cardBody.appendChild(cardText);
    }

    const flexBox = document.createElement('div');
    flexBox.className = 'd-flex align-items-center justify-content-between';

    const select = document.createElement('select');
    select.className = 'form-select w-50';

    select.onchange = (e) => {
      console.log(e.target.value);
    };

    for (let i = 0; i < statuses.length; i++) {
      const { key, label } = statuses[i];
      const option = document.createElement('option');
      const optionText = document.createTextNode(label);
      option.setAttribute('value', key);
      option.appendChild(optionText);
      select.appendChild(option);
    }

    flexBox.appendChild(select);

    const statusBox = document.createElement('div');
    statusBox.className = 'd-flex align-items-center justify-content-between';

    // const checkbox = document.createElement('input');
    // checkbox.type = 'checkbox';
    // checkbox.className = 'form-check-input btn-primary';
    //checkbox.checked = true;
    // checkbox.disabled = true;

    const status = document.createElement('p');
    status.className = 'lead m-0';
    status.textContent = todo.status;

    // statusBox.appendChild(checkbox);
    //statusBox.appendChild(status);

    flexBox.appendChild(statusBox);

    cardBody.appendChild(flexBox);

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'btn-group w-100';
    buttonGroup.style.gap = '0.5rem';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger mt-2';
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = (event) => {
      event.preventDefault();
      todoService.removeById(todo.id);
      renderTodos();
    };

    if (!todo.isEditing) {
      const editButton = document.createElement('button');
      editButton.className = 'btn btn-info mt-2';
      editButton.type = 'button';
      editButton.textContent = 'Edit';
      editButton.onclick = (event) => {
        event.preventDefault();
        todoService.editTodo(todo.id);
        renderTodos();
      };
      buttonGroup.appendChild(editButton);
      buttonGroup.appendChild(deleteButton);
    } else {
      const saveButton = document.createElement('button');
      saveButton.className = 'btn btn-success mt-2';
      saveButton.type = 'button';
      saveButton.textContent = 'Save';
      saveButton.onclick = (event) => {
        event.preventDefault();
        const nameInput = document.getElementById('name-edit-field');
        const descriptionInput = document.getElementById('desc-edit-field');
        todoService.saveTodo(todo.id, nameInput.value, descriptionInput.value);
        renderTodos();
      };

      buttonGroup.appendChild(saveButton);
      buttonGroup.appendChild(deleteButton);
    }

    cardBody.appendChild(buttonGroup);

    todoList.appendChild(div);
  }
}
