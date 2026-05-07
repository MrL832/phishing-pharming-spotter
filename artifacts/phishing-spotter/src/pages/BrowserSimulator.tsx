import React, { useState } from 'react';
import { Link } from 'wouter';
import { HUD } from '@/components/HUD';
import { browserScenarios, BrowserScenario } from '@/data/browserScenarios';
import { useGameStore } from '@/store/gameStore';
import { ExplanationModal } from '@/components/ExplanationModal';
import { CertificateModal } from '@/components/CertificateModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  ShieldAlert, 
  ArrowRight, 
  ArrowLeft, 
  RotateCw, 
  Lock, 
  Unlock,
  AlertTriangle,
  CheckCircle2,
  Globe
} from 'lucide-react';

export default function BrowserSimulator() {
  const { judgedScenarios, judgeScenario } = useGameStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [explanationModalOpen, setExplanationModalOpen] = useState(false);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    isCorrect: false,
    pointsDelta: 0,
    budgetDelta: 0,
    explanation: ''
  });

  const scenario = browserScenarios[currentIndex];
  const isJudged = !!judgedScenarios[scenario.id];
  const allScenariosJudged = browserScenarios.every(s => !!judgedScenarios[s.id]);

  const handleDecision = (decision: 'safe' | 'phishing') => {
    const result = judgeScenario(scenario.id, decision);
    setModalData(result);
    setExplanationModalOpen(true);
  };

  const nextScenario = () => {
    if (currentIndex < browserScenarios.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevScenario = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <HUD />
      
      <div className="flex-1 flex flex-col container mx-auto p-4 gap-4 max-w-5xl">
        
        {/* Browser Chrome */}
        <Card className="rounded-none border-border overflow-hidden bg-muted/30">
          <div className="flex items-center gap-2 p-2 bg-background border-b border-border">
            <div className="flex gap-1.5 px-2">
              <div className="w-3 h-3 rounded-full bg-destructive/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
            </div>
            
            <div className="flex gap-1 ml-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={prevScenario} disabled={currentIndex === 0}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={nextScenario} disabled={currentIndex === browserScenarios.length - 1}>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 flex items-center bg-card border border-border h-8 px-2 font-mono text-sm max-w-2xl">
              <button 
                onClick={() => setCertModalOpen(true)}
                className="flex items-center gap-2 hover:bg-muted/50 px-2 py-1 rounded transition-colors"
                title="View Certificate"
              >
                {scenario.isSecure ? (
                  <Lock className="h-3 w-3 text-emerald-500" />
                ) : (
                  <Unlock className="h-3 w-3 text-destructive" />
                )}
                <span className={scenario.isSecure ? "" : "text-destructive line-through decoration-destructive"}>
                  https://
                </span>
              </button>
              <span className="flex-1 truncate select-all">{scenario.url}</span>
            </div>
          </div>

          {/* Browser Content Viewport */}
          <div className="h-[60vh] bg-white text-black p-8 relative">
            <div className="max-w-md mx-auto mt-12 bg-gray-50 border border-gray-200 p-8 rounded shadow-sm text-center">
              {scenario.content.logo ? (
                <img src={scenario.content.logo} alt="Logo" className="mx-auto h-12 mb-6" />
              ) : (
                <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <h1 className="text-2xl font-bold mb-2 text-gray-800">{scenario.content.title}</h1>
              <p className="text-gray-600 mb-8">{scenario.content.description}</p>
              
              {scenario.content.hasForm && (
                <div className="space-y-4 text-left">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username / Email</label>
                    <input type="text" className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" disabled />
                  </div>
                  <button className="w-full bg-blue-600 text-white rounded p-2 font-medium hover:bg-blue-700 mt-2" disabled>
                    Sign In
                  </button>
                </div>
              )}
            </div>

            {/* Secret URL indicator to simulate the "actual" underlying request in our app */}
            <div className="absolute bottom-2 left-2 text-[10px] text-gray-400 font-mono flex items-center gap-1 opacity-50 hover:opacity-100">
              <Terminal className="h-3 w-3" />
              Resolved IP/Host: {scenario.realUrl}
            </div>
          </div>
        </Card>

        {/* Analysis Panel */}
        <Card className="p-4 border-border rounded-none bg-card/50 backdrop-blur flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-mono font-bold uppercase tracking-widest text-sm">Site Analysis</h3>
            <p className="text-xs text-muted-foreground font-mono">
              Scenario {currentIndex + 1} of {browserScenarios.length}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {isJudged ? (
              <div className={`px-4 py-2 border font-mono uppercase tracking-widest text-sm flex items-center gap-2 ${
                judgedScenarios[scenario.id] === 'safe' 
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                  : 'bg-destructive/10 text-destructive border-destructive/20'
              }`}>
                {judgedScenarios[scenario.id] === 'safe' ? <Shield className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                Marked as {judgedScenarios[scenario.id]}
              </div>
            ) : (
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleDecision('safe')}
                  className="font-mono uppercase tracking-widest bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Legitimate
                </Button>
                <Button 
                  onClick={() => handleDecision('phishing')}
                  variant="destructive"
                  className="font-mono uppercase tracking-widest"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Pharming
                </Button>
              </div>
            )}

            {allScenariosJudged && (
              <Link href="/results">
                <Button variant="outline" className="font-mono uppercase tracking-widest ml-4 group">
                  Final Report <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            )}
          </div>
        </Card>
      </div>

      <ExplanationModal 
        isOpen={explanationModalOpen} 
        onOpenChange={setExplanationModalOpen}
        isCorrect={modalData.isCorrect}
        pointsDelta={modalData.pointsDelta}
        budgetDelta={modalData.budgetDelta}
        explanation={modalData.explanation}
      />

      <CertificateModal
        isOpen={certModalOpen}
        onOpenChange={setCertModalOpen}
        certificate={scenario.certificate}
      />
    </div>
  );
}

// Need Terminal icon here
function Terminal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  )
}
