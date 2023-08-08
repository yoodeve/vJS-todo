const modalContainer = document.querySelector(".modal-background");

const onClose = () => {
  modalContainer.classList.add("none");
  modalContainer.innerHTML = "";
};
const onModalOpen = () => {
  modalContainer.classList.remove("none");
};
const onSaveClick = (id) => {
  const todoValue = document.querySelector(".modal-input").value;
  const oldTodoObj = todo.getInstance().getTodoById(id);
  const newTodoObj = {
    ...oldTodoObj,
    todoValue,
  };
  if (todoValue === todo.todoValue || !todoValue) return;

  todo.getInstance().changeTodo(newTodoObj);
  modalContainer.classList.add('none');
};

const modifyModalInject = (todo) => {
  modalContainer.innerHTML = `
          <div class="modal-container">
            <div class="modal-header">변경하기</div>
            <div class="modal-content">
              <div class="modal-input-wrapper">
                <input class="modal-input" type="text" value=${todo.todoValue} />
              </div>
            </div>
            <div class="modal-button-wrapper">
              <button class="grey-btn primary-button" onclick="onSaveClick(${todo.id});">SAVE</button>
              <button class="grey-btn" onclick="onClose()">CLOSE</button>
            </div>
          </div>
  `;
};
