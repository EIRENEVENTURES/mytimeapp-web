import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportData {
  id: number;
  type: string;
  reportedItem: string;
  reason: string;
  reporter: string;
  status: string;
  date: string;
}

interface ReportActionDialogProps {
  report: ReportData | null;
  action: "resolve" | "dismiss" | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAction: (reportId: number, newStatus: string) => void;
}

const ReportActionDialog = ({ report, action, open, onOpenChange, onAction }: ReportActionDialogProps) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState("");

  if (!report || !action) return null;

  const isResolve = action === "resolve";

  const handleSubmit = () => {
    onAction(report.id, isResolve ? "resolved" : "dismissed");
    toast({
      title: isResolve ? "Report Resolved" : "Report Dismissed",
      description: isResolve
        ? `Report on "${report.reportedItem}" has been resolved. Action taken.`
        : `Report on "${report.reportedItem}" has been dismissed.`,
    });
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {isResolve ? "Resolve Report" : "Dismiss Report"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className={`flex items-start gap-3 p-3 rounded-lg border ${
            isResolve
              ? "bg-green-500/10 border-green-500/20"
              : "bg-destructive/10 border-destructive/20"
          }`}>
            {isResolve ? (
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-destructive mt-0.5" />
            )}
            <div>
              <p className="text-sm font-medium text-foreground">
                {isResolve
                  ? `Resolve report on "${report.reportedItem}"`
                  : `Dismiss report on "${report.reportedItem}"`}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {isResolve
                  ? "This will mark the report as resolved and take appropriate action on the content."
                  : "This will dismiss the report. No action will be taken against the reported content."}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              {isResolve ? "Action Notes" : "Reason for Dismissal"}
            </label>
            <Textarea
              placeholder={isResolve ? "Describe the action taken..." : "Why is this report being dismissed..."}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          {isResolve && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/40 border border-border">
              <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Resolving this report may result in content removal or user action depending on severity.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button
            variant={isResolve ? "default" : "destructive"}
            onClick={handleSubmit}
          >
            {isResolve ? "Resolve Report" : "Dismiss Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportActionDialog;
