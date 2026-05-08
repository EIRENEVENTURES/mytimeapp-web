import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Radio, Users, Eye, Coins, Clock, Mic, MicOff, Camera, CameraOff, Search, Heart, MessageCircle } from "lucide-react";

interface GoLiveScreenProps {
  onBack: () => void;
}

const GoLiveScreen = ({ onBack }: GoLiveScreenProps) => {
  const [activeTab, setActiveTab] = useState<'go-live' | 'discover'>('discover');
  const [isLive, setIsLive] = useState(false);
  const [streamTime, setStreamTime] = useState(0);
  const [currentCost, setCurrentCost] = useState(0);
  const [viewers, setViewers] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [streamTitle, setStreamTitle] = useState("My Live Stream");
  const [ratePerSecond, setRatePerSecond] = useState(1);
  const [isFreeStream, setIsFreeStream] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const liveUsers = [
    { id: 1, name: "Sarah Johnson", username: "@sarah_j", avatar: "", initials: "SJ", title: "Morning Yoga & Wellness Session", viewers: 234, category: "Health", credits: 2, duration: "45 min" },
    { id: 2, name: "Mike Chen", username: "@mikechen", avatar: "", initials: "MC", title: "Live Coding: Building a React App", viewers: 512, category: "Tech", credits: 5, duration: "1h 20min" },
    { id: 3, name: "Emma Davis", username: "@emma_creates", avatar: "", initials: "ED", title: "Watercolor Painting Tutorial", viewers: 89, category: "Art", credits: 3, duration: "30 min" },
    { id: 4, name: "James Wilson", username: "@jwilson", avatar: "", initials: "JW", title: "Business Strategy Q&A", viewers: 1024, category: "Business", credits: 10, duration: "2h 5min", isFree: true },
    { id: 5, name: "Lisa Park", username: "@lisapark", avatar: "", initials: "LP", title: "Cooking Italian Pasta from Scratch", viewers: 156, category: "Food", credits: 1, duration: "55 min" },
    { id: 6, name: "David Brown", username: "@dbrown_fit", avatar: "", initials: "DB", title: "HIIT Workout - No Equipment Needed", viewers: 378, category: "Fitness", credits: 0, duration: "25 min", isFree: true },
  ];

  const filteredLiveUsers = liveUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const APP_CREDIT_VALUE = 0.00033; // 1 App Credit = $0.00033
  const effectiveRate = isFreeStream ? 0 : ratePerSecond;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isLive) {
      interval = setInterval(() => {
        setStreamTime(prev => prev + 1);
        setCurrentCost(prev => prev + effectiveRate);
        // Simulate viewers joining/leaving
        setViewers(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartStream = () => {
    setIsLive(true);
    setViewers(1); // Start with 1 viewer
  };

  const handleEndStream = () => {
    setIsLive(false);
    // Reset for next stream
    setTimeout(() => {
      setStreamTime(0);
      setCurrentCost(0);
      setViewers(0);
    }, 3000);
  };

  return (
    <div className="mobile-container flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-foreground hover:text-foreground/80"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="text-center">
          <h1 className="text-lg font-semibold">
            {isLive ? 'Live Streaming' : 'Go Live'}
          </h1>
          {isLive && (
            <Badge className="bg-live-red/20 text-live-red border-live-red/30 mt-1">
              🔴 LIVE
            </Badge>
          )}
        </div>
      </div>

      {/* Tabs - only show when not live */}
      {!isLive && (
        <div className="flex border-b border-border">
          <button
            className={`flex-1 py-3 px-4 font-medium transition-colors ${
              activeTab === 'discover'
                ? 'text-live-red border-b-2 border-live-red'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('discover')}
          >
            <Eye size={16} className="inline mr-2" />
            Discover
          </button>
          <button
            className={`flex-1 py-3 px-4 font-medium transition-colors ${
              activeTab === 'go-live'
                ? 'text-live-red border-b-2 border-live-red'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('go-live')}
          >
            <Radio size={16} className="inline mr-2" />
            Go Live
          </button>
        </div>
      )}

      {!isLive ? (
        activeTab === 'go-live' ? (
        // Pre-Stream Setup
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-live-red/20 flex items-center justify-center mb-4 mx-auto">
              <Radio size={32} className="text-live-red" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Ready to Go Live?</h2>
            <p className="text-muted-foreground">
              Start your live stream and connect with your audience
            </p>
          </div>

          <Card className="feature-card mb-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Stream Title</label>
                <input
                  type="text"
                  value={streamTitle}
                  onChange={(e) => setStreamTitle(e.target.value)}
                  className="w-full p-3 bg-input border border-border rounded-lg"
                  placeholder="Enter your stream title..."
                />
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <input
                    type="checkbox"
                    id="freeStream"
                    checked={isFreeStream}
                    onChange={(e) => setIsFreeStream(e.target.checked)}
                    className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary"
                  />
                  <label htmlFor="freeStream" className="text-sm font-medium">
                    Make this stream free
                  </label>
                </div>
                
                {!isFreeStream && (
                  <>
                    <label className="text-sm font-medium mb-2 block">Rate per Second (App Credits)</label>
                    <input
                      type="number"
                      value={ratePerSecond}
                      onChange={(e) => setRatePerSecond(Math.max(0.1, parseFloat(e.target.value) || 1))}
                      min="0.1"
                      step="0.1"
                      className="w-full p-3 bg-input border border-border rounded-lg"
                      placeholder="Enter your rate per second..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Equivalent to ${(ratePerSecond * APP_CREDIT_VALUE).toFixed(5)} per second
                    </p>
                  </>
                )}
                
                {isFreeStream && (
                  <p className="text-sm text-chat-green">
                    ✓ This stream will be free for all viewers
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Coins size={24} className={`mx-auto mb-2 ${isFreeStream ? 'text-chat-green' : 'text-wallet-blue'}`} />
                  <p className="text-sm font-medium">Rate per Second</p>
                  <p className={`text-lg font-bold ${isFreeStream ? 'text-chat-green' : 'text-wallet-blue'}`}>
                    {isFreeStream ? 'FREE' : `${ratePerSecond} Credits`}
                  </p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Clock size={24} className="mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Billing Starts</p>
                  <p className="text-lg font-bold">Immediately</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Button
              onClick={handleStartStream}
              className="w-full bg-live-red hover:bg-live-red/90 text-white py-4 text-lg font-semibold"
            >
              <Radio size={24} className="mr-3" />
              Start Live Stream
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              {isFreeStream 
                ? 'This stream is free - no charges will apply'
                : `Billing starts immediately when you go live at ${ratePerSecond} App Credits per second`
              }
            </p>
          </div>
        </div>
        ) : (
        // Discover Tab - Live Users
        <div className="flex-1 overflow-y-auto">
          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search live streams..."
                className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Live Count */}
          <div className="px-4 py-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-live-red animate-pulse" />
            <span className="text-sm font-medium">{filteredLiveUsers.length} users are live now</span>
          </div>

          {/* Live Users List */}
          <div className="px-4 pb-4 space-y-3">
            {filteredLiveUsers.map((user) => (
              <Card key={user.id} className="feature-card cursor-pointer hover:border-live-red/30 transition-colors">
                <div className="flex gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-live-red/20 text-live-red font-medium text-sm">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-live-red rounded-full border-2 border-background flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-sm truncate">{user.name}</span>
                      <Badge className="bg-live-red/20 text-live-red border-live-red/30 text-[10px] px-1.5 py-0">
                        LIVE
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground font-medium truncate mb-1">{user.title}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye size={12} /> {user.viewers.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {user.duration}
                      </span>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        {user.category}
                      </Badge>
                      <span className={`font-medium ${user.isFree ? 'text-chat-green' : 'text-wallet-blue'}`}>
                        {user.isFree ? 'FREE' : `${user.credits} cr/s`}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-live-red hover:bg-live-red/90 text-white self-center">
                    Watch
                  </Button>
                </div>
              </Card>
            ))}

            {filteredLiveUsers.length === 0 && (
              <div className="text-center py-12">
                <Eye size={32} className="mx-auto text-muted-foreground mb-3" />
                <p className="font-medium mb-1">No live streams found</p>
                <p className="text-sm text-muted-foreground">Try a different search or check back later</p>
              </div>
            )}
          </div>
        </div>
        )
      ) : (
        // Live Streaming Interface
        <>
          {/* Live Stats Header */}
          <div className="p-4 bg-live-red/5 border-b border-border">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Duration</span>
                </div>
                <div className="text-xl font-bold font-mono">{formatTime(streamTime)}</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Eye size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Viewers</span>
                </div>
                <div className="text-xl font-bold">{viewers}</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Coins size={16} className={isFreeStream ? "text-chat-green" : "text-wallet-blue"} />
                  <span className="text-sm text-muted-foreground">
                    {isFreeStream ? 'Free Stream' : 'Earned'}
                  </span>
                </div>
                <div className={`text-xl font-bold ${isFreeStream ? 'text-chat-green' : 'text-wallet-blue'}`}>
                  {isFreeStream ? 'FREE' : `${currentCost.toFixed(2)} Credits`}
                </div>
              </div>
            </div>
          </div>

          {/* Video Preview Area */}
          <div className="flex-1 bg-black relative">
            <div className="w-full h-full flex items-center justify-center">
              {isCameraOn ? (
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <span className="text-3xl font-semibold text-white">AC</span>
                  </div>
                  <p className="text-white text-lg font-medium">{streamTitle}</p>
                  <p className="text-white/70">You're live!</p>
                </div>
              ) : (
                <div className="text-center">
                  <Camera size={64} className="text-white/40 mb-4 mx-auto" />
                  <p className="text-white/70">Camera is off</p>
                </div>
              )}
            </div>

            {/* Live Indicator */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-live-red text-white animate-pulse">
                🔴 LIVE
              </Badge>
            </div>

            {/* Real-time Cost Counter */}
            <div className="absolute top-4 right-4">
              <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="text-white/80 text-xs">
                  {isFreeStream ? 'Free Stream' : 'Live Earnings'}
                </div>
                <div className={`font-mono font-bold ${isFreeStream ? 'text-chat-green' : 'text-wallet-blue'}`}>
                  {isFreeStream ? 'FREE' : `${currentCost.toFixed(2)} Credits`}
                </div>
              </div>
            </div>
          </div>

          {/* Stream Controls */}
          <div className="p-6 bg-background border-t border-border">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsMuted(!isMuted)}
                className={`w-16 h-16 rounded-full ${
                  isMuted ? 'bg-destructive/20 text-destructive' : 'bg-muted'
                }`}
              >
                {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
              </Button>
              
              <Button
                onClick={handleEndStream}
                className="w-20 h-20 rounded-full bg-destructive hover:bg-destructive/90 text-white"
              >
                <Radio size={32} />
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={`w-16 h-16 rounded-full ${
                  !isCameraOn ? 'bg-destructive/20 text-destructive' : 'bg-muted'
                }`}
              >
                {isCameraOn ? <Camera size={24} /> : <CameraOff size={24} />}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {isFreeStream 
                  ? `Free stream • ${viewers} viewer${viewers !== 1 ? 's' : ''} watching`
                  : `Earning ${ratePerSecond} Credits per second • ${viewers} viewer${viewers !== 1 ? 's' : ''} watching`
                }
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GoLiveScreen;