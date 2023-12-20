class QuestionView {
  parentElement = document.querySelector(".questions");
  //properties related to data
  questionData;
  currentQuestionIndex = 0;
  difficulty = "easy";
  trackedAnswers = [];
  //controls
  prevBtn = document.querySelector(".prev-button");
  nextBtn = document.querySelector(".next-button");
  quizSubmitButton = document.querySelector(".submit-button");

  async setDifficulty() {
    return new Promise((resolve, reject) => {
      let modal = document.createElement("div");
      modal.classList.add("modal-difficulty");

      modal.innerHTML = `
        <form action="">
          <h2>Choose Difficulty</h2>
          <label for="difficulty">
            Easy
            <input type="radio" name="difficulty" value="Easy" checked/>
          </label>
          <label for="difficulty">
            Medium
            <input type="radio" name="difficulty" value="Medium" />
          </label>
          <label for="difficulty">
            Hard
            <input type="radio" name="difficulty" value="Hard" />
          </label>
          <div class="submit-difficulty">
            <hr />
          </div>
          <button>Choose</button>
        </form>
      `;

      this.parentElement.appendChild(modal);
      let difficultyForm = document.querySelector(".modal-difficulty form");
      difficultyForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const selectedDifficulty = document.querySelector(
          'input[name="difficulty"]:checked'
        ).value;
        this.difficulty = selectedDifficulty;
        modal.remove();
        this.parentElement.innerHTML = "";
        resolve("promise resolved");
      });
    });
  }

  initQuestionData(questionList) {
    this.questionData = questionList;
  }

  renderQuestionBasedOnIndex() {
    let questionMarkup = this.generateQuestionMarkup(
      this.questionData[this.currentQuestionIndex]
    );
    let existingQuestion = document.querySelector(".question-container");
    if (existingQuestion) {
      existingQuestion.remove();
    }
    this.parentElement.insertAdjacentHTML("beforeend", questionMarkup);
  }

  checkIfQuizIsSubmittable() {
    if (this.trackedAnswers.includes(undefined)) return;

    if (this.trackedAnswers.length === this.questionData.length) {
      this.quizSubmitButton.classList.remove("hidden");
    }
  }

  generateQuestionMarkup(q) {
    const answers = q.answerList
      .map((a) => {
        return this.generateAnswerMarkup(a, q.correctAnswer);
      })
      .join("");

    return `
        <div class="question-container">
          <h2 class="question">${q.question}</h2>
          <ul class="answers">
            ${answers}
          </ul>
          <div class="questionindex">
          <span>${this.currentQuestionIndex + 1}</span>/<span>${
      this.questionData.length
    }</span>
          </div>
        </div>
    `;
  }

  markSelectedAnswer() {}

  generateAnswerMarkup(answer, correctAnswer) {
    let ifAnswerIsCorrect = answer === correctAnswer;
    let ifIsSelected = this.trackedAnswers[this.currentQuestionIndex] == answer;
    let answerMarkup = `<li class="answer ${ifIsSelected ? "selected" : ""}" ${
      ifAnswerIsCorrect ? "id='correct-answer'" : ""
    } ">${answer}</li>`;
    return answerMarkup;
  }

  compareAnswers() {
    let numberOfCorrectAnswers = 0;
    this.questionData.forEach((question, index) => {
      if (question.correctAnswer == this.trackedAnswers[index]) {
        numberOfCorrectAnswers++;
      }
    });
    return numberOfCorrectAnswers;
  }

  renderResult(numberOfCorrectAnswers) {
    let resultContainer = document.querySelector(".result");
    console.log("in result func");
    resultContainer.innerHTML = `Out of ${this.questionData.length}questions you gave ${numberOfCorrectAnswers} correct answers`;
  }

  initListeners() {
    this.prevBtn.addEventListener("click", () => {
      if (this.currentQuestionIndex === 0) return;

      this.currentQuestionIndex -= 1;
      this.renderQuestionBasedOnIndex(this.currentQuestionIndex);
    });

    this.nextBtn.addEventListener("click", () => {
      if (this.currentQuestionIndex === this.questionData.length - 1) return;

      this.currentQuestionIndex++;
      this.renderQuestionBasedOnIndex(this.currentQuestionIndex);
    });

    window.addEventListener("click", (e) => {
      const selectedAnswer = e.target.closest(".answer");
      if (!selectedAnswer) return;
      const allAnswers = document.querySelectorAll(".answer");

      allAnswers.forEach((a) => a.classList.remove("selected"));
      selectedAnswer.classList.add("selected");

      this.trackedAnswers[this.currentQuestionIndex] = selectedAnswer.innerText;
      console.log(this.trackedAnswers);
      this.checkIfQuizIsSubmittable();
    });

    this.quizSubmitButton.addEventListener("click", (e) => {
      console.log(e.target);
      console.log("clicked in quizbtnlistener");
      let correctAnswerNumber = this.compareAnswers();
      this.renderResult(correctAnswerNumber);
    });
  }
}

export default new QuestionView();
