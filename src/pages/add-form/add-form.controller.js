import addFormView from "./add-form.view.js";
import {
  addQuestionToLocalStorage,
  getQuestionById,
} from "./add-form.model.js";

function formController() {
  addFormView.initHandlers();
  addFormView.loadAndSetMode(getQuestionById);
  addFormView.onSubmit(addQuestionToLocalStorage);
}
formController();
