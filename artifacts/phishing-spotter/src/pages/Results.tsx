import React from 'react';
import { Link, useLocation } from 'wouter';
import { useGameStore } from '@/store/gameStore';
import { emails } from '@/data/emails';
import { browserScenarios } from '@/data/browserScenarios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, ShieldAlert, Wallet, Target, RotateCcw, FileText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Results() {
  const { budget, points, judgedEmails, judgedScenarios, resetGame } = useGameStore();
  const [, setLocation] = useLocation();

  const totalScenarios = emails.length + browserScenarios.length;
  const completedScenarios = Object.keys(judgedEmails).length + Object.keys(judgedScenarios).length;
  
  // Calculate correct vs incorrect
  let correctCount = 0;
  
  const emailResults = emails.map(email => {
    const decision = judgedEmails[email.id];
    const isCorrect = (decision === 'phishing' && email.isPhishing) || (decision === 'safe' && !email.isPhishing);
    if (isCorrect) correctCount++;
    return { ...email, decision, isCorrect };
  });

  const browserResults = browserScenarios.map(scenario => {
    const decision = judgedScenarios[scenario.id];
    const isCorrect = (decision === 'phishing' && scenario.isPhishing) || (decision === 'safe' && !scenario.isPhishing);
    if (isCorrect) correctCount++;
    return { ...scenario, decision, isCorrect };
  });

  const scorePercentage = (correctCount / totalScenarios) * 100;
  
  let grade = '';
  let gradeColor = '';
  if (scorePercentage === 100) {
    grade = 'Elite Analyst';
    gradeColor = 'text-emerald-400';
  } else if (scorePercentage >= 80) {
    grade = 'Senior Analyst';
    gradeColor = 'text-blue-400';
  } else if (scorePercentage >= 60) {
    grade = 'Junior Analyst';
    gradeColor = 'text-yellow-400';
  } else {
    grade = 'Needs Retraining';
    gradeColor = 'text-destructive';
  }

  const handlePlayAgain = () => {
    resetGame();
    setLocation('/');
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background p-4 sm:p-8">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        
        <div className="text-center space-y-4 pt-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-4">
            <FileText className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter uppercase font-mono">
            Analysis Complete
          </h1>
          <p className={`text-xl font-mono uppercase tracking-widest ${gradeColor}`}>
            Rating: {grade} ({Math.round(scorePercentage)}%)
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="bg-card border-border border bg-black/40 backdrop-blur rounded-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground font-mono">Final Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Wallet className={`h-8 w-8 ${budget >= 500 ? 'text-emerald-400' : 'text-destructive'}`} />
                <span className={`text-4xl font-bold font-mono ${budget >= 500 ? 'text-emerald-400' : 'text-destructive'}`}>
                  £{budget}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border border bg-black/40 backdrop-blur rounded-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground font-mono">Security Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Target className="h-8 w-8 text-cyan-400" />
                <span className="text-4xl font-bold font-mono text-cyan-400">
                  {points}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border rounded-none bg-black/20">
          <CardHeader>
            <CardTitle className="font-mono uppercase tracking-widest">Incident Breakdown</CardTitle>
          </CardHeader>
          <ScrollArea className="h-[400px]">
            <CardContent className="space-y-6">
              
              <div>
                <h3 className="font-bold mb-4 font-mono text-primary uppercase border-b border-border/50 pb-2">Email Inbox</h3>
                <div className="space-y-2">
                  {emailResults.map(item => (
                    <div key={item.id} className={`p-3 border font-mono text-sm flex gap-4 ${item.isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-destructive/5 border-destructive/20'}`}>
                      <div className="shrink-0 pt-1">
                        {item.isCorrect ? <ShieldCheck className="h-5 w-5 text-emerald-500" /> : <ShieldAlert className="h-5 w-5 text-destructive" />}
                      </div>
                      <div>
                        <p className="font-bold">{item.subject}</p>
                        <p className="text-muted-foreground mt-1">{item.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4 font-mono text-primary uppercase border-b border-border/50 pb-2">Browser Sessions</h3>
                <div className="space-y-2">
                  {browserResults.map(item => (
                    <div key={item.id} className={`p-3 border font-mono text-sm flex gap-4 ${item.isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-destructive/5 border-destructive/20'}`}>
                      <div className="shrink-0 pt-1">
                        {item.isCorrect ? <ShieldCheck className="h-5 w-5 text-emerald-500" /> : <ShieldAlert className="h-5 w-5 text-destructive" />}
                      </div>
                      <div>
                        <p className="font-bold">{item.url}</p>
                        <p className="text-muted-foreground mt-1">{item.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </CardContent>
          </ScrollArea>
        </Card>

        <div className="flex justify-center pb-12">
          <Button onClick={handlePlayAgain} size="lg" className="h-14 px-8 text-lg font-mono uppercase tracking-widest">
            <RotateCcw className="mr-2 h-5 w-5" /> Play Again
          </Button>
        </div>

      </div>
    </div>
  );
}
