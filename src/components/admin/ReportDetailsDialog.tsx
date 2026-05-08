import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FileText, User, Calendar, AlertTriangle } from "lucide-react";

interface ReportData {
  id: number;
  type: string;
  reportedItem: string;
  reason: string;
  reporter: string;
  status: string;
  date: string;
}

interface ReportDetailsDialogProps {
  report: ReportData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReportDetailsDialog = ({ report, open, onOpenChange }: ReportDetailsDialogProps) => {
  if (!report) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Report Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/40 border border-border">
            <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">{report.reportedItem}</p>
              <Badge variant="outline" className="mt-1">{report.type}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3 border-border bg-accent/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <AlertTriangle size={14} />
                <span className="text-xs">Reason</span>
              </div>
              <p className="text-sm font-medium text-foreground">{report.reason}</p>
            </Card>
            <Card className="p-3 border-border bg-accent/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <User size={14} />
                <span className="text-xs">Reporter</span>
              </div>
              <p className="text-sm font-medium text-foreground">{report.reporter}</p>
            </Card>
            <Card className="p-3 border-border bg-accent/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Calendar size={14} />
                <span className="text-xs">Date</span>
              </div>
              <p className="text-sm font-medium text-foreground">{report.date}</p>
            </Card>
            <Card className="p-3 border-border bg-accent/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <FileText size={14} />
                <span className="text-xs">Status</span>
              </div>
              <Badge variant={
                report.status === "pending" ? "outline" :
                report.status === "reviewed" ? "default" : "secondary"
              }>
                {report.status}
              </Badge>
            </Card>
          </div>

          {report.type === "Post" && (
            <Card className="p-4 border-border bg-accent/30">
              <h4 className="text-sm font-semibold text-foreground mb-2">Reported Content Preview</h4>
              <p className="text-sm text-muted-foreground italic">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a preview of the reported post content..."
              </p>
            </Card>
          )}

          {report.type === "Comment" && (
            <Card className="p-4 border-border bg-accent/30">
              <h4 className="text-sm font-semibold text-foreground mb-2">Reported Comment</h4>
              <p className="text-sm text-muted-foreground italic">
                "This is a preview of the reported comment content..."
              </p>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDetailsDialog;
