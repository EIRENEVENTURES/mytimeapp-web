import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft, Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, MoreVertical, Share, MessageCircle, Hand, Pause, Play } from "lucide-react";
import PausedSessionOverlay from "./PausedSessionOverlay";

const VoiceCallScreen = ({ 
  user, 
  onBack,
  onEndCall,
  onCallAction
}: { 
  user: { name: string; username: string; rate: string | number; online: boolean };
  onBack: () => void;
  onEndCall: () => void;
  onCallAction: (action: string) => void;
}) => {
  const [callTime, setCallTime] = useState(0);
  const [callCost, setCallCost] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseReason, setPauseReason] = useState<"user_paused" | "credits_exhausted">("user_paused");
  const maxCredits = 500;

  // Handle both string and numeric rate formats
  const numericRate = typeof user.rate === 'string' 
    ? parseFloat(user.rate.replace(/[$\/\w]/g, '')) || 0
    : user.rate || 0;

  useEffect(() => {
    // Simulate connection after 2 seconds
    const connectionTimer = setTimeout(() => {
      setCallStatus('connected');
    }, 2000);

    return () => clearTimeout(connectionTimer);
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (callStatus === 'connected' && !isPaused) {
      interval = setInterval(() => {
        setCallTime(prev => prev + 1);
        setCallCost(prev => {
          const newCost = prev + (numericRate / 60);
          if (newCost >= maxCredits) {
            setIsPaused(true);
            setPauseReason("credits_exhausted");
            return maxCredits;
          }
          return newCost;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus, numericRate, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      onEndCall();
    }, 1000);
  };

  const handleRaiseHand = () => {
    setIsHandRaised(!isHandRaised);
  };

  const handlePauseCall = () => {
    setIsPaused(true);
    setPauseReason("user_paused");
  };

  const handleResumeCall = () => {
    setIsPaused(false);
  };

  return (
    <div className="mobile-container flex flex-col h-screen bg-gradient-to-b from-calls-green/20 to-background relative">
      <PausedSessionOverlay
        isVisible={isPaused && callStatus === 'connected'}
        reason={pauseReason}
        sessionType="voice_call"
        sessionTime={formatTime(callTime)}
        sessionCost={`${callCost.toFixed(3)} Credits`}
        onResume={handleResumeCall}
        onEndSession={handleEndCall}
        onAddCredits={() => onCallAction('add-credits')}
      />
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-foreground hover:text-foreground/80"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {callStatus === 'connecting' ? 'Connecting...' : 
             callStatus === 'connected' ? 'Voice Call' : 'Call Ended'}
          </p>
          {callStatus === 'connected' && (
            <p className="text-xs text-calls-green font-mono">
              {formatTime(callTime)} • {callCost.toFixed(3)} credits
            </p>
          )}
          {isHandRaised && callStatus === 'connected' && (
            <p className="text-xs text-primary font-medium animate-pulse">
              ✋ Hand raised
            </p>
          )}
        </div>
        <div className="w-10" />
      </div>

      {/* User Info */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <span className="text-3xl font-semibold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          {callStatus === 'connecting' && (
            <div className="absolute inset-0 rounded-full border-4 border-calls-green/30 animate-pulse"></div>
          )}
        </div>
        
        <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
        <p className="text-muted-foreground mb-2">@{user.username}</p>
        <p className="text-sm text-calls-green">{numericRate} Credits/sec</p>
        
        {callStatus === 'connecting' && (
          <p className="text-sm text-muted-foreground mt-4 animate-pulse">
            Connecting to call...
          </p>
        )}
        
        {callStatus === 'ended' && (
          <p className="text-sm text-muted-foreground mt-4">
            Call ended • Duration: {formatTime(callTime)}
          </p>
        )}

        {isHandRaised && callStatus === 'connected' && (
          <div className="mt-6 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-primary font-medium text-center">
              ✋ Your hand is raised
            </p>
            <p className="text-xs text-muted-foreground text-center mt-1">
              {user.name} can see that you want to speak
            </p>
          </div>
        )}
      </div>

      {/* Call Controls */}
      <div className="p-8">
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setIsMuted(!isMuted)}
            className={`w-16 h-16 rounded-full ${
              isMuted ? 'bg-destructive/20 text-destructive' : 'bg-muted'
            }`}
            disabled={callStatus !== 'connected'}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`w-16 h-16 rounded-full ${
              isSpeakerOn ? 'bg-calls-green/20 text-calls-green' : 'bg-muted'
            }`}
            disabled={callStatus !== 'connected'}
          >
            {isSpeakerOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={handlePauseCall}
            className="w-16 h-16 rounded-full bg-muted hover:bg-muted/80"
            disabled={callStatus !== 'connected'}
          >
            <Pause size={24} />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="lg"
                className="w-16 h-16 rounded-full bg-muted hover:bg-muted/80"
              >
                <MoreVertical size={24} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-popover border-border mb-4 z-50">
              <DropdownMenuItem onClick={() => onCallAction('share-screen')}>
                <Share size={16} className="mr-2" />
                Share screen
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onCallAction('send-message')}>
                <MessageCircle size={16} className="mr-2" />
                Send a message
              </DropdownMenuItem>
              {callStatus === 'connected' && (
                <DropdownMenuItem onClick={handleRaiseHand}>
                  <Hand size={16} className={`mr-2 ${isHandRaised ? 'text-primary' : ''}`} />
                  {isHandRaised ? 'Lower your hand' : 'Raise your hand'}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex justify-center">
          <Button
            onClick={handleEndCall}
            className="w-20 h-20 rounded-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            disabled={callStatus === 'ended'}
          >
            <PhoneOff size={32} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoiceCallScreen;