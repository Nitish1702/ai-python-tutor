"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuiz, toggleQuiz } from "../store/quizSlice";
import { RootState } from "@/store/store";

interface QuizProps {
  previousQuizScore: number;
}

const PythonQuiz = () => {
  const dispatch = useDispatch();
  const quiz = useSelector((state: RootState) => state.quiz.quizData);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function getCustomQuiz({ previousQuizScore }: QuizProps) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `[
            "What is the result of 2 + 2 in Python?",
            "What is the syntax for defining a function in Python?",
            "Which Python keyword is used for creating a generator function?",
            "How would you define a lambda function that multiplies a number by 2 in Python?",
            "What is the keyword used to import a module in Python?",
            "What is the output of print(type([])) in Python?",
            "How do you create an empty set in Python?",
            "What is the difference between deepcopy and copy in Python?",
            "How do you handle exceptions in Python?"
          ] Modify the given set of Python questions based on a previous score of ${previousQuizScore}/10 by adjusting the difficulty level accordingly. Ensure the output follows the same structured format strictly as a list.`,
        }),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      const slicedString = data.reply.slice(
        data.reply.indexOf("[") + 1,
        data.reply.lastIndexOf("]")
      );
      const extractedList: string[] = JSON.parse(`[${slicedString}]`);
      setQuestions(extractedList);
    } catch (error) {
      console.error("Error connecting to AI:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCustomQuiz({ previousQuizScore: 7 });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // ✅ Correctly updating `answers` state before dispatching
    const updatedAnswers = { ...answers, totalquestions: questions.length.toString() };

    dispatch(toggleQuiz());
    dispatch(setQuiz(updatedAnswers));

    console.log(updatedAnswers, "Submitted Answers");
    setTimeout(() => {
      console.log(quiz, "Redux State Updated");
    }, 1000);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      {/* Dialog Box */}
      <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
        <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 shadow-2xl rounded-lg w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl space-y-6 p-8 transform transition-transform duration-500 ease-in-out">
          <h2 className="text-3xl text-white font-extrabold mb-6 text-center">
            Python Knowledge Quiz
          </h2>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white text-lg font-semibold">
                Loading quiz...
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Question Display */}
              {currentQuestion && (
                <div className="space-y-4">
                  <div className="bg-white text-gray-800 rounded-lg p-6 shadow-md">
                    <p className="text-xl font-medium">{`Q${
                      currentQuestionIndex + 1
                    }: ${currentQuestion}`}</p>

                    <input
                      type="text"
                      name={currentQuestion}
                      value={answers[currentQuestion] || ""}
                      onChange={handleChange}
                      placeholder="Your answer..."
                      className="mt-4 w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      aria-label="Answer"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handlePrevQuestion}
                  className="bg-gray-700 text-white py-2 px-4 rounded-lg focus:outline-none"
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </button>

                <div className="flex items-center">
                  <span className="text-lg font-semibold text-white">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-lg focus:outline-none"
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  Next
                </button>
              </div>

              {/* Submit Button */}
              {currentQuestionIndex === questions.length - 1 && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`w-full py-3 mt-8 ${
                    isSubmitting ? "bg-gray-400" : "bg-blue-500"
                  } text-white rounded-lg focus:outline-none transition-colors`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Quiz"}
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default PythonQuiz;
