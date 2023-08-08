document.addEventListener("DOMContentLoaded", function () {
  const todayDate = dayjs().format("YYYY-MM-DD");
  const todayList = document.querySelector(".today-todo-list");
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    height: 480,
    selectable: true,
    dateClick: (info) => {
      const dateTodoArr = todo.getInstance().todoList.filter((todo) => {
        return todo.createDate === info.dateStr;
      });
      todayList.innerHTML = "";
      dateTodoArr.map((dateTodo, i) => {
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
    },
  });
  calendar.render();

  const todayTodoArray = todo.getInstance().todoList.filter((todo) => {
    return todo.createDate === todayDate;
  });
  todayTodoArray.map((dateTodo, i) => {
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
});
