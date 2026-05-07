import React from 'react';
import { ShieldAlert, ShieldCheck, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ExplanationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isCorrect: boolean;
  pointsDelta: number;
  budgetDelta: number;
  explanation: string;
}

export function ExplanationModal({
  isOpen,
  onOpenChange,
  isCorrect,
  pointsDelta,
  budgetDelta,
  explanation
}: ExplanationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-[425px] border ${isCorrect ? 'border-emerald-500/50' : 'border-destructive/50'} bg-card/95 backdrop-blur`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isCorrect ? (
              <>
                <ShieldCheck className="h-6 w-6 text-emerald-500" />
                <span className="text-emerald-500 uppercase tracking-widest">Threat Assessed Correctly</span>
              </>
            ) : (
              <>
                <ShieldAlert className="h-6 w-6 text-destructive" />
                <span className="text-destructive uppercase tracking-widest">Security Breach</span>
              </>
            )}
          </DialogTitle>
          <DialogDescription className="pt-4 text-foreground text-sm font-mono leading-relaxed">
            {explanation}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded border border-border">
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Budget Impact</span>
            <span className={`text-xl font-bold font-mono ${budgetDelta > 0 ? 'text-emerald-500' : 'text-destructive'}`}>
              {budgetDelta > 0 ? '+' : ''}£{budgetDelta}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded border border-border">
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Points</span>
            <span className={`text-xl font-bold font-mono ${pointsDelta > 0 ? 'text-cyan-500' : 'text-destructive'}`}>
              {pointsDelta > 0 ? '+' : ''}{pointsDelta}
            </span>
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="uppercase tracking-widest text-xs"
          >
            Acknowledge
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
