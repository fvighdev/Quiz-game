class ManageQuestionView {
  parentElement = document.querySelector(".manage-questions");
  #data;

  renderQuestions(questionList) {
    this.clear();
    this.#data = questionList;
    console.log(this.#data);
    this.#data.forEach((q) => {
      this.parentElement.insertAdjacentHTML(
        "afterbegin",
        this.createQuestionMarkup(q)
      );
    });
  }

  clear() {
    this.parentElement.innerHTML = "";
  }

  createQuestionMarkup(question) {
    return `
        <div class="question">
          <p class="question-name">${question.question}</p>
          <div class="question-control" data-id="${question.id}">
            <button class="delete-question">
              <img src="" alt="">
            Delete</button>
            <button class="edit-question"
            >Edit</button>
          </div>
        </div>
    `;
  }

  renderSpinner() {
    this.parentElement.innerHTML = "<div class='spinner'></div>";
  }

  handleDelete(deleteHandler, id) {
    deleteHandler(id);
  }
  handleEdit(editHandler, id) {
    editHandler(id);
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  addDeleteHandler(handler) {
    this.parentElement.addEventListener("click", (e) => {
      if (!e.target.closest(".delete-question")) return;

      const elemId =
        e.target.closest(".delete-question").parentElement.dataset["id"];

      setTimeout(() => {
        handler(elemId);
      }, 2000);
      console.log("delete clicked");
      this.renderMessage("delete");
    });
  }

  addEditHandler(handler) {
    this.parentElement.addEventListener("click", (e) => {
      if (!e.target.closest(".edit-question")) return;

      const elemId =
        e.target.closest(".edit-question").parentElement.dataset["id"];
      handler(elemId);

      console.log("edit clicked");
    });
  }
  /*
  addHandlerRender(deleteHandler, editHandler, questions) {

    this.parentElement.addEventListener("click", (e) => {
      if (!e.target.closest(".delete-question")) {
        if (!e.target.closest(".edit-question")) return;
        const elemId =
          e.target.closest(".edit-question").parentElement.dataset["id"];
        // this.handleEdit(editHandler, elemId);
        console.log("edit clicked");
        return;
      }
      const elemId =
        e.target.closest(".delete-question").parentElement.dataset["id"];
      this.handleDelete(deleteHandler, elemId);
      this.clear();
      this.renderQuestions(receivedQuestions.filter((q) => q.id !== elemId));
      console.log("delete clicked");
    });
  
  */
  renderMessage(type, message) {
    let messageBox = document.querySelector(".manage-questions__message-box");

    switch (type) {
      case "delete":
        messageBox.innerHTML = message || "Question deleted";
        messageBox.style.backgroundColor = "red";
        break;
      case "edit":
        messageBox.innerHTML = message || "Question edited";
        messageBox.style.backgroundColor = "blue";
        break;
      case "upload":
        messageBox.innerHTML = message || "Question uploaded";
        messageBox.style.backgroundColor = "green";
        break;
    }

    setTimeout(() => {
      messageBox.style.opacity = 0.9;
    }, 0);

    setTimeout(() => {
      messageBox.style.opacity = 0;
    }, 1400);
  }
}
export default new ManageQuestionView();
