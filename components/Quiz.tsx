"use client";

import { useState } from "react";
import quizData from "@/data/quiz.json";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const pickBtn =
  "block w-full mb-2 rounded-2xl bg-white/50 p-3 text-left font-semibold text-slate-900 shadow-md hover:bg-white/80 transition";

const backBtn =
  "mb-3 rounded-full bg-white/50 px-4 py-2 text-sm font-semibold text-slate-900 shadow-md hover:bg-white/80";

function shuffleOptions(options: string[]) {
  const shuffled = [...options];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Quiz() {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [topicId, setTopicId] = useState<string | null>(null);
  const [lessonId, setLessonId] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [questions, setQuestions] = useState<Question[]>([]);

  const quiz = quizData.quiz as Record<
    string,
    Record<string, Record<string, Question[]>>
  >;

  const categoryIds = Object.keys(quiz);
  const topicIds = categoryId ? Object.keys(quiz[categoryId] ?? {}) : [];
  const lessonIds =
    categoryId && topicId
      ? Object.keys(quiz[categoryId]?.[topicId] ?? {})
      : [];

  function openLesson(id: string) {
    if (!categoryId || !topicId) return;
    const raw = quiz[categoryId]?.[topicId]?.[id] ?? [];
    setQuestions(
      raw.map((q) => ({
        ...q,
        options: shuffleOptions(q.options),
      }))
    );
    setLessonId(id);
    setSelectedAnswers({});
  }

  function pickAnswer(questionIndex: number, option: string) {
    if (selectedAnswers[questionIndex]) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  }

  function optionClass(
    questionIndex: number,
    option: string,
    correctAnswer: string
  ) {
    const selected = selectedAnswers[questionIndex];
    if (!selected) return pickBtn;

    if (option === correctAnswer) {
      return `${pickBtn} bg-emerald-300/90 ring-2 ring-emerald-500 shadow-emerald-300/60 hover:bg-emerald-300/90`;
    }
    if (option === selected) {
      return `${pickBtn} bg-rose-300/90 ring-2 ring-rose-500 hover:bg-rose-300/90`;
    }
    return `${pickBtn} opacity-50`;
  }

  function goBack() {
    if (lessonId) {
      setLessonId(null);
      setQuestions([]);
      setSelectedAnswers({});
    } else if (topicId) {
      setTopicId(null);
    } else if (categoryId) {
      setCategoryId(null);
    }
  }

  // Questions
  if (categoryId && topicId && lessonId) {
    return (
      <section>
        <h2 className="mb-3 text-2xl font-bold text-slate-900">Quiz</h2>
        <button className={backBtn} type="button" onClick={goBack}>
          Back
        </button>
        <p className="mb-3 font-semibold text-slate-700">{lessonId}</p>

        {questions.map((q, questionIndex) => (
          <div key={q.question} className="mb-4">
            <p className="mb-2 font-medium text-slate-900">{q.question}</p>
            {q.options.map((option) => (
              <button
                className={optionClass(questionIndex, option, q.answer)}
                key={option}
                type="button"
                disabled={Boolean(selectedAnswers[questionIndex])}
                onClick={() => pickAnswer(questionIndex, option)}
              >
                {option}
              </button>
            ))}
          </div>
        ))}
      </section>
    );
  }

  // Pick lesson
  if (categoryId && topicId) {
    return (
      <section>
        <h2 className="mb-3 text-2xl font-bold text-slate-900">Quiz</h2>
        <button className={backBtn} type="button" onClick={goBack}>
          Back
        </button>
        <p className="mb-3 text-slate-700">Pick a lesson:</p>
        {lessonIds.map((id) => (
          <button
            className={pickBtn}
            key={id}
            type="button"
            onClick={() => openLesson(id)}
          >
            {id}
          </button>
        ))}
      </section>
    );
  }

  // Pick topic
  if (categoryId) {
    return (
      <section>
        <h2 className="mb-3 text-2xl font-bold text-slate-900">Quiz</h2>
        <button className={backBtn} type="button" onClick={goBack}>
          Back
        </button>
        <p className="mb-3 text-slate-700">Pick a topic:</p>
        {topicIds.map((id) => (
          <button
            className={pickBtn}
            key={id}
            type="button"
            onClick={() => setTopicId(id)}
          >
            {id}
          </button>
        ))}
      </section>
    );
  }

  // Pick category
  return (
    <section>
      <h2 className="mb-3 text-2xl font-bold text-slate-900">Quiz</h2>
      <p className="mb-3 text-slate-700">Pick a category:</p>
      {categoryIds.map((id) => (
        <button
          className={pickBtn}
          key={id}
          type="button"
          onClick={() => setCategoryId(id)}
        >
          {id}
        </button>
      ))}
    </section>
  );
}
