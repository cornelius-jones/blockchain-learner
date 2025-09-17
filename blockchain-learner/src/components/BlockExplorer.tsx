import React, { useState } from 'react';

export default function BlockExplorer({ chain, onExplore }: any) {
  const [visited, setVisited] = useState<Set<number>>(new Set());

  function handleExplore(index:number) {
    const next = new Set(visited);
    next.add(index);
    setVisited(next);
    onExplore(index);
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Block Explorer</h2>
      <div className="flex gap-2 flex-wrap">
        {chain.map((b:any,i:number) => (
          <button key={i} onClick={()=>handleExplore(i)} className={`px-2 py-1 border rounded ${visited.has(i)?'bg-green-100':'bg-zinc-50'}`}>
            Explore Block #{b.index}
          </button>
        ))}
      </div>
      <p>Visited {visited.size} blocks</p>
    </div>
  );
}