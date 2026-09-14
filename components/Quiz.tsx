"use client";

import quizData from "@/data/quiz.json";

type QuizProps = {
  categoryId: string;
  topicId: string;
  lessonId: string;
};

type Question = {
  question: string;
  options: string[];
  answer: string;
};

export default function Quiz({ categoryId, topicId, lessonId }: QuizProps) {
  const questions: Question[] =
    (quizData.quiz as any)?.[categoryId]?.[topicId]?.[lessonId] ?? [];

  function checkAnswer(option: string, answer: string) {
    alert(option === answer ? "Correct!" : "Try again");
  }

  return (
    <section>
      <h2>Quiz</h2>

      {questions.map((q) => (
        <div key={q.question}>
          <p>{q.question}</p>

          {q.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => checkAnswer(option, q.answer)}
            >
              {option}
            </button>
          ))}
        </div>
      ))}
    </section>
  );
}
