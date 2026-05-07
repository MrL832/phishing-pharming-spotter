import React from 'react';
import { useGameStore } from '../store/gameStore';
import { ShieldAlert, ShieldCheck, Wallet, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { emails } from '../data/emails';
import { browserScenarios } from '../data/browserScenarios';

export function HUD() {
  const { budget, points, judgedEmails, judgedScenarios } = useGameStore();

  const totalScenarios = emails.length + browserScenarios.length;
  const completedScenarios = Object.keys(judgedEmails).length + Object.keys(judgedScenarios).length;
  const progress = (completedScenarios / totalScenarios) * 100;

  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-2 text-primary font-bold tracking-tight">
          <ShieldCheck className="h-6 w-6" />
          <span className="hidden sm:inline-block uppercase tracking-widest text-sm">SysAdmin-Terminal</span>
        </div>

        <div className="flex flex-1 items-center justify-end gap-6 md:gap-8">
          <div className="flex flex-col items-end sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="text-xs uppercase text-muted-foreground tracking-widest font-mono">Progress</span>
            <div className="w-24 sm:w-32 h-2 bg-muted rounded-none overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-in-out" 
                style={{ width: `${progress}%` }} 
              />
            </div>
            <span className="text-xs font-mono">{completedScenarios}/{totalScenarios}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <Wallet className="h-4 w-4 sm:h-5 sm:w-5" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-emerald-400/70 tracking-wider hidden sm:block">Budget</span>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={budget}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono font-bold"
                  >
                    £{budget}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-2 text-cyan-400">
              <Target className="h-4 w-4 sm:h-5 sm:w-5" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-cyan-400/70 tracking-wider hidden sm:block">Points</span>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={points}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono font-bold"
                  >
                    {points}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
