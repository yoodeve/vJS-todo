const navMenuOnClick = (target) => {
  const calendarPage = document.querySelector(".calender-page-icon-wrapper");
  const listPage = document.querySelector(".list-page-icon-wrapper");
  switch (target.classList.contains("list-page-icon-wrapper")) {
    case false:
      window.scrollTo(0,0);
      calendarPage.classList.add("fo-light");
      calendarPage.classList.remove("fo-dark");
      listPage.classList.add("fo-dark");
      listPage.classList.remove("fo-light");
      Routes.getInstance().routeState = "calendar";
      break;
      case true:
      window.scrollTo(0,0);
      listPage.classList.add("fo-light");
      listPage.classList.remove("fo-dark");
      calendarPage.classList.add("fo-dark");
      calendarPage.classList.remove("fo-light");
      Routes.getInstance().routeState = "todo";
      break;
  }

  Routes.getInstance().show();
};

const floatBtnOnClick = () => {
  document.querySelector(".todo-container").classList.remove("none");
  document.querySelector(".calendar-container").classList.add("none");
  document.querySelector(".list-page-icon-wrapper").classList.add("fo-light");
  document.querySelector(".list-page-icon-wrapper").classList.remove("fo-dark");
  document
    .querySelector(".calender-page-icon-wrapper")
    .classList.add("fo-dark");
  document
    .querySelector(".calender-page-icon-wrapper")
    .classList.remove("fo-light");
};
