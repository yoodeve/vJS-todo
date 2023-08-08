const addList = () => {
  generateTodoObj();
};

const generateTodoObj = () => {
  const todoValue = document.querySelector(".todo-header .text-input").value;
  const todoObj = {
    id: 0,
    todoValue,
    createDate: dayjs().format("YYYY-MM-DD"),
    complete: false,
  };
  todo.getInstance().addTodo(todoObj);
};

const modifyModalCreateOpen = ({ value }) => {
  onModalOpen();
  modifyModalInject(todo.getInstance().getTodoById(value));
};

const removeItem = ({ value }) => {
  todo.getInstance().delete(value);
};

const checkOnchange = (target) => {
  todo.getInstance().changeCompeltion(target.value, target.checked);
};

const filterOnChange = ({ value }) => {
  todo.getInstance().filterStatus(value);
};

class todo {
  static #ins = null;
  static getInstance() {
    if (this.#ins === null) {
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
    this.updateTodoList(this.todoList);
    this.saveLocalStrg();
    this.resetInputValue();
  }

  loadTodoList() {
    console.log(JSON.parse(localStorage.getItem("list")));
    this.todoList = !!localStorage.getItem("list")
      ? JSON.parse(localStorage.getItem("list"))
      : [];
    this.todoIdx = !!this.todoList[this.todoList.length - 1]?.id
      ? this.todoList[this.todoList.length - 1].id + 1
      : 1;
  }

  updateTodoList(todoArray) {
    const todoContainer = document.querySelector(".all-todo-items");
    todoContainer.innerHTML = "";
    todoArray?.map((todo) => {
      todoContainer.innerHTML += `
            <li class="todo-item">
              <div class="todolist-inner-wrapper">
                <input 
                  type="checkbox"
                  value="${todo.id}"
                  ${todo.complete ? "checked" : ""}
                  id="todo-radio${todo.id}" 
                  class="todo-radio" 
                  onchange="checkOnchange(this);" 
                />
                <label class="todo-label" for="todo-radio${todo.id}"></label>
                <div class="todo-content">
                  <p class="todo-title">${todo.todoValue}</p>
                  <p class="todo-date">${todo.createDate}</p>
                </div>
                <button class="icon-area" onclick="modifyModalCreateOpen(this)" value=${
                  todo.id
                }>
                  <i class="cursor fa-regular fa-pen-to-square icon-pad"></i>
                </button>
                <button class="grey-btn" onclick="removeItem(this)" value=${
                  todo.id
                }>DELETE</button>
              </div>
            </li>`;
      console.log(this.todoList);
    });
  }
  getTodoById(id) {
    return this.todoList.filter((todo) => {
      return todo.id === parseInt(id);
    })[0];
  }
  delete(id) {
    this.todoList = this.todoList.filter((todo) => {
      return todo.id !== parseInt(id);
    });
    this.updateTodoList(this.todoList);
    this.saveLocalStrg();
  }

  changeTodo(todoObj) {
    this.todoList.forEach((todo, i) => {
      if (todo.id === todoObj.id) {
        this.todoList[i] = todoObj;
        return;
      }
    });
    this.saveLocalStrg();
    this.updateTodoList(this.todoList);
  }

  changeCompeltion(id, check) {
    this.todoList.forEach((todo, i) => {
      if (todo.id == id) {
        this.todoList[i].complete = check;
      }
    });

    this.saveLocalStrg();
  }
  filterStatus(value) {
    let tempArray = [];
    switch (value) {
      case "true":
        tempArray = this.todoList.filter((todo) => {
          return todo.complete === true;
        });
        break;
      case "false":
        tempArray = this.todoList.filter((todo) => {
          return todo.complete === false;
        });
        break;
      default:
        tempArray = this.todoList;
        break;
    }

    this.updateTodoList(tempArray);
  }
}
