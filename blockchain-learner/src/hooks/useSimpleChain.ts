import { useState, useEffect } from 'react';

async function sha256Hex(message:string) {
  const msgBuf = new TextEncoder().encode(message);
  const hashBuf = await crypto.subtle.digest('SHA-256', msgBuf);
  const hashArray = Array.from(new Uint8Array(hashBuf));
  return hashArray.map(b=>b.toString(16).padStart(2,'0')).join('');
}

export function useSimpleChain() {
  const [chain, setChain] = useState<any[]>(() => {
    const saved = localStorage.getItem('blockchain_chain');
    if (saved) return JSON.parse(saved);
    return [{ index:0, timestamp: Date.now(), transactions:['genesis'], nonce:0, prevHash:'0'.repeat(64), hash:'0'.repeat(64) }];
  });

  useEffect(() => { localStorage.setItem('blockchain_chain', JSON.stringify(chain)); }, [chain]);

  async function mineBlock(transactions:string[], difficulty=2) {
    const prev = chain[chain.length-1];
    let nonce = 0, hash='';
    const target = '0'.repeat(difficulty);
    while(true) {
      const blockString = JSON.stringify({ index: prev.index+1, prevHash: prev.hash, transactions, nonce });
      hash = await sha256Hex(blockString);
      if (hash.startsWith(target)) break;
      nonce++; if (nonce>200000) break;
    }
    const block = { index: prev.index+1, timestamp: Date.now(), transactions, nonce, prevHash: prev.hash, hash };
    setChain(c => [...c, block]);
    return block;
  }

  function resetChain() {
    setChain([{ index:0, timestamp: Date.now(), transactions:['genesis'], nonce:0, prevHash:'0'.repeat(64), hash:'0'.repeat(64) }]);
  }

  return { chain, mineBlock, resetChain };
}