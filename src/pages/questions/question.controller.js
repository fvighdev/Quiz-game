import questionView from "./question.view.js";
import { getQuestions } from "./question.model.js";

export default async function initQuestionController() {
  try {
    questionView.initListeners();
    await questionView.setDifficulty();
    questionView.initQuestionData(getQuestions(questionView.difficulty));
    questionView.renderQuestionBasedOnIndex();
  } catch (error) {
    console.log(error);
  }
}
