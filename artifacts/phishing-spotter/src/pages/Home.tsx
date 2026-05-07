import React from 'react';
import { Link } from 'wouter';
import { ShieldAlert, Terminal, ArrowRight, ShieldCheck, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground selection:bg-primary/30">
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        
        {/* Background decorative elements */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at center, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>

        <div className="z-10 w-full max-w-3xl space-y-12">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-4">
              <Terminal className="h-8 w-8" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter uppercase font-mono">
              Phishing & Pharming<br/>
              <span className="text-primary">Spotter</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto font-mono">
              Welcome, Analyst. You have been assigned to monitor incoming traffic for social engineering threats and DNS poisoning attacks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card border-border border hover:border-primary/50 transition-colors bg-black/40 backdrop-blur">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 bg-blue-500/10 text-blue-500 flex items-center justify-center rounded">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-2 font-mono">Mode 1: Inbox</h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    Scan incoming emails. Identify blagging and phishing attempts. Look for false urgency, suspicious sender addresses, and malicious links.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border border hover:border-primary/50 transition-colors bg-black/40 backdrop-blur">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 bg-emerald-500/10 text-emerald-500 flex items-center justify-center rounded">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-2 font-mono">Mode 2: Browser</h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    Inspect web requests. Detect pharming attacks by verifying SSL certificates, checking for HTTPS, and spotting fake domains.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/20 border border-border p-6 rounded text-center space-y-4">
            <h4 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Your starting resources</h4>
            <div className="flex justify-center gap-8 font-mono">
              <div>
                <span className="block text-2xl font-bold text-emerald-400">£500</span>
                <span className="text-xs uppercase text-muted-foreground">Budget</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-cyan-400">0</span>
                <span className="text-xs uppercase text-muted-foreground">Points</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Making correct assessments earns points and protects the budget. Falling for attacks or flagging safe items will incur penalties.
            </p>
          </div>

          <div className="flex justify-center">
            <Link href="/email" className="inline-block">
              <Button size="lg" className="h-14 px-8 text-lg font-mono uppercase tracking-widest group">
                Begin Analysis <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
