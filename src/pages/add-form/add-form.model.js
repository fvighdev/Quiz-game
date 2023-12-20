export function addQuestionToLocalStorage(questionToSave) {
  let res = localStorage.getItem("questions");
  let questionArr = JSON.parse(res);
  let updatedArr = [
    ...questionArr.filter((q) => q.id !== questionToSave.id),
    questionToSave,
  ];
  localStorage.setItem("questions", JSON.stringify(updatedArr));

  console.log("question saved");
}

export function getQuestionById(id) {
  console.log(id);
  let existingQuestionsJSON = localStorage.getItem("questions");
  let existingQuestionsArr = existingQuestionsJSON
    ? JSON.parse(existingQuestionsJSON)
    : [];

  console.log(existingQuestionsArr);
  let questionToEdit = existingQuestionsArr.find((q) => q.id === id);

  return questionToEdit;
}
