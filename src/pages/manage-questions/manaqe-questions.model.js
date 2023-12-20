export function getQuestionsFromLocalStorage() {
  let questions = localStorage.getItem("questions");
  if (!questions) return;

  return JSON.parse(questions);
}

export function deleteQuestion(id) {
  let existingQuestionsJSON = localStorage.getItem("questions");
  let questionsArr = JSON.parse(existingQuestionsJSON);
  let filteredQuestions = questionsArr.filter((q) => q.id !== id);
  localStorage.setItem("questions", JSON.stringify(filteredQuestions));
}

export function editQuestion(id) {
  console.log("editing " + id);
  window.location.href = `http://127.0.0.1:5500/js-practice/src/pages/add-form/add-form.html?mode=edit#${id}`;
}
