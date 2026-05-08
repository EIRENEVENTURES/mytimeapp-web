import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Music, Mic, MicOff, Volume2, VolumeX, Settings } from "lucide-react";

interface Space {
  id: number;
  title: string;
  host: string;
  username: string;
  type: string;
  participants: number;
  maxParticipants: number;
  credits: number;
  status: string;
}

const JoinSpaceScreen = ({ onBack, space, onJoinSpace }: { onBack: () => void; space: Space; onJoinSpace: () => void }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOff, setIsSpeakerOff] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinSpace = () => {
    setIsJoining(true);
    // Simulate joining process
    setTimeout(() => {
      setIsJoining(false);
      onJoinSpace();
    }, 2000);
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
          <div>
            <h1 className="text-lg font-semibold">Join Space</h1>
            <p className="text-xs text-muted-foreground">Configure settings before joining</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Space Preview Card */}
        <Card className="p-4 bg-spaces-orange/5 border-spaces-orange/20">
          <div className="space-y-3">
            {/* Host Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-spaces-orange/20 flex items-center justify-center">
                <Users size={20} className="text-spaces-orange" />
              </div>
              <div>
                <div className="font-medium">{space.host}</div>
                <div className="text-sm text-muted-foreground">{space.username}</div>
              </div>
            </div>

            {/* Space Info */}
            <div>
              <h3 className="font-semibold mb-2">{space.title}</h3>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <Music size={16} className="text-spaces-orange" />
                  <span>{space.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{space.participants}/{space.maxParticipants}</span>
                </div>
                <span className="text-wallet-blue font-medium">
                  {space.credits > 0 ? `💰${space.credits} credits/sec` : "FREE"}
                </span>
              </div>
            </div>

            {/* Status */}
            <Badge className="bg-chat-green/20 text-chat-green border-chat-green/30">
              {space.status}
            </Badge>
          </div>
        </Card>

        {/* Audio Settings */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Settings size={18} className="text-spaces-orange" />
            Audio Settings
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isMuted ? <MicOff size={20} className="text-muted-foreground" /> : <Mic size={20} className="text-spaces-orange" />}
                <div>
                  <p className="font-medium">Microphone</p>
                  <p className="text-sm text-muted-foreground">
                    {isMuted ? "Muted - You won't be heard" : "Unmuted - Others can hear you"}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className={isMuted ? "border-muted text-muted-foreground" : "border-spaces-orange text-spaces-orange"}
              >
                {isMuted ? "Unmute" : "Mute"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isSpeakerOff ? <VolumeX size={20} className="text-muted-foreground" /> : <Volume2 size={20} className="text-spaces-orange" />}
                <div>
                  <p className="font-medium">Speaker</p>
                  <p className="text-sm text-muted-foreground">
                    {isSpeakerOff ? "Off - You won't hear others" : "On - You can hear others"}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSpeakerOff(!isSpeakerOff)}
                className={isSpeakerOff ? "border-muted text-muted-foreground" : "border-spaces-orange text-spaces-orange"}
              >
                {isSpeakerOff ? "Turn On" : "Turn Off"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Cost Information */}
        {space.credits > 0 && (
          <Card className="p-4 bg-wallet-blue/5 border-wallet-blue/20">
            <h3 className="font-semibold mb-2 text-wallet-blue">💰 Cost Information</h3>
            <div className="space-y-1 text-sm">
              <p>Rate: <span className="font-semibold">{space.credits} credits per second</span></p>
              <p>Estimated for 1 minute: <span className="font-semibold">{space.credits * 60} credits</span></p>
              <p>Estimated for 10 minutes: <span className="font-semibold">{space.credits * 600} credits</span></p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              You'll be charged automatically while in the space
            </p>
          </Card>
        )}

        {/* Join Button */}
        <Button 
          className="w-full bg-spaces-orange hover:bg-spaces-orange/90 text-white" 
          size="lg"
          onClick={handleJoinSpace}
          disabled={isJoining}
        >
          {isJoining ? "Joining..." : `Join "${space.title}"`}
        </Button>

        {/* Terms */}
        <div className="text-xs text-muted-foreground text-center px-4">
          By joining this space, you agree to the community guidelines and payment terms.
          {space.credits > 0 && " Charges will begin immediately upon joining."}
        </div>
      </div>
    </div>
  );
};

export default JoinSpaceScreen;