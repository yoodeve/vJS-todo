document.addEventListener("DOMContentLoaded", function () {
  const todayDate = dayjs().format("YYYY-MM-DD");
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    height: 480,
    selectable: true,
    dateClick: (info) => {
      const dateTodoArr = todo.getInstance().todoList.filter((todo) => {
        return todo.createDate === info.dateStr;
      });
      Calendar.getInstance().showStatus(dateTodoArr);
      document.querySelector(
        ".today-date-wrapper"
      ).innerHTML = `<p>${info.dateStr}의 할일</p>`;
    },
  });

  document.querySelector(
    ".today-date-wrapper"
  ).innerHTML = `<p>${todayDate}의 할일</p>`;
  const todayTodoArray = todo.getInstance().todoList.filter((todo) => {
    return todo.createDate === todayDate;
  });
  Calendar.getInstance().showStatus(todayTodoArray);
  calendar.render();
});

class Calendar {
  static #inst = null;
  static getInstance() {
    if (this.#inst === null) {
      this.#inst = new Calendar();
    }
    return this.#inst;
  }

  showStatus(todoArr) {
    console.log("showStatus ===>>", todoArr)
    const todayList = document.querySelector(".today-todo-list");
    todoArr.reverse();
    todayList.innerHTML = "";
    todoArr.map((dateTodo, i) => {
      return !!dateTodo.complete
        ? (todayList.innerHTML += `
      <li class="today-todo-item underlined"><span>${i + 1}</span>.  ${
            dateTodo.todoValue
          }</li>
      `)
        : (todayList.innerHTML += `
      <li class="today-todo-item"><span>${i + 1}</span>.  ${
            dateTodo.todoValue
          }</li>
      `);
    });
  }
}
