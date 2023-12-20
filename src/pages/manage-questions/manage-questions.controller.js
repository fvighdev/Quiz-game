import manageQuestionsView from "./manage-questions.view.js";
import {
  getQuestionsFromLocalStorage,
  deleteQuestion,
  editQuestion,
} from "./manaqe-questions.model.js";
//on document load this will be fired
function controlQuestions() {
  manageQuestionsView.renderSpinner();
  setTimeout(() => {
    manageQuestionsView.renderQuestions(getQuestionsFromLocalStorage());
  }, 3000);
}
// on clicking a delete button, the controller from the model will delete the question, and rerender
function controlDeleteQuestion(id) {
  deleteQuestion(id);
  manageQuestionsView.renderQuestions(getQuestionsFromLocalStorage());
}

function controlEditQuestion(id) {
  editQuestion(id);
}

// initializing controllers on load
function initManageQuestionsView() {
  manageQuestionsView.addHandlerRender(controlQuestions);
  manageQuestionsView.addDeleteHandler(controlDeleteQuestion);
  manageQuestionsView.addEditHandler(controlEditQuestion);
}

initManageQuestionsView();
