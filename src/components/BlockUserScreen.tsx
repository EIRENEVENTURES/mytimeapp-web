import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Shield, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BlockUserScreen = ({ 
  user, 
  onBack 
}: { 
  user: { name: string; username: string; rate: number; online: boolean }; 
  onBack: () => void; 
}) => {
  const [reason, setReason] = useState("");
  const [isBlocking, setIsBlocking] = useState(false);
  const { toast } = useToast();

  const handleBlockUser = async () => {
    setIsBlocking(true);
    // Simulate blocking user
    setTimeout(() => {
      setIsBlocking(false);
      toast({
        title: "User Blocked",
        description: `${user.name} has been blocked and can no longer contact you.`,
        variant: "destructive",
      });
      onBack();
    }, 1000);
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
          <h1 className="text-lg font-semibold">Block User</h1>
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

        {/* Warning */}
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-destructive mb-2">Warning</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Blocking this user will prevent them from:
              </p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                <li>Sending you messages</li>
                <li>Calling you (voice or video)</li>
                <li>Viewing your stories</li>
                <li>Adding you to their contacts</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Block Reason */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Reason for Blocking (Optional)</label>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Please describe why you're blocking this user..."
            className="min-h-[120px]"
          />
          <p className="text-xs text-muted-foreground">
            This information helps us improve platform safety and may be used for moderation purposes.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <h4 className="font-semibold">After Blocking</h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
              Your chat history will be preserved
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
              You can unblock them later in Settings
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
              They won't be notified about being blocked
            </li>
          </ul>
        </div>
      </div>

      {/* Block Button */}
      <div className="p-4 border-t border-border space-y-3">
        <Button
          onClick={handleBlockUser}
          disabled={isBlocking}
          variant="destructive"
          className="w-full"
        >
          {isBlocking ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Blocking User...
            </>
          ) : (
            <>
              <Shield size={16} className="mr-2" />
              Block {user.name}
            </>
          )}
        </Button>
        <Button
          onClick={onBack}
          variant="outline"
          className="w-full"
          disabled={isBlocking}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default BlockUserScreen;