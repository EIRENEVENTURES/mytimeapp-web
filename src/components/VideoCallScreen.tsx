import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft, Video, VideoOff, Mic, MicOff, PhoneOff, Camera, CameraOff, MoreVertical, Share, MessageCircle, Hand, Pause } from "lucide-react";
import PausedSessionOverlay from "./PausedSessionOverlay";

const VideoCallScreen = ({ 
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
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
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
    <div className="mobile-container flex flex-col h-screen bg-black relative">
      <PausedSessionOverlay
        isVisible={isPaused && callStatus === 'connected'}
        reason={pauseReason}
        sessionType="video_call"
        sessionTime={formatTime(callTime)}
        sessionCost={`${callCost.toFixed(3)} Credits`}
        onResume={handleResumeCall}
        onEndSession={handleEndCall}
        onAddCredits={() => onCallAction('add-credits')}
      />
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-white hover:text-white/80"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="text-center">
          <p className="text-sm text-white/80">
            {callStatus === 'connecting' ? 'Connecting...' : 
             callStatus === 'connected' ? 'Video Call' : 'Call Ended'}
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

      {/* Video Area */}
      <div className="flex-1 relative">
        {/* Remote Video */}
        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
          {isVideoOn ? (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-3xl font-semibold text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                {callStatus === 'connecting' && (
                  <p className="text-white/80 animate-pulse">Connecting video...</p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <VideoOff size={48} className="text-white/60 mb-4" />
              <p className="text-white/80">{user.name}'s camera is off</p>
            </div>
          )}
        </div>

        {/* Local Video (Picture in Picture) */}
        <div className="absolute top-20 right-4 w-24 h-32 bg-gray-800 rounded-lg overflow-hidden border-2 border-white/20">
          {isCameraOn ? (
            <div className="w-full h-full bg-gradient-to-br from-primary/40 to-primary/20 flex items-center justify-center">
              <Camera size={16} className="text-white/60" />
            </div>
          ) : (
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <CameraOff size={16} className="text-white/60" />
            </div>
          )}
        </div>

        {/* User Info Overlay */}
        <div className="absolute bottom-24 left-4 right-4">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
            <h2 className="text-white font-semibold">{user.name}</h2>
            <p className="text-white/80 text-sm">@{user.username} • {numericRate} Credits/sec</p>
            {callStatus === 'ended' && (
              <p className="text-white/80 text-sm mt-1">
                Call ended • Duration: {formatTime(callTime)}
              </p>
            )}
            {isHandRaised && callStatus === 'connected' && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-primary text-lg animate-pulse">✋</span>
                <p className="text-primary text-sm font-medium">
                  Your hand is raised
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setIsMuted(!isMuted)}
            className={`w-16 h-16 rounded-full ${
              isMuted ? 'bg-destructive/80 text-white' : 'bg-white/20 text-white'
            }`}
            disabled={callStatus !== 'connected'}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            onClick={handlePauseCall}
            className="w-16 h-16 rounded-full bg-white/20 text-white hover:bg-white/30"
            disabled={callStatus !== 'connected'}
          >
            <Pause size={24} />
          </Button>

          <Button
            onClick={handleEndCall}
            className="w-20 h-20 rounded-full bg-destructive hover:bg-destructive/90 text-white"
            disabled={callStatus === 'ended'}
          >
            <PhoneOff size={32} />
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setIsCameraOn(!isCameraOn)}
            className={`w-16 h-16 rounded-full ${
              !isCameraOn ? 'bg-destructive/80 text-white' : 'bg-white/20 text-white'
            }`}
            disabled={callStatus !== 'connected'}
          >
            {isCameraOn ? <Camera size={24} /> : <CameraOff size={24} />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="lg"
                className="w-16 h-16 rounded-full bg-white/20 text-white hover:bg-white/30"
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
      </div>
    </div>
  );
};

export default VideoCallScreen;