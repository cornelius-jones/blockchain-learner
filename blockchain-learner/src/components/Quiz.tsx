import React, { useState } from 'react';

const QUIZ = [
  { id: 'q1', q: 'What is a blockchain?', a: ['Linked blocks', 'Single database', 'Cloud server'], correct: 0 },
  { id: 'q2', q: 'What is a smart contract?', a: ['Digital code', 'Legal document', 'Database'], correct: 0 }
];

export default function Quiz({ onCorrect, onCompleteQuiz }: any) {
  const [current, setCurrent] = useState(0);
  function handleAnswer(index:number) {
    const correct = index === QUIZ[current].correct;
    if (correct) onCorrect(10);
    onCompleteQuiz(QUIZ[current].id, correct ? 100 : 0);
    setCurrent(c => c+1);
  }
  if (current >= QUIZ.length) return <div className="p-6">Quiz Completed!</div>;
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Quiz</h2>
      <div>{QUIZ[current].q}</div>
      <div className="flex flex-col gap-2">
        {QUIZ[current].a.map((ans:string, i:number) => (
          <button key={i} onClick={()=>handleAnswer(i)} className="px-4 py-2 border rounded hover:bg-indigo-100">{ans}</button>
        ))}
      </div>
    </div>
  );
}