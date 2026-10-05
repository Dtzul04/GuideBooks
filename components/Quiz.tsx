"use client";

import { useState } from "react";
import quizData from "@/data/quiz.json";
import content from "@/data/content.json";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const pickBtn =
  "block w-full mb-2 p-3 rounded-xl text-left font-semibold text-slate-900 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm hover:bg-white/60 hover:shadow-lg transition duration-300 cursor-pointer";

const backBtn =
  "mb-3 px-4 py-2 text-sm font-semibold rounded-full bg-white/40 text-slate-900 backdrop-blur-md border border-white/60 shadow-sm hover:bg-white/60 hover:shadow-lg transition duration-300 cursor-pointer";

// Returns the options in random order so the right answer isn't always in the same spot
function shuffleOptions(options: string[]) {
  const shuffled = [...options];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Turns an id like "html-css" into "Html Css" when there's no matching title
function formatId(id: string) {
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Shows the real title from content.json (e.g. "JavaScript"), or a formatted id
function getTitle(categoryId: string, topicId?: string, lessonId?: string) {
  const category = content.find((c) => c.id === categoryId);
  const topic = topicId ? category?.topics.find((t) => t.id === topicId) : undefined;
  const lesson = lessonId ? topic?.lessons.find((l) => l.id === lessonId) : undefined;

  const match = lessonId ? lesson : topicId ? topic : category;
  return match?.title ?? formatId(lessonId ?? topicId ?? categoryId);
}

// Step-by-step quiz: pick a category, then a topic, then a lesson, then answer its questions
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

  // Opens a lesson: loads its questions, shuffles each one's options, and clears old answers
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

  // Saves the chosen option for a question; once answered, it can't be changed
  function pickAnswer(questionIndex: number, option: string) {
    if (selectedAnswers[questionIndex]) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  }

  // Picks the style for an option: normal before answering, then green if correct,
  // red if it was the wrong pick, and faded for the rest
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

  // Goes back one step: questions -> lessons -> topics -> categories
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

  // A lesson is open, so show its questions
  if (categoryId && topicId && lessonId) {
    return (
      <section>
        <h2 className="mb-3 text-2xl font-bold text-slate-900">Quiz</h2>
        <button className={backBtn} type="button" onClick={goBack}>
          Back
        </button>
        <p className="mb-3 font-semibold text-slate-700">
          {getTitle(categoryId, topicId, lessonId)}
        </p>

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

  // A topic is chosen, so list its lessons
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
            {getTitle(categoryId, topicId, id)}
          </button>
        ))}
      </section>
    );
  }

  // A category is chosen, so list its topics
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
            {getTitle(categoryId, id)}
          </button>
        ))}
      </section>
    );
  }

  // Nothing chosen yet, so list the categories
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
          {getTitle(id)}
        </button>
      ))}
    </section>
  );
}
