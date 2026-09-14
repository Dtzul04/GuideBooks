"use client";

import { useState } from "react";
import quizData from "@/data/quiz.json";

type QuizProps = {
  categoryId: string;
  topicId: string;
};

type Question = {
  question: string;
  options: string[];
  answer: string;
};

export default function Quiz({ categoryId, topicId }: QuizProps) {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const lessonIds: string[] = Object.keys(
    (quizData.quiz as any)?.[categoryId]?.[topicId] ?? {}
  );

  const questions: Question[] = selectedLessonId
    ? ((quizData.quiz as any)?.[categoryId]?.[topicId]?.[selectedLessonId] ?? [])
    : [];

  function checkAnswer(option: string, answer: string) {
    alert(option === answer ? "Correct!" : "Try again");
  }

  // Pick which quiz
  if (!selectedLessonId) {
    return (
      <section>
        <h2>Quiz</h2>
        <p>Pick a lesson:</p>
        {lessonIds.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setSelectedLessonId(id)}
          >
            {id}
          </button>
        ))}
      </section>
    );
  }

  // Show that quiz's questions
  return (
    <section>
      <h2>Quiz</h2>
      <button type="button" onClick={() => setSelectedLessonId(null)}>
        Back to list
      </button>
      <p>{selectedLessonId}</p>

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
