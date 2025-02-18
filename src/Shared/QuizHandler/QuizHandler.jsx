import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../components/LoadingPage";

const QuizHandler = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: quiz = [], isPending } = useQuery({
    queryKey: ["quiz", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/quiz/${id}`);
      return res.data;
    },
  });

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle answer selection
  const handleSelect = (questionIndex, choice) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: choice });
  };

  const [timeLeft, setTimeLeft] = useState(null); // Initially null

useEffect(() => {
  if (quiz?.quizTime) {
    setTimeLeft(quiz.quizTime * 60);
  }
}, [quiz?.quizTime]);

useEffect(() => {
  if (timeLeft !== null && timeLeft > 0 && !submitted) {
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  } else if (timeLeft === 0) {
    setSubmitted(true);
  }
}, [timeLeft, submitted]);
  // Handle form submission
  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (isPending) {
    return <LoadingPage />;
  }

  const questions = quiz?.questionJson ? JSON.parse(quiz.questionJson) : [];

  // Calculate score
  const score = Object.keys(selectedAnswers).reduce((total, index) => {
    const question = questions[index];
    if (selectedAnswers[index] === question.answer) {
      return total + 1;
    }
    return total;
  }, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white fixed top-0 w-[48%]">
        <h2 className="text-3xl font-bold text-center mb-6">
          Quiz : {quiz.quizTitle}
        </h2>

        <div
          className={`text-center font-bold text-xl p-2 rounded-lg ${
            timeLeft <= 60
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-900"
          }`}
        >
          ⏳ Time Left: {Math.floor(timeLeft / 60)}:
          {timeLeft % 60 < 10 ? "0" : ""}
          {timeLeft % 60}
        </div>
      </div>

      <div className="space-y-4 mt-20">
        {questions.map((q, index) => {
          const isCorrect = selectedAnswers[index] === q.answer;
          return (
            <div
              key={index}
              className={`p-5 rounded-lg shadow-md border-2 ${
                submitted
                  ? isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                  : "border-gray-300 bg-white"
              }`}
            >
              <p className="font-semibold text-lg mb-2">
                {index + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.choices.map((choice, choiceIndex) => (
                  <label
                    key={choiceIndex}
                    className="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200"
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={choice}
                      disabled={submitted}
                      checked={selectedAnswers[index] === choice}
                      onChange={() => handleSelect(index, choice)}
                      className="w-4 h-4"
                    />
                    <span>{choice}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-6 block mx-auto hover:bg-blue-700 transition-all"
        >
          Submit Quiz
        </button>
      ) : (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold">Results</h3>
          <p className="text-lg">
            🎉 Your Score: {score} / {questions.length}
          </p>

          <div className="mt-6 space-y-4">
            {questions.map((q, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg bg-gray-50 shadow-md"
              >
                <p className="font-semibold">
                  {index + 1}. {q.question}
                </p>
                <p className="text-green-600">✅ Correct Answer: {q.answer}</p>
                <p
                  className={`mt-2 ${
                    selectedAnswers[index] === q.answer
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedAnswers[index]
                    ? `📝 Your Answer: ${selectedAnswers[index]}`
                    : "🚫 Not Answered"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizHandler;