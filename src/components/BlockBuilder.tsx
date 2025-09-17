import React, { useState } from 'react';

export default function BlockBuilder({ chain, mineBlock, onMined }: any) {
  const [tx, setTx] = useState('');
  const [mining, setMining] = useState(false);
  const [difficulty, setDifficulty] = useState(2);

  async function handleMine() {
    if (!tx) return;
    setMining(true);
    const block = await mineBlock([tx], difficulty);
    setMining(false);
    setTx('');
    onMined(block);
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold mb-2">Block Builder</h2>
      <input type="text" placeholder="Enter transaction data" value={tx} onChange={(e)=>setTx(e.target.value)} className="border p-2 rounded w-full" />
      <div className="flex gap-2 items-center">
        <label className="text-sm">Difficulty</label>
        <input type="range" min={1} max={4} value={difficulty} onChange={(e)=>setDifficulty(Number(e.target.value))} />
        <div className="text-xs text-zinc-500"> {difficulty}</div>
      </div>
      <button onClick={handleMine} className={`px-4 py-2 rounded bg-indigo-600 text-white ${mining?'opacity-50':''}`} disabled={mining}>
        {mining ? 'Mining...' : 'Mine Block'}
      </button>
      <div>
        <h3 className="font-semibold">Chain</h3>
        <ul className="text-sm max-h-40 overflow-y-auto">
          {chain.map((b:any,i:number) => <li key={i}>#{b.index} - {b.transactions.join(', ')}</li>)}
        </ul>
      </div>
    </div>
  );
}