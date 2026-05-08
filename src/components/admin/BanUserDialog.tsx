import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: number;
  name: string;
  username: string;
  status: string;
}

interface BanUserDialogProps {
  user: UserData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBanUser: (userId: number, action: string) => void;
}

const BanUserDialog = ({ user, open, onOpenChange, onBanUser }: BanUserDialogProps) => {
  const { toast } = useToast();
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("");

  if (!user) return null;

  const isSuspended = user.status === "suspended";

  const handleSubmit = () => {
    if (isSuspended) {
      onBanUser(user.id, "unsuspend");
      toast({ title: "User Unsuspended", description: `${user.username} has been unsuspended.` });
    } else {
      if (!reason || !duration) {
        toast({ title: "Missing fields", description: "Please fill in all fields.", variant: "destructive" });
        return;
      }
      onBanUser(user.id, "suspend");
      toast({ title: "User Suspended", description: `${user.username} has been suspended.` });
    }
    setReason("");
    setDuration("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {isSuspended ? "Unsuspend User" : "Suspend User"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {isSuspended
                  ? `You are about to unsuspend ${user.name} (${user.username}).`
                  : `You are about to suspend ${user.name} (${user.username}).`}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {isSuspended
                  ? "This will restore the user's access to the platform."
                  : "This will restrict the user's access to the platform."}
              </p>
            </div>
          </div>

          {!isSuspended && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Duration</label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24 Hours</SelectItem>
                    <SelectItem value="7d">7 Days</SelectItem>
                    <SelectItem value="30d">30 Days</SelectItem>
                    <SelectItem value="permanent">Permanent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Reason</label>
                <Textarea
                  placeholder="Provide a reason for the suspension..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button
            variant={isSuspended ? "default" : "destructive"}
            onClick={handleSubmit}
          >
            {isSuspended ? "Unsuspend User" : "Suspend User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BanUserDialog;
