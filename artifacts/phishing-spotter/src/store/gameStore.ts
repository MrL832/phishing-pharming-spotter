import { create } from 'zustand';
import { emails, Email } from '../data/emails';
import { browserScenarios, BrowserScenario } from '../data/browserScenarios';

interface GameState {
  budget: number;
  points: number;
  
  judgedEmails: Record<string, 'safe' | 'phishing'>;
  judgedScenarios: Record<string, 'safe' | 'phishing'>;
  
  judgeEmail: (id: string, decision: 'safe' | 'phishing') => { isCorrect: boolean; pointsDelta: number; budgetDelta: number; explanation: string };
  judgeScenario: (id: string, decision: 'safe' | 'phishing') => { isCorrect: boolean; pointsDelta: number; budgetDelta: number; explanation: string };
  
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  budget: 500,
  points: 0,
  
  judgedEmails: {},
  judgedScenarios: {},
  
  judgeEmail: (id, decision) => {
    const state = get();
    if (state.judgedEmails[id]) {
      return { isCorrect: false, pointsDelta: 0, budgetDelta: 0, explanation: 'Already judged' };
    }
    
    const email = emails.find(e => e.id === id);
    if (!email) throw new Error('Email not found');
    
    const isActuallyPhishing = email.isPhishing;
    const isCorrect = (decision === 'phishing' && isActuallyPhishing) || (decision === 'safe' && !isActuallyPhishing);
    
    let pointsDelta = 0;
    let budgetDelta = 0;
    
    if (decision === 'safe') {
      if (isActuallyPhishing) {
        budgetDelta = -50;
        pointsDelta = -20;
      } else {
        budgetDelta = 20;
        pointsDelta = 10;
      }
    } else {
      if (isActuallyPhishing) {
        budgetDelta = 30;
        pointsDelta = 25;
      } else {
        budgetDelta = -10;
        pointsDelta = -5;
      }
    }
    
    set(state => ({
      budget: state.budget + budgetDelta,
      points: state.points + pointsDelta,
      judgedEmails: { ...state.judgedEmails, [id]: decision }
    }));
    
    return {
      isCorrect,
      pointsDelta,
      budgetDelta,
      explanation: email.explanation
    };
  },
  
  judgeScenario: (id, decision) => {
    const state = get();
    if (state.judgedScenarios[id]) {
      return { isCorrect: false, pointsDelta: 0, budgetDelta: 0, explanation: 'Already judged' };
    }
    
    const scenario = browserScenarios.find(s => s.id === id);
    if (!scenario) throw new Error('Scenario not found');
    
    const isActuallyPhishing = scenario.isPhishing;
    const isCorrect = (decision === 'phishing' && isActuallyPhishing) || (decision === 'safe' && !isActuallyPhishing);
    
    let pointsDelta = 0;
    let budgetDelta = 0;
    
    if (decision === 'safe') {
      if (isActuallyPhishing) {
        budgetDelta = -50;
        pointsDelta = -20;
      } else {
        budgetDelta = 20;
        pointsDelta = 10;
      }
    } else {
      if (isActuallyPhishing) {
        budgetDelta = 30;
        pointsDelta = 25;
      } else {
        budgetDelta = -10;
        pointsDelta = -5;
      }
    }
    
    set(state => ({
      budget: state.budget + budgetDelta,
      points: state.points + pointsDelta,
      judgedScenarios: { ...state.judgedScenarios, [id]: decision }
    }));
    
    return {
      isCorrect,
      pointsDelta,
      budgetDelta,
      explanation: scenario.explanation
    };
  },
  
  resetGame: () => set({ budget: 500, points: 0, judgedEmails: {}, judgedScenarios: {} })
}));