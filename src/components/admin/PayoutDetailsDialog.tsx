import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DollarSign, User, Calendar, CreditCard } from "lucide-react";

interface PayoutData {
  id: number;
  user: string;
  amount: string;
  method: string;
  status: string;
  requested: string;
}

interface PayoutDetailsDialogProps {
  payout: PayoutData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PayoutDetailsDialog = ({ payout, open, onOpenChange }: PayoutDetailsDialogProps) => {
  if (!payout) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Payout Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{payout.amount}</h3>
              <p className="text-sm text-muted-foreground">to {payout.user}</p>
              <Badge variant={
                payout.status === "pending" ? "outline" :
                payout.status === "approved" ? "default" :
                payout.status === "completed" ? "secondary" : "destructive"
              } className="mt-1">
                {payout.status}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3 border-border bg-accent/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <User size={14} />
                <span className="text-xs">Creator</span>
              </div>
              <p className="text-sm font-medium text-foreground">{payout.user}</p>
            </Card>
            <Card className="p-3 border-border bg-accent/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <CreditCard size={14} />
                <span className="text-xs">Method</span>
              </div>
              <p className="text-sm font-medium text-foreground">{payout.method}</p>
            </Card>
            <Card className="p-3 border-border bg-accent/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <DollarSign size={14} />
                <span className="text-xs">Amount</span>
              </div>
              <p className="text-sm font-medium text-foreground">{payout.amount}</p>
            </Card>
            <Card className="p-3 border-border bg-accent/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Calendar size={14} />
                <span className="text-xs">Requested</span>
              </div>
              <p className="text-sm font-medium text-foreground">{payout.requested}</p>
            </Card>
          </div>

          <Card className="p-4 border-border bg-accent/30">
            <p className="text-xs text-muted-foreground italic">
              Creator payouts are processed automatically on a weekly basis. Payments represent creator compensation for digital services provided, not a withdrawal of credits or stored funds.
            </p>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PayoutDetailsDialog;
