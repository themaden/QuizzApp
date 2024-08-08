import React, { useState, useEffect } from 'react';

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  // Daha fazla soru ekleyin
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 saniye
  const [timer, setTimer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      setTimer(timerId);
    } else {
      clearInterval(timer);
      setFeedback("Time's up!");
      setShowResults(true);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (option) => {
    const isCorrect = option === questions[currentQuestion].answer;
    setAnswers(prevAnswers => [...prevAnswers, { question: questions[currentQuestion].question, answer: option, correct: isCorrect }]);
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Wrong!");
    }
    setTimeout(() => {
      setFeedback("");
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    }, 1000); // 1 saniye bekleyip sonraki soruya geç
  };

  if (showResults || currentQuestion >= questions.length) {
    clearInterval(timer);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-4 text-green-600">Quiz Completed!</h1>
        <p className="text-lg text-gray-700 mb-4">Your score: {score}/{questions.length}</p>
        <p className="text-lg text-gray-700 mb-4">{feedback}</p>
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Results</h2>
          <ul className="space-y-4">
            {answers.map((answer, index) => (
              <li key={index} className={`p-4 ${answer.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-lg shadow`}>
                <p className="font-semibold">{answer.question}</p>
                <p className="mt-1">Your answer: {answer.answer}</p>
                <p className="mt-1">Correct answer: {questions.find(q => q.question === answer.question).answer}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Question {currentQuestion + 1} of {questions.length}
        </h1>
        <p className="text-xl font-semibold mb-4 text-gray-600">Time left: {timeLeft}s</p>
        {feedback && <p className="text-xl font-semibold mb-4 text-red-600">{feedback}</p>}
        <h2 className="text-lg font-semibold mb-4">{questions[currentQuestion].question}</h2>
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${
                feedback ? (option === questions[currentQuestion].answer ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-blue-500 text-white'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
