import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Users, Music, Share2, Settings, Mic } from "lucide-react";
import { useUserProfile } from "@/hooks/use-user-profile";

const CreatedSpaceScreen = ({ onBack, spaceData, onNavigate, onShare, onSettings, onStartSpace, onEndSpace }: { 
  onBack: () => void; 
  spaceData: any; 
  onNavigate: (screen: string) => void;
  onShare?: () => void;
  onSettings?: () => void;
  onStartSpace?: () => void;
  onEndSpace?: () => void;
}) => {
  const { getCurrentUserProfile } = useUserProfile();
  const currentUser = getCurrentUserProfile();
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
          <h1 className="text-xl font-semibold">Your Space</h1>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={onShare}>
            <Share2 size={16} className="mr-2" />
            Share
          </Button>
          <Button size="sm" variant="outline" onClick={onSettings}>
            <Settings size={16} />
          </Button>
        </div>
      </div>

      {/* Space Info */}
      <div className="p-4 space-y-6">
        {/* Status Card */}
        <Card className="p-4 bg-spaces-orange/10 border-spaces-orange/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-spaces-orange">Space Created Successfully!</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {spaceData?.scheduleType === "now" ? "Your space is now live" : "Your space has been scheduled"}
              </p>
            </div>
            <Badge className="bg-chat-green/20 text-chat-green border-chat-green/30">
              {spaceData?.scheduleType === "now" ? "LIVE" : "SCHEDULED"}
            </Badge>
          </div>
        </Card>

        {/* Space Details */}
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{spaceData?.title || "My Space"}</h3>
              <p className="text-muted-foreground mt-1">{spaceData?.description || "A great space for conversation"}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Music size={16} className="text-spaces-orange" />
                <span>{spaceData?.type || "audio"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>0/{spaceData?.capacity || 10} participants</span>
              </div>
            </div>

            {spaceData?.scheduleType === "schedule" && (
              <div className="bg-card/50 p-3 rounded-lg">
                <div className="text-sm">
                  <p className="font-medium">Scheduled for:</p>
                  <p className="text-muted-foreground">
                    {spaceData?.scheduledDate ? new Date(spaceData.scheduledDate).toDateString() : "Today"} at {spaceData?.scheduledTime || "12:00"} ({spaceData?.timezone || "UTC"})
                  </p>
                </div>
              </div>
            )}

            {spaceData?.credits && parseInt(spaceData.credits) > 0 && (
              <div className="flex items-center gap-2 text-wallet-blue">
                <span className="font-medium">💰 {spaceData.credits} credits entry fee</span>
              </div>
            )}
          </div>
        </Card>

        {/* Current Participants */}
        <Card className="p-4">
          <h4 className="font-medium mb-3">Participants (1)</h4>
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={currentUser.profilePicture} alt={currentUser.name} />
              <AvatarFallback className="bg-spaces-orange/20 text-spaces-orange font-medium">
                {currentUser.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">{currentUser.name} (Host)</div>
              <div className="text-sm text-muted-foreground">Space Creator</div>
            </div>
            <Button size="sm" variant="outline" className="text-spaces-orange border-spaces-orange/30">
              <Mic size={16} />
            </Button>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          {spaceData?.scheduleType === "now" ? (
            <>
              <Button 
                className="w-full bg-live-red hover:bg-live-red/90 text-white"
                onClick={onEndSpace}
              >
                End Space
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onNavigate("invite-participants")}
              >
                Invite Participants
              </Button>
            </>
          ) : (
            <>
              <Button 
                className="w-full bg-spaces-orange hover:bg-spaces-orange/90 text-white"
                onClick={onStartSpace}
              >
                Start Space Now
              </Button>
              <Button variant="outline" className="w-full">
                Edit Schedule
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onNavigate("invite-participants")}
              >
                Send Invites
              </Button>
            </>
          )}
        </div>

        {/* Space Link */}
        <Card className="p-4 bg-card/50">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Space Link</Label>
            <div className="flex gap-2">
              <Input
                value={`https://mytime.app/space/${Math.random().toString(36).substr(2, 9)}`}
                readOnly
                className="bg-background text-sm"
              />
              <Button size="sm" variant="outline">
                Copy
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreatedSpaceScreen;