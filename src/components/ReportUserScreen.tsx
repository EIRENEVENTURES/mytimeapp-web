import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Flag, AlertTriangle, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportUserScreen = ({ 
  user, 
  onBack 
}: { 
  user: { name: string; username: string; rate: number; online: boolean }; 
  onBack: () => void; 
}) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [blockAfterReport, setBlockAfterReport] = useState(true);
  const [isReporting, setIsReporting] = useState(false);
  const { toast } = useToast();

  const reportReasons = [
    { id: "harassment", label: "Harassment or bullying" },
    { id: "spam", label: "Spam or unwanted messages" },
    { id: "inappropriate", label: "Inappropriate content" },
    { id: "scam", label: "Scam or fraud" },
    { id: "impersonation", label: "Impersonation" },
    { id: "underage", label: "Underage user" },
    { id: "violence", label: "Threats or violence" },
    { id: "other", label: "Other" }
  ];

  const handleReasonToggle = (reasonId: string) => {
    setSelectedReasons(prev =>
      prev.includes(reasonId)
        ? prev.filter(id => id !== reasonId)
        : [...prev, reasonId]
    );
  };

  const handleSubmitReport = async () => {
    setIsReporting(true);
    // Simulate report submission
    setTimeout(() => {
      setIsReporting(false);
      toast({
        title: "Report Submitted",
        description: "Thank you for your report. Our team will review it within 24 hours.",
      });
      onBack();
    }, 1500);
  };

  return (
    <div className="mobile-container flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold">Report User</h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* User Info */}
        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-semibold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
        </div>

        {/* Report Reasons */}
        <div className="space-y-4">
          <h3 className="font-semibold">Why are you reporting this user?</h3>
          <div className="space-y-3">
            {reportReasons.map((reason) => (
              <div key={reason.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <Checkbox
                  id={reason.id}
                  checked={selectedReasons.includes(reason.id)}
                  onCheckedChange={() => handleReasonToggle(reason.id)}
                />
                <label htmlFor={reason.id} className="flex-1 cursor-pointer">
                  {reason.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Additional Information</label>
          <Textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="Please provide any additional details about this report..."
            className="min-h-[120px]"
          />
          <p className="text-xs text-muted-foreground">
            The more details you provide, the better we can investigate this issue.
          </p>
        </div>

        {/* Block Option */}
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="block-user"
              checked={blockAfterReport}
              onCheckedChange={(checked) => setBlockAfterReport(checked as boolean)}
            />
            <div className="flex-1">
              <label htmlFor="block-user" className="font-medium cursor-pointer flex items-center gap-2">
                <Shield size={16} className="text-destructive" />
                Block this user after reporting
              </label>
              <p className="text-sm text-muted-foreground mt-1">
                Prevent them from contacting you while we investigate
              </p>
            </div>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-primary mb-2">Safety First</h4>
              <p className="text-sm text-muted-foreground">
                If you're in immediate danger, please contact local emergency services. 
                Our moderation team typically responds within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-4 border-t border-border">
        <Button
          onClick={handleSubmitReport}
          disabled={selectedReasons.length === 0 || isReporting}
          className="w-full bg-destructive hover:bg-destructive/90"
        >
          {isReporting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting Report...
            </>
          ) : (
            <>
              <Flag size={16} className="mr-2" />
              Submit Report
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ReportUserScreen;