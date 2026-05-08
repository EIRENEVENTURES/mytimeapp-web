import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Mic, MicOff, Volume2, VolumeX, Hand, Users, Settings, Share2 } from "lucide-react";
import { useUserProfile } from "@/hooks/use-user-profile";

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

interface Participant {
  id: number;
  name: string;
  username: string;
  isMuted: boolean;
  isSpeaking: boolean;
  isHost: boolean;
  isHandRaised?: boolean;
  profilePicture?: string;
  initials?: string;
}

const ActiveSpaceScreen = ({ onLeave, space, onSpaceSettings, onShare }: { onLeave: () => void; space: Space; onSpaceSettings: () => void; onShare: () => void }) => {
  console.log("ActiveSpaceScreen received space:", space);
  console.log("ActiveSpaceScreen onSpaceSettings function:", onSpaceSettings);
  
  const { getCurrentUserProfile } = useUserProfile();
  const currentUser = getCurrentUserProfile();
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOff, setIsSpeakerOff] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  const participants: Participant[] = [
    {
      id: 1,
      name: space.host,
      username: space.username,
      isMuted: false,
      isSpeaking: true,
      isHost: true,
      isHandRaised: false
    },
    {
      id: 2,
      name: currentUser.name,
      username: currentUser.username,
      isMuted: isMuted,
      isSpeaking: false,
      isHost: false,
      isHandRaised: isHandRaised,
      profilePicture: currentUser.profilePicture,
      initials: currentUser.initials
    }
  ];

  const handleLeaveSpace = () => {
    onLeave();
  };

  return (
    <div className="mobile-container flex flex-col h-screen bg-spaces-orange/5">
      {/* Header */}
      <div className="p-4 border-b border-border bg-background">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="font-semibold truncate">{space.title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Hosted by {space.host}</span>
              {space.credits > 0 && (
                <span className="text-wallet-blue font-medium">
                  💰{space.credits}/sec
                </span>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLeaveSpace}
            className="text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Participants Area */}
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Participants ({participants.length})</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowParticipants(!showParticipants)}
            >
              <Users size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {participants.map((participant) => (
              <Card key={participant.id} className="p-3">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="relative">
                    {participant.profilePicture || participant.initials ? (
                      <Avatar className={`w-16 h-16 ${
                        participant.isSpeaking 
                          ? 'ring-2 ring-spaces-orange' 
                          : ''
                      }`}>
                        <AvatarImage src={participant.profilePicture} alt={participant.name} />
                        <AvatarFallback className={`font-semibold ${
                          participant.isSpeaking 
                            ? 'bg-spaces-orange/20 text-spaces-orange' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {participant.initials || participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        participant.isSpeaking 
                          ? 'bg-spaces-orange/20 ring-2 ring-spaces-orange' 
                          : 'bg-muted'
                      }`}>
                        <Users size={24} className={participant.isSpeaking ? 'text-spaces-orange' : 'text-muted-foreground'} />
                      </div>
                    )}
                    {participant.isHost && (
                      <Badge className="absolute -top-1 -right-1 text-xs bg-spaces-orange text-white border-spaces-orange">
                        Host
                      </Badge>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{participant.name}</p>
                    <p className="text-xs text-muted-foreground">{participant.username}</p>
                  </div>
                   <div className="flex items-center gap-1">
                     {participant.isMuted && <MicOff size={12} className="text-muted-foreground" />}
                     {participant.isHandRaised && <Hand size={12} className="text-spaces-orange" />}
                     {participant.isSpeaking && (
                       <div className="w-2 h-2 bg-spaces-orange rounded-full animate-pulse" />
                     )}
                   </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Cost Tracker */}
        {space.credits > 0 && (
          <div className="mx-4 mb-4">
            <Card className="p-3 bg-wallet-blue/5 border-wallet-blue/20">
              <div className="flex items-center justify-between text-sm">
                <span>Session cost:</span>
                <span className="font-semibold text-wallet-blue">120 credits</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Charging {space.credits} credits/second
              </div>
            </Card>
          </div>
        )}

        {/* Controls */}
        <div className="p-4 border-t border-border bg-background">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsMuted(!isMuted)}
              className={`rounded-full p-3 ${
                isMuted 
                  ? 'border-red-500 text-red-500 hover:bg-red-50' 
                  : 'border-spaces-orange text-spaces-orange hover:bg-spaces-orange/10'
              }`}
            >
              {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsHandRaised(!isHandRaised)}
              className={`rounded-full p-3 ${
                isHandRaised
                  ? 'border-spaces-orange bg-spaces-orange text-white'
                  : 'border-spaces-orange text-spaces-orange hover:bg-spaces-orange/10'
              }`}
            >
              <Hand 
                size={24} 
                className={`transition-transform duration-200 ${
                  isHandRaised ? 'transform -translate-y-1' : ''
                }`}
              />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsSpeakerOff(!isSpeakerOff)}
              className={`rounded-full p-3 ${
                isSpeakerOff 
                  ? 'border-red-500 text-red-500 hover:bg-red-50' 
                  : 'border-spaces-orange text-spaces-orange hover:bg-spaces-orange/10'
              }`}
            >
              {isSpeakerOff ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4">
            <Button variant="ghost" size="sm" onClick={() => {
              console.log("Settings button clicked in ActiveSpaceScreen");
              onSpaceSettings();
            }}>
              <Settings size={16} className="mr-1" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" onClick={onShare}>
              <Share2 size={16} className="mr-1" />
              Share
            </Button>
          </div>

          <Button
            variant="destructive"
            className="w-full mt-4"
            onClick={handleLeaveSpace}
          >
            Leave Space
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActiveSpaceScreen;