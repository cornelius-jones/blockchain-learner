import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ xp, level }: { xp:number; level:number }) {
  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-600 to-indigo-600 text-white">
      <h1 className="text-xl font-bold">Blockchain Learner</h1>
      <nav className="flex gap-4 text-sm">
        <Link to="/">Home</Link>
        <Link to="/builder">Block Builder</Link>
        <Link to="/explorer">Explorer</Link>
        <Link to="/sandbox">Sandbox</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <div className="flex items-center gap-4">
        <div className="text-sm">Level {level}</div>
        <div className="text-sm">XP: {xp}</div>
      </div>
    </header>
  );
}