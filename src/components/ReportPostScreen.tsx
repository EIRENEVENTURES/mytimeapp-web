import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Flag, AlertTriangle, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/types/Post";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ReportPostScreen = ({ 
  post, 
  onBack 
}: { 
  post: Post;
  onBack: () => void; 
}) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [blockUser, setBlockUser] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const reportReasons = [
    {
      id: "spam",
      label: "Spam or misleading content",
      description: "Repetitive, unwanted, or deceptive content"
    },
    {
      id: "harassment",
      label: "Harassment or bullying",
      description: "Content that targets or intimidates others"
    },
    {
      id: "hate-speech",
      label: "Hate speech or discrimination",
      description: "Content promoting hatred against individuals or groups"
    },
    {
      id: "violence",
      label: "Violence or threats",
      description: "Content containing or promoting violence"
    },
    {
      id: "adult-content",
      label: "Adult or inappropriate content",
      description: "Sexual, graphic, or age-inappropriate material"
    },
    {
      id: "copyright",
      label: "Copyright infringement",
      description: "Unauthorized use of copyrighted material"
    },
    {
      id: "misinformation",
      label: "False or misleading information",
      description: "Content that spreads false information"
    },
    {
      id: "privacy",
      label: "Privacy violation",
      description: "Sharing private information without consent"
    },
    {
      id: "other",
      label: "Other",
      description: "Another reason not listed above"
    }
  ];

  const handleReasonChange = (reasonId: string, checked: boolean) => {
    if (checked) {
      setSelectedReasons([...selectedReasons, reasonId]);
    } else {
      setSelectedReasons(selectedReasons.filter(id => id !== reasonId));
    }
  };

  const handleSubmitReport = async () => {
    if (selectedReasons.length === 0) {
      toast({
        title: "Please select a reason",
        description: "You must select at least one reason for reporting this post.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Report submitted",
        description: "Thank you for helping keep our community safe. We'll review this report within 24 hours."
      });

      if (blockUser) {
        toast({
          title: "User blocked",
          description: `You have blocked ${post.author.name}. You won't see their posts anymore.`
        });
      }

      onBack();
    } catch (error) {
      toast({
        title: "Failed to submit report",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mobile-container min-h-screen bg-background px-4 py-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft size={18} />
        </Button>
        <div className="flex items-center gap-2">
          <Flag size={18} className="text-destructive" />
          <span className="font-semibold text-base">Report Post</span>
        </div>
      </div>

      {/* Post Preview */}
      <Card className="p-3 mb-4">
        <div className="flex items-start gap-2 mb-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={post.author.profilePicture} alt={post.author.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {post.author.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <span className="font-medium text-xs">{post.author.name}</span>
            <p className="text-xs text-muted-foreground">Reported Post</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-3">{post.content}</p>
      </Card>

      {/* Report Form */}
      <div className="space-y-4">
        {/* Safety Notice */}
        <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <Shield size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-xs text-amber-800 dark:text-amber-200">
              Help us keep the community safe
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5">
              Your report is anonymous and helps us maintain community standards. False reports may result in account restrictions.
            </p>
          </div>
        </div>

        {/* Reason Selection */}
        <div>
          <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
            <AlertTriangle size={16} className="text-destructive" />
            Why are you reporting this post?
          </h3>
          <div className="space-y-2">
            {reportReasons.map((reason) => (
              <div key={reason.id} className="flex items-start space-x-2 p-2 rounded-lg border hover:bg-muted/50 transition-colors">
                <Checkbox
                  id={reason.id}
                  checked={selectedReasons.includes(reason.id)}
                  onCheckedChange={(checked) => handleReasonChange(reason.id, checked as boolean)}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <label htmlFor={reason.id} className="text-xs font-medium cursor-pointer">
                    {reason.label}
                  </label>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <label htmlFor="additional-info" className="block text-xs font-medium mb-2">
            Additional Information (Optional)
          </label>
          <Textarea
            id="additional-info"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="Provide any additional context that might help us understand the issue..."
            className="min-h-[60px] resize-none text-xs"
            maxLength={500}
          />
          <div className="text-xs text-muted-foreground mt-1 text-right">
            {additionalInfo.length}/500 characters
          </div>
        </div>

        {/* Block User Option */}
        <div className="flex items-start space-x-2 p-3 border rounded-lg">
          <Checkbox
            id="block-user"
            checked={blockUser}
            onCheckedChange={(checked) => setBlockUser(checked as boolean)}
            className="mt-0.5"
          />
          <div className="flex-1 min-w-0">
            <label htmlFor="block-user" className="text-xs font-medium cursor-pointer">
              Block {post.author.name}
            </label>
            <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
              You won't see posts from this user anymore, and they won't be able to interact with your content.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <Button 
          onClick={handleSubmitReport} 
          disabled={isSubmitting}
          className="w-full h-10"
          variant="destructive"
          size="sm"
        >
          {isSubmitting ? (
            <>
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              <span className="text-sm">Submitting...</span>
            </>
          ) : (
            <>
              <Flag size={14} className="mr-2" />
              <span className="text-sm">Submit Report</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ReportPostScreen;