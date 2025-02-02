"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toggleQuiz } from "@/store/quizSlice";

// Quiz Questions Data
const quizQuestions = [
  {
    question: "What is the output of `print(2 * 3)` in Python?",
    options: ["6", "5", "3", "None of the above"],
    correctAnswer: "6",
  },
  {
    question: "Which keyword is used to define a function in Python?",
    options: ["def", "function", "func", "define"],
    correctAnswer: "def",
  },
  {
    question: "What does `len()` function do in Python?",
    options: [
      "Returns the length of a string or list",
      "Returns the type of an object",
      "Returns the value of an integer",
      "None of the above",
    ],
    correctAnswer: "Returns the length of a string or list",
  },
  {
    question: "Which of the following is a mutable data type in Python?",
    options: ["List", "String", "Tuple", "Integer"],
    correctAnswer: "List",
  },
  {
    question: "How do you comment a line of code in Python?",
    options: ["//", "#", "/* */", "/*"],
    correctAnswer: "#",
  },
];

export default function LessonQuiz() {
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [showScore, setShowScore] = useState(false);

  const dispatch = useDispatch();

  // Handles the change of selected answer
  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...quizAnswers];
    newAnswers[quizStep] = e.target.value;
    setQuizAnswers(newAnswers);
  };

  // Handles the submission of the quiz and shows the score
  const handleSubmitQuiz = () => {
    setShowScore(true);
  };

  // Calculate the score based on the correct answers
  const calculateScore = () => {
    let score = 0;
    quizAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        score++;
      }
    });
    return score;
  };

  // Logic to cancel the quiz and navigate away
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel the quiz?")) {
      dispatch(toggleQuiz()); // Dispatch to reset the quiz state

    }
  };

  // Navigation for the previous step
  const handlePreviousStep = () => {
    if (quizStep > 0) {
      setQuizStep(quizStep - 1);
    }
  };

  // Navigation for the next step or finish the quiz
  const handleNextStep = () => {
    if (quizStep < quizQuestions.length - 1) {
        setQuizStep(quizStep + 1);
    } else {
        setQuizStep(quizStep + 1);
      handleSubmitQuiz(); // Finish quiz and show score
    }
  };

  // Handle the finish action and dispatch toggleQuiz
  const handleFinish = () => {
    dispatch(toggleQuiz()); // Toggle quiz state

  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-r from-green-300 to-blue-500 p-6">
      <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-xl border-2 border-gray-200">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
          Quiz: Test your Python Knowledge
        </h2>

        {/* Quiz Content */}
        {quizStep < quizQuestions.length-1 ? (
          <>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {quizQuestions[quizStep].question}
            </h3>

            <div className="mb-6">
              {quizQuestions[quizStep].options.map((option, idx) => (
                <div key={idx} className="flex items-center mb-3">
                  <input
                    type="radio"
                    id={`quiz-answer-${idx}`}
                    name="quiz-answer"
                    value={option}
                    checked={quizAnswers[quizStep] === option}
                    onChange={handleAnswerChange}
                    className="mr-2"
                  />
                  <label htmlFor={`quiz-answer-${idx}`} className="text-lg text-gray-800">
                    {option}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handlePreviousStep}
                className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600"
                disabled={quizStep === 0}
              >
                Previous
              </button>
              <button
                onClick={handleNextStep}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
              >
                {quizStep < quizQuestions.length - 1 ? "Next" : "Finish Quiz"}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Score Display */}
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
              Quiz Completed!
            </h2>

            <p className="text-2xl text-gray-700 mb-4">
              Your score: {calculateScore()} / {quizQuestions.length}
            </p>

            <div className="mt-6">
              <button
                onClick={handleFinish}
                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
              >
                Finish
              </button>
            </div>
          </>
        )}

        {/* Cancel Quiz Button */}
        {!showScore && (
          <div className="mt-6 text-center">
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
            >
              Cancel Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
