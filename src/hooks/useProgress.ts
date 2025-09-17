import { useState, useEffect } from 'react';

export function useProgress() {
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('blockchain_xp');
    return saved ? JSON.parse(saved) : 0;
  });

  useEffect(() => { localStorage.setItem('blockchain_xp', JSON.stringify(xp)); }, [xp]);
  const level = Math.floor(Math.sqrt(xp / 50));

  function addXp(amount:number) { setXp(x=>x+amount); }
  function resetXp() { setXp(0); }

  return { xp, level, addXp, resetXp };
}