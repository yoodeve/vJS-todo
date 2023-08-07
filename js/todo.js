
const addList = () => {
  generateTodoObj();
};

const generateTodoObj = () => {
  const todoValue = document.querySelector(".todo-header .text-input").value;
  const todoObj = {
    id: 0,
    todoValue,
    createDate: dayjs().format('YY-MM-DD'),
    complete: false,
  };
  todo.getInstance().addTodo(todoObj);
};

class todo {
  static #ins = null;
  static getInstance() {
    if(this.#ins === null) {
      this.#ins = new todo();
    }
    return this.#ins;
  }

  constructor() {
    this.loadTodoList();
  }

  todoList = [];
  todoIdx = 0;

  saveLocalStrg() {
    localStorage.setItem("list", JSON.stringify(this.todoList));
  }

  resetInputValue() {
    document.querySelector(".todo-header .text-input").value = "";
  }

  addTodo(todoObj) {
    this.todoIdx++;
    const todoObject = {
      ...todoObj,
      id: this.todoIdx,
    };
    this.todoList.push(todoObject);
    this.updateTodoList();
    this.saveLocalStrg();
    this.resetInputValue()
  }

  loadTodoList() {
    console.log(JSON.parse(localStorage.getItem("list")))
    this.todoList = !!localStorage.getItem("list")
      ? JSON.parse(localStorage.getItem("list"))
      : [];
    this.todoIdx = !!this.todoList[this.todoList.length - 1]?.id
      ? this.todoList[this.todoList.length - 1].id + 1
      : 1;
  }

  updateTodoList() {
    const todoContainer = document.querySelector('.all-todo-items');
    todoContainer.innerHTML = "";
    this.todoList?.map(todo => {
      todoContainer.innerHTML += `
            <li class="todo-item">
              <div class="todolist-inner-wrapper">
                <input type="checkbox" id="todo-radio${todo.id}" class="todo-radio" />
                <label class="todo-label" for="todo-radio${todo.id}"></label>
                <div class="todo-content">
                  <p class="todo-title">${todo.todoValue}</p>
                  <p class="todo-date">${todo.createDate}</p>
                </div>
                <span>
                  <i class="cursor fa-regular fa-pen-to-square icon-pad"></i>
                </span>
                <button class="grey-btn">DELETE</button>
              </div>
            </li>`;
    })
  }
}
