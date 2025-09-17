import React, { useState } from 'react';

const ALL_BADGES = [
  { id: 'Miner', title: 'Miner', desc: 'Mine your first block.' },
  { id: 'Deployer', title: 'Deployer', desc: 'Deploy your first smart contract.' },
  { id: 'Guardian', title: 'Guardian', desc: 'Prevent a simulated attack.' },
  { id: 'Scholar', title: 'Scholar', desc: 'Score 100% on a quiz.' },
  { id: 'Explorer', title: 'Explorer', desc: 'Explore 3+ blocks.' }
];

const CURRICULUM_MODULES = [
  { id: 'builder', title: 'Block Builder', prereqs: [] },
  { id: 'explorer', title: 'Block Explorer', prereqs: ['builder'] },
  { id: 'sandbox', title: 'Smart Contract Sandbox', prereqs: ['builder', 'explorer'] },
  { id: 'security', title: 'Security Puzzle', prereqs: ['sandbox'] },
  { id: 'final', title: 'Final Project', prereqs: ['security'] }
];

export default function ProfilePage({ profile }: { profile:any }) {
  const [activeTab, setActiveTab] = useState('badges');
  function isModuleUnlocked(module:any) { return profile.unlockedModules.includes(module.id); }

  return (
    <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex gap-4 mb-4">
          <button onClick={() => setActiveTab('badges')} className={`px-3 py-2 rounded ${activeTab==='badges'?'bg-indigo-600 text-white':'bg-zinc-200'}`}>Badges</button>
          <button onClick={() => setActiveTab('curriculum')} className={`px-3 py-2 rounded ${activeTab==='curriculum'?'bg-indigo-600 text-white':'bg-zinc-200'}`}>Curriculum</button>
        </div>

        {activeTab==='badges' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {ALL_BADGES.map(b => {
              const earned = profile.badges.includes(b.id);
              return (
                <div key={b.id} className={`p-4 rounded border flex flex-col items-center gap-2 ${earned?'bg-emerald-50 border-emerald-400 badge-pop':'bg-zinc-50 border-zinc-300'}`}>
                  <div className="text-2xl">{earned?'✅':'❌'}</div>
                  <div className="font-semibold text-sm text-center">{b.title}</div>
                  <div className="text-xs text-zinc-500 text-center">{b.desc}</div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab==='curriculum' && (
          <div className="flex items-center gap-8 overflow-x-auto py-2">
            {CURRICULUM_MODULES.map((m, idx) => {
              const unlocked = isModuleUnlocked(m);
              return (
                <div key={m.id} className={`flex flex-col items-center min-w-[120px] p-4 rounded relative ${unlocked?'bg-sky-50 border border-sky-400 module-unlock':'bg-zinc-50 border border-zinc-300 opacity-50'}`}>
                  <div className="font-semibold text-sm mb-2">{m.title}</div>
                  <div className="text-xs mt-1 text-zinc-500">Prereqs: {m.prereqs.length===0?'None':m.prereqs.join(', ')}</div>
                  {idx < CURRICULUM_MODULES.length - 1 && <div className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 w-12 h-[2px] bg-zinc-400"></div>}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <aside className="space-y-4">
        <section className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Profile Summary</h3>
          <div className="mt-2 text-sm">Badges earned: {profile.badges.length}/{ALL_BADGES.length}</div>
          <div className="mt-1 text-sm">Unlocked modules: {profile.unlockedModules.join(', ')}</div>
        </section>
      </aside>
    </main>
  );
}