import React, { useState } from 'react';

export default function SmartContractSandbox({ onComplete }: any) {
  const [code, setCode] = useState('');
  const [deployed, setDeployed] = useState(false);

  function handleDeploy() {
    if (!code) return;
    setDeployed(true);
    onComplete(20);
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Smart Contract Sandbox</h2>
      <textarea placeholder="Write pseudo contract code..." value={code} onChange={(e)=>setCode(e.target.value)} className="border p-2 rounded w-full h-24" />
      <button onClick={handleDeploy} className={`px-4 py-2 rounded bg-indigo-600 text-white ${deployed?'opacity-50':''}`} disabled={deployed}>
        {deployed ? 'Deployed!' : 'Deploy Contract'}
      </button>
    </div>
  );
}