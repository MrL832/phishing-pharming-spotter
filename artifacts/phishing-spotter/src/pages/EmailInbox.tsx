import React, { useState } from 'react';
import { Link } from 'wouter';
import { HUD } from '@/components/HUD';
import { emails, Email } from '@/data/emails';
import { useGameStore } from '@/store/gameStore';
import { ExplanationModal } from '@/components/ExplanationModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mail, Shield, AlertTriangle, ArrowRight, CheckCircle2, Inbox } from 'lucide-react';
import { format } from 'date-fns';

export default function EmailInbox() {
  const { judgedEmails, judgeEmail } = useGameStore();
  const [selectedId, setSelectedId] = useState<string>(emails[0].id);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    isCorrect: false,
    pointsDelta: 0,
    budgetDelta: 0,
    explanation: ''
  });

  const selectedEmail = emails.find(e => e.id === selectedId) || emails[0];
  const isJudged = !!judgedEmails[selectedEmail.id];
  const allEmailsJudged = emails.every(e => !!judgedEmails[e.id]);

  const handleDecision = (decision: 'safe' | 'phishing') => {
    const result = judgeEmail(selectedEmail.id, decision);
    setModalData(result);
    setModalOpen(true);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <HUD />
      
      <div className="flex-1 flex overflow-hidden container mx-auto p-4 gap-4">
        {/* Sidebar */}
        <Card className="w-1/3 flex flex-col border-border bg-card/50 backdrop-blur rounded-none border">
          <div className="p-4 border-b border-border bg-muted/20 flex items-center gap-2">
            <Inbox className="h-5 w-5 text-primary" />
            <span className="font-mono uppercase tracking-widest text-sm font-bold text-primary">Inbox Queue</span>
          </div>
          <ScrollArea className="flex-1">
            <div className="flex flex-col">
              {emails.map((email) => {
                const judgedAs = judgedEmails[email.id];
                return (
                  <button
                    key={email.id}
                    onClick={() => setSelectedId(email.id)}
                    className={`p-4 text-left border-b border-border/50 hover:bg-muted/20 transition-colors flex flex-col gap-1 relative ${
                      selectedId === email.id ? 'bg-muted/30 border-l-2 border-l-primary' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold truncate pr-2">{email.sender}</span>
                      <span className="text-[10px] font-mono text-muted-foreground shrink-0">{email.date}</span>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground truncate">{email.subject}</span>
                    
                    {judgedAs && (
                      <div className="absolute top-2 right-2 flex items-center">
                        {judgedAs === 'safe' ? (
                          <Shield className="h-4 w-4 text-emerald-500 opacity-50" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-destructive opacity-50" />
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </Card>

        {/* Main Content */}
        <Card className="flex-1 flex flex-col border-border bg-card/50 backdrop-blur rounded-none border">
          <div className="p-6 border-b border-border space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-mono font-bold">{selectedEmail.subject}</h2>
              {isJudged && (
                <div className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest flex items-center gap-1 ${
                  judgedEmails[selectedEmail.id] === 'safe' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-destructive/10 text-destructive border border-destructive/20'
                }`}>
                  {judgedEmails[selectedEmail.id] === 'safe' ? <Shield className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                  Marked as {judgedEmails[selectedEmail.id]}
                </div>
              )}
            </div>
            
            <div className="bg-background border border-border p-3 rounded text-sm font-mono flex flex-col gap-1">
              <div className="flex gap-2">
                <span className="text-muted-foreground w-12">From:</span>
                <span className="font-bold">{selectedEmail.sender}</span>
                <span className="text-muted-foreground">&lt;{selectedEmail.fromAddress}&gt;</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground w-12">Date:</span>
                <span>{selectedEmail.date}</span>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 p-6">
            <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed max-w-3xl">
              {selectedEmail.body}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border bg-muted/10 flex items-center justify-between">
            <div className="flex gap-4">
              <Button 
                onClick={() => handleDecision('safe')}
                disabled={isJudged}
                className="font-mono uppercase tracking-widest bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Mark Safe
              </Button>
              <Button 
                onClick={() => handleDecision('phishing')}
                disabled={isJudged}
                variant="destructive"
                className="font-mono uppercase tracking-widest"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Flag Threat
              </Button>
            </div>
            
            {allEmailsJudged && (
              <Link href="/browser">
                <Button variant="outline" className="font-mono uppercase tracking-widest group">
                  Next Mode: Browser <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            )}
          </div>
        </Card>
      </div>

      <ExplanationModal 
        isOpen={modalOpen} 
        onOpenChange={setModalOpen}
        isCorrect={modalData.isCorrect}
        pointsDelta={modalData.pointsDelta}
        budgetDelta={modalData.budgetDelta}
        explanation={modalData.explanation}
      />
    </div>
  );
}
