document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    height: 450,
    selectable: true,
    dateClick: (info) => {
      const dateTodoArr = todo.getInstance().todoList.filter((todo) => {
        return todo.createDate === info.dateStr
      });
      const todayList = document.querySelector('.today-todo-list')
      todayList.innerHTML = "";
      dateTodoArr.map((dateTodo) => {
        return todayList.innerHTML += `
          <li class="today-todo-item">${dateTodo.todoValue}</li>
        `;
      })
    }
  });
  calendar.render();
});