import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Users, Send, MessageSquare, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SendInviteScreen = ({ onBack, contact, spaceData, onInviteSent }: { onBack: () => void; contact: any; spaceData: any; onInviteSent: (contact: any) => void }) => {
  const [inviteMethod, setInviteMethod] = useState("app");
  const [customMessage, setCustomMessage] = useState(
    `Hi ${contact?.name}! I'm hosting a space "${spaceData?.title || "My Space"}" and would love for you to join. Hope to see you there!`
  );
  const [includeSpaceDetails, setIncludeSpaceDetails] = useState(true);

  const handleSendInvite = () => {
    // Show success toast
    toast({
      title: "Invitation sent!",
      description: `Your invitation has been sent to ${contact?.name || "the user"}.`,
    });
    
    // Notify parent that invite was sent
    onInviteSent(contact);
    
    // Return to invite participants screen
    onBack();
  };

  return (
    <div className="mobile-container">
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
          <h1 className="text-xl font-semibold">Send Invitation</h1>
        </div>
      </div>

      {/* Recipient Info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-spaces-orange/20 flex items-center justify-center">
            <span className="font-medium text-spaces-orange">{contact?.avatar || "U"}</span>
          </div>
          <div>
            <h3 className="font-semibold">{contact?.name || "User"}</h3>
            <p className="text-sm text-muted-foreground">{contact?.username || "@user"}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Space Info */}
        <Card className="p-4 bg-spaces-orange/10 border-spaces-orange/20">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-spaces-orange" />
              <span className="font-medium text-spaces-orange">Inviting to: {spaceData?.title || "My Space"}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {spaceData?.scheduleType === "now" ? "Live now" : `Scheduled for ${spaceData?.scheduledDate ? new Date(spaceData.scheduledDate).toDateString() : "later"}`}
            </p>
          </div>
        </Card>

        {/* Invitation Method */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Send via</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={inviteMethod === "app" ? "default" : "outline"}
              onClick={() => setInviteMethod("app")}
              className="flex items-center gap-2"
            >
              <MessageSquare size={16} />
              In-App Message
            </Button>
            <Button
              variant={inviteMethod === "email" ? "default" : "outline"}
              onClick={() => setInviteMethod("email")}
              className="flex items-center gap-2"
            >
              <Mail size={16} />
              Email
            </Button>
          </div>
        </div>

        {/* Email Input (only show if email is selected) */}
        {inviteMethod === "email" && (
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              className="bg-background"
              defaultValue={contact?.email || ""}
            />
          </div>
        )}

        {/* Custom Message */}
        <div className="space-y-3">
          <Label htmlFor="message" className="text-base font-medium">Personal Message</Label>
          <Textarea
            id="message"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="bg-background min-h-[100px] resize-none"
            placeholder="Add a personal message to your invitation..."
          />
          <p className="text-sm text-muted-foreground">
            {customMessage.length}/500 characters
          </p>
        </div>

        {/* Options */}
        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Include Space Details</Label>
              <p className="text-sm text-muted-foreground">Add space description, time, and participant info</p>
            </div>
            <Switch
              checked={includeSpaceDetails}
              onCheckedChange={setIncludeSpaceDetails}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Allow Forwarding</Label>
              <p className="text-sm text-muted-foreground">Let recipient share the invite with others</p>
            </div>
            <Switch defaultChecked />
          </div>
        </Card>

        {/* Preview */}
        <Card className="p-4 bg-card/50">
          <div className="space-y-3">
            <Label className="text-base font-medium">Invitation Preview</Label>
            <div className="bg-background p-3 rounded-lg border text-sm">
              <p className="font-medium">You're invited to join a Space!</p>
              <div className="mt-2 space-y-1">
                <p>{customMessage}</p>
                {includeSpaceDetails && (
                  <div className="mt-3 pt-3 border-t border-border text-muted-foreground">
                    <p><strong>Space:</strong> {spaceData?.title || "My Space"}</p>
                    <p><strong>When:</strong> {spaceData?.scheduleType === "now" ? "Live now" : "Scheduled"}</p>
                    <p><strong>Type:</strong> {spaceData?.type || "Audio"} space</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" className="flex-1" onClick={onBack}>
            Cancel
          </Button>
          <Button
            className="flex-1 bg-spaces-orange hover:bg-spaces-orange/90 text-white"
            onClick={handleSendInvite}
          >
            <Send size={16} className="mr-2" />
            Send Invitation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SendInviteScreen;