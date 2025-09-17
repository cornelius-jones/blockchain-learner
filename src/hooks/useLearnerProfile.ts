import { useState, useEffect } from 'react';

export function useLearnerProfile() {
  const defaultProfile = {
    quizzesCompleted: {} as Record<string, number>,
    unlockedModules: ['home'],
    badges: [] as string[],
    settings: {}
  };
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('learner_profile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  useEffect(() => { localStorage.setItem('learner_profile', JSON.stringify(profile)); }, [profile]);

  function completeQuiz(quizId:string, score:number) {
    setProfile(p => ({ ...p, quizzesCompleted: { ...p.quizzesCompleted, [quizId]: score } }));
  }
  function unlockModule(moduleName:string) {
    setProfile(p => p.unlockedModules.includes(moduleName) ? p : { ...p, unlockedModules: [...p.unlockedModules, moduleName] });
  }
  function awardBadge(badgeName:string) {
    setProfile(p => p.badges.includes(badgeName) ? p : { ...p, badges: [...p.badges, badgeName] });
  }
  function resetProfile() { setProfile(defaultProfile); }

  return { profile, completeQuiz, unlockModule, awardBadge, resetProfile };
}