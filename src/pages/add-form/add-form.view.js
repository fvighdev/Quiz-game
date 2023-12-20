class AddForm {
  parentElement = document.querySelector("#add-question-form");

  mode; //edit  || new

  answerlistValues = []; //using if the mode is NEW
  questionToEditAndSave; //using if the mode is EDIT

  //
  messageModal = document.querySelector(".messageModal");
  answerlistNode = document.querySelector(".answerlist");
  addAnswerBtn = document.querySelector(".form-add-answer");
  //form input fields
  questionInput = document.querySelector("#form-question");
  answerInput = document.querySelector("#form-answers");
  correctAnswerInput = document.querySelector("#form-correct-answer");
  difficulty = document.querySelector("#form-difficulty");

  //runs when the page starts, setting mode,
  loadAndSetMode(getQuestionByIdHandler) {
    //check url for existing hash
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.mode = urlParams.get("mode") || "new";

    if (this.mode === "edit") {
      let questionId = window.location.hash.slice(1);
      this.questionToEditAndSave = getQuestionByIdHandler(questionId);

      this.changeTextIfInEditMode();
      this.insertQuestionIntoForm();
    }
  }

  addPossibleAnswer() {
    let answer = this.answerInput.value;
    if (this.mode === "new") {
      this.answerlistValues.push(answer);
    }
    if (this.mode === "edit") {
      this.questionToEditAndSave.answerList.push(answer);
    }

    this.renderAnswer(answer);
    this.resetAnswerInput();
    this.populateChooseCorrectAnswer();

    this.chechAnswerListLength();
  }

  chechAnswerListLength() {
    if (this.mode === "edit") {
      this.questionToEditAndSave.answerList.length > 3
        ? this.addAnswerBtnDisable()
        : this.addAnswerBtnEnable();
      return;
    }
    if (this.mode === "new") {
      this.answerlistValues.length > 3
        ? this.addAnswerBtnDisable()
        : this.addAnswerBtnEnable();
    }
  }

  renderAnswer(answerData) {
    let answerMarkup = this.createAnswerMarkup(answerData);
    this.answerlistNode.insertAdjacentHTML("beforeend", answerMarkup);
  }

  createAnswerMarkup(answerData) {
    return `
    <li class="answer" data-value=${answerData}>
      <span class="answer-data">${answerData}</span>
      <button class="delete-answer">X</button>
    </li>
    `;
  }

  resetAnswerInput() {
    this.answerInput.value = "";
    this.answerInput.focus();
  }

  addAnswerBtnDisable() {
    let answerLabel = document.querySelector("#answer-label");
    answerLabel.innerHTML = "You have all 4 answers needed.";
    this.addAnswerBtn.disabled = true;
    this.answerInput.disabled = true;
  }

  addAnswerBtnEnable() {
    let answerLabel = document.querySelector("#answer-label");
    answerLabel.innerHTML = "Enter a possible answer:";
    this.addAnswerBtn.disabled = false;
    this.answerInput.disabled = false;
  }

  collectFormData() {
    let id =
      this.mode === "edit"
        ? this.questionToEditAndSave.id
        : "q_" + new Date().getTime();

    let answerList =
      this.mode === "edit"
        ? this.questionToEditAndSave.answerList
        : this.answerlistValues;

    let newQuestionObj = {
      id: id,
      difficulty: this.difficulty.value,
      question: this.questionInput.value,
      answerList: answerList,
      correctAnswer: this.correctAnswerInput.value,
    };
    console.log(newQuestionObj);
    return newQuestionObj;
  }
  resetForm() {
    this.questionInput.value = "";
    this.answerlistNode.innerHTML = "";
    this.answerInput.value = "";
    this.correctAnswerInput.value = "";
    //this.difficulty[0].text = "Easy";
  }
  onSubmit(handler) {
    let type = this.mode === "edit" ? "edit" : "create";
    this.parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      let isFormValid = this.validateForm();
      if (!isFormValid) return;

      let formData = this.collectFormData();
      this.resetForm();
      this.renderMessage(type);
      handler(formData);
    });
  }

  removeValueFromListArray(value) {
    if (this.mode === "new") {
      let filtered = this.answerlistValues.filter((v) => v !== value);
      this.answerlistValues = filtered;
    }
    if (this.mode === "edit") {
      let filtered = this.questionToEditAndSave.answerList.filter(
        (v) => v !== value
      );
      this.questionToEditAndSave.answerList = filtered;
    }
  }

  changeTextIfInEditMode() {
    const metaTitle = document.querySelector("head title");
    const formTitle = document.querySelector("#add-question-form h2");
    const submitBtn = document.querySelector(".form__upload-btn");

    metaTitle.innerHTML = "Edit Question";
    formTitle.innerHTML = "Edit Question";
    submitBtn.innerHTML = "Save Question";
  }

  insertQuestionIntoForm() {
    console.log(this.questionToEditAndSave);
    let { difficulty, question, answerList, correctAnswer } =
      this.questionToEditAndSave;

    this.questionInput.value = question;
    this.answerlistValues = [...answerList];
    this.difficulty.value = difficulty;
    //this.correctAnswerInput.value = correctAnswer;
    this.answerlistValues.forEach((answer) => {
      this.renderAnswer(answer);
      this.populateChooseCorrectAnswer();
    });
    this.chechAnswerListLength();
  }

  initHandlers() {
    this.handleKeyDownOnEnterAnswer();
    this.handleAddPossibleAnswer();
    this.preventSubmissionOnPressingEnter();
    this.onAnswerOptionDelete();
  }

  handleAddPossibleAnswer() {
    this.addAnswerBtn.addEventListener("click", (e) => {
      this.addPossibleAnswer();
    });
  }

  handleKeyDownOnEnterAnswer() {
    this.answerInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.addPossibleAnswer();
      }
    });
  }
  preventSubmissionOnPressingEnter() {
    this.parentElement.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    });
  }

  populateChooseCorrectAnswer() {
    this.correctAnswerInput.innerHTML = "";

    if (this.mode === "edit") {
      this.questionToEditAndSave.answerList.forEach((value) => {
        let newCorrectAnswerOption = `<option ${
          value === this.questionToEditAndSave.correctAnswer
            ? "selected='true'"
            : ""
        } value=${value}>${value}</option>`;

        this.correctAnswerInput.insertAdjacentHTML(
          "beforeend",
          newCorrectAnswerOption
        );
      });
    }

    if (this.mode === "new") {
      this.answerlistValues.forEach((value) => {
        let newCorrectAnswerOption = `<option value=${value}>${value}</option>`;

        this.correctAnswerInput.insertAdjacentHTML(
          "beforeend",
          newCorrectAnswerOption
        );
      });
    }
  }

  onAnswerOptionDelete() {
    document.addEventListener("click", (e) => {
      let deleteBtn = e.target.closest(".delete-answer");
      if (!deleteBtn) return;

      let answerLiElement = deleteBtn.parentElement;
      let answerValue = answerLiElement.dataset["value"];

      answerLiElement.remove();
      this.removeValueFromListArray(answerValue);
      this.renderMessage("delete", "Answer deleted");
      this.populateChooseCorrectAnswer();
      this.addAnswerBtnEnable();
    });
  }

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
      case "create":
        messageBox.innerHTML = message || "Question created";
        messageBox.style.backgroundColor = "green";
        break;
      case "error":
        messageBox.innerHTML = "Error happened:<br> " + message;
        messageBox.style.backgroundColor = "red";
        break;
      default:
        console.log("switch default");
    }

    setTimeout(() => {
      messageBox.style.opacity = 0.9;
    }, 0);

    setTimeout(() => {
      messageBox.style.opacity = 0;
    }, 2400);
  }

  validateForm() {
    const questionLength = this.questionInput.value.length;
    const requiredAnswers =
      this.mode === "edit"
        ? this.questionToEditAndSave.answerList
        : this.answerlistValues;

    if (questionLength < 10) {
      this.renderMessage(
        "error",
        "The length of the question must be at least 10 characters"
      );
      return false;
    }
    console.log(requiredAnswers);
    if (requiredAnswers.length < 4) {
      this.renderMessage("error", "You need to provide 4 answers");
      return false;
    }

    if (new Set(requiredAnswers).size < 4) {
      this.renderMessage(
        "error",
        "It seems you have 2 or more similar answer. Please provide unique values!"
      );
      return false;
    }

    return true;
  }
}

export default new AddForm();
