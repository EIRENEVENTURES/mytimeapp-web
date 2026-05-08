import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PayoutData {
  id: number;
  user: string;
  amount: string;
  method: string;
  status: string;
  requested: string;
}

interface PayoutActionDialogProps {
  payout: PayoutData | null;
  action: "approve" | "reject" | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAction: (payoutId: number, newStatus: string) => void;
}

const PayoutActionDialog = ({ payout, action, open, onOpenChange, onAction }: PayoutActionDialogProps) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState("");

  if (!payout || !action) return null;

  const isApprove = action === "approve";

  const handleSubmit = () => {
    onAction(payout.id, isApprove ? "approved" : "rejected");
    toast({
      title: isApprove ? "Payout Approved" : "Payout Rejected",
      description: isApprove
        ? `${payout.amount} payout to ${payout.user} via ${payout.method} has been approved.`
        : `${payout.amount} payout to ${payout.user} has been rejected.`,
    });
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {isApprove ? "Approve Payout" : "Reject Payout"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className={`flex items-start gap-3 p-3 rounded-lg border ${
            isApprove
              ? "bg-green-500/10 border-green-500/20"
              : "bg-destructive/10 border-destructive/20"
          }`}>
            {isApprove ? (
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-destructive mt-0.5" />
            )}
            <div>
              <p className="text-sm font-medium text-foreground">
                {isApprove
                  ? `Approve ${payout.amount} payout to ${payout.user}`
                  : `Reject ${payout.amount} payout to ${payout.user}`}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Method: {payout.method} · Requested: {payout.requested}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              {isApprove ? "Approval Notes (optional)" : "Reason for Rejection"}
            </label>
            <Textarea
              placeholder={isApprove ? "Add any notes..." : "Provide a reason for rejection..."}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          {isApprove && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/40 border border-border">
              <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Approving this payout will queue it for processing in the next weekly payout cycle via {payout.method}.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button
            variant={isApprove ? "default" : "destructive"}
            onClick={handleSubmit}
          >
            {isApprove ? "Approve Payout" : "Reject Payout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PayoutActionDialog;
