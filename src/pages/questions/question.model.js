export function getQuestions(difficulty) {
  let storedQuestions = localStorage.getItem("questions");
  if (storedQuestions) {
    storedQuestions = JSON.parse(storedQuestions);
  }
  let initialQuestions = [
    {
      id: "q_1",
      difficulty: "easy",
      question: "what year is this?",
      answerList: [2023, 2020, 1999, 1984],
      correctAnswer: 2023,
    },
    {
      id: "q_2",
      difficulty: "easy",
      question: "what year is this?",
      answerList: [2023, 2020, 1999, 1984],
      correctAnswer: 2023,
    },
  ];

  let existingList = storedQuestions ? storedQuestions : initialQuestions;
  let filteredByDifficulty = filterQuestions(existingList, difficulty);
  //shuffle the answers of each questions
  let filteredWithShuffledAnswers = filteredByDifficulty.map((questionObj) => {
    let shuffledAnswers = shuffleList(questionObj.answerList);
    return {
      ...questionObj,
      shuffledAnswers,
    };
  });

  return shuffleList(filteredWithShuffledAnswers);
}

export function shuffleList(list) {
  let listCopy = [...list];
  let shuffled = [];
  while (shuffled.length !== list.length) {
    let randIndex = Math.floor(Math.random() * listCopy.length);
    shuffled = [...shuffled, ...listCopy.splice(randIndex, 1)];
  }
  return shuffled;
}

function filterQuestions(questionArr, difficulty) {
  console.log(questionArr, difficulty);
  return questionArr.filter(
    (q) => q.difficulty.toLowerCase() === difficulty.toLowerCase()
  );
}

/*
keeps the original unchanged

export function shuffleList(questionObj) {
  let list = questionObj.answerList;
  let listCopy = [...list];
  let shuffled = [];
  while (shuffled.length !== list.length) {
    let randIndex = Math.floor(Math.random() * listCopy.length);
    shuffled = [...shuffled, ...listCopy.splice(randIndex, 1)];
  }
  return shuffled;
}
*/
