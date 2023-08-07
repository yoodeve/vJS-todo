class Routes {
  static #instance = null;
  static getInstance() {
    if (this.#instance === null) {
      this.#instance = new Routes();
    }
    return this.#instance;
  }

  routeState = "calendar";
  show() {
    clear();
    switch (this.routeState) {
      case "todo":
        document
          .querySelector(".todo-container")
          .classList.remove("none");
        break;
      case "calendar":
        document
          .querySelector(".calendar-container")
          .classList.remove("none");
        break;
    }
  }
}
function clear() {
  const pages = document.querySelectorAll("#root > div:not(#root > .navigation-bar)");
  const navbar = document.querySelectorAll(".navigation-bar div");
  pages.forEach((page) => {
    page.classList.add("none");
  });
}