import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProfilePage from './components/ProfilePage';
import BlockBuilder from './components/BlockBuilder';
import BlockExplorer from './components/BlockExplorer';
import SmartContractSandbox from './components/SmartContractSandbox';
import Quiz from './components/Quiz';
import { useSimpleChain } from './hooks/useSimpleChain';
import { useProgress } from './hooks/useProgress';
import { useLearnerProfile } from './hooks/useLearnerProfile';

export default function App() {
  const { chain, mineBlock, resetChain } = useSimpleChain();
  const { xp, level, addXp, resetXp } = useProgress();
  const { profile, completeQuiz, unlockModule, awardBadge, resetProfile } = useLearnerProfile();
  const [notifications, setNotifications] = useState<string[]>([]);

  function handleMined(block: any) {
    const reward = 30 + (block.transactions?.length || 0) * 5;
    addXp(reward);
    setNotifications(n => [...n, `Mined block #${block.index} — +${reward} XP`]);
    if (!profile.badges.includes('Miner')) awardBadge('Miner');
  }

  function handleExplore(index: number) {
    if (!profile.unlockedModules.includes('explorer')) unlockModule('explorer');
    addXp(10);
    setNotifications(n => [...n, `Explored block #${index} — +10 XP`]);
    if (!profile.badges.includes('Explorer')) awardBadge('Explorer');
  }

  function handleSandboxComplete(xpAward: number) {
    addXp(xpAward);
    setNotifications(n => [...n, `Deployed contract — +${xpAward} XP`]);
    if (!profile.badges.includes('Deployer')) awardBadge('Deployer');
  }

  function handleQuizCorrect(xpAward: number) { addXp(xpAward); }
  function handleCompleteQuiz(quizId: string, score: number) { completeQuiz(quizId, score); if (Object.keys(profile.quizzesCompleted || {}).length + 1 >= 3) unlockModule('sandbox'); }

  function handleResetAll() {
    if (confirm('Reset progress and chain?')) {
      resetChain(); resetXp(); resetProfile(); setNotifications([]);
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-zinc-100">
        <Header xp={xp} level={level} />
        <Routes>
          <Route path="/" element={<div className="p-6">Welcome to Blockchain Learner!<div className="mt-4"><button onClick={handleResetAll} className="px-3 py-2 bg-red-500 text-white rounded">Reset Progress</button></div></div>} />
          <Route path="/builder" element={<BlockBuilder chain={chain} mineBlock={mineBlock} onMined={handleMined} />} />
          <Route path="/explorer" element={<BlockExplorer chain={chain} onExplore={handleExplore} />} />
          <Route path="/sandbox" element={<SmartContractSandbox onComplete={handleSandboxComplete} />} />
          <Route path="/quiz" element={<Quiz onCorrect={handleQuizCorrect} onCompleteQuiz={handleCompleteQuiz} />} />
          <Route path="/profile" element={<ProfilePage profile={profile} />} />
        </Routes>
      </div>
    </Router>
  );
}