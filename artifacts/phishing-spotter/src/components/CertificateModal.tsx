import React from 'react';
import { Shield, ShieldAlert, Lock, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CertificateModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  certificate: {
    issuedTo: string;
    issuedBy: string;
    valid: boolean;
  };
}

export function CertificateModal({
  isOpen,
  onOpenChange,
  certificate
}: CertificateModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] border border-border bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            {certificate.valid ? (
              <Lock className="h-5 w-5 text-emerald-500" />
            ) : (
              <ShieldAlert className="h-5 w-5 text-destructive" />
            )}
            Certificate Viewer
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4 font-mono text-sm">
          <div className="flex items-start gap-4 p-4 bg-muted/20 border border-border rounded">
            <div className="w-8 h-8 rounded bg-background flex items-center justify-center shrink-0">
              {certificate.valid ? (
                <Shield className="h-4 w-4 text-emerald-500" />
              ) : (
                <ShieldAlert className="h-4 w-4 text-destructive" />
              )}
            </div>
            <div>
              <p className="font-bold mb-1">
                {certificate.valid ? 'Connection is secure' : 'Connection is NOT secure'}
              </p>
              <p className="text-xs text-muted-foreground">
                {certificate.valid 
                  ? 'Your information (for example, passwords or credit card numbers) is private when it is sent to this site.' 
                  : 'You should not enter any sensitive information on this site (for example, passwords or credit cards), because it could be stolen by attackers.'}
              </p>
            </div>
          </div>

          <div className="grid gap-2 border border-border rounded p-4">
            <div className="grid grid-cols-3 gap-2 border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Issued to:</span>
              <span className="col-span-2 font-medium break-all">{certificate.issuedTo}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2">
              <span className="text-muted-foreground">Issued by:</span>
              <span className="col-span-2 font-medium break-all">{certificate.issuedBy}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
