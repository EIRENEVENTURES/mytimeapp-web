import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, Mic, MicOff, Users, Eye, DollarSign, Clock, Search, CalendarIcon, Radio } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface HostSpaceScreenProps {
  onBack: () => void;
  onCreateSpace: (data: any) => void;
}

const HostSpaceScreen = ({ onBack, onCreateSpace }: HostSpaceScreenProps) => {
  const [activeTab, setActiveTab] = useState<'host' | 'discover'>('discover');
  const [isLive, setIsLive] = useState(false);
  const [streamTime, setStreamTime] = useState(0);
  const [currentCost, setCurrentCost] = useState(0);
  const [listeners, setListeners] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [spaceTitle, setSpaceTitle] = useState("");
  const [spaceDescription, setSpaceDescription] = useState("");
  const [ratePerSecond, setRatePerSecond] = useState(1);
  const [isFreeSpace, setIsFreeSpace] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scheduleType, setScheduleType] = useState("now");
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [scheduledTime, setScheduledTime] = useState("12:00");
  const [timezone, setTimezone] = useState("UTC");

  const timezones = [
    { value: "UTC", label: "UTC (Coordinated Universal Time)" },
    { value: "America/New_York", label: "EST/EDT (Eastern Time)" },
    { value: "America/Chicago", label: "CST/CDT (Central Time)" },
    { value: "America/Denver", label: "MST/MDT (Mountain Time)" },
    { value: "America/Los_Angeles", label: "PST/PDT (Pacific Time)" },
    { value: "Europe/London", label: "GMT/BST (London)" },
    { value: "Europe/Paris", label: "CET/CEST (Paris)" },
    { value: "Asia/Tokyo", label: "JST (Tokyo)" },
    { value: "Asia/Kolkata", label: "IST (India)" },
    { value: "Australia/Sydney", label: "AEST/AEDT (Sydney)" },
  ];

  const liveSpaces = [
    { id: 1, name: "Sarah Johnson", username: "@sarah_j", initials: "SJ", title: "Morning Meditation & Mindfulness", listeners: 134, category: "Wellness", credits: 2, duration: "30 min" },
    { id: 2, name: "Mike Chen", username: "@mikechen", initials: "MC", title: "Tech Talk: AI in 2026", listeners: 312, category: "Tech", credits: 5, duration: "1h 10min" },
    { id: 3, name: "Emma Davis", username: "@emma_creates", initials: "ED", title: "Storytelling Night", listeners: 67, category: "Entertainment", credits: 0, duration: "45 min", isFree: true },
    { id: 4, name: "James Wilson", username: "@jwilson", initials: "JW", title: "Business Mastermind Q&A", listeners: 524, category: "Business", credits: 8, duration: "1h 45min" },
    { id: 5, name: "Lisa Park", username: "@lisapark", initials: "LP", title: "Music Jam Session", listeners: 201, category: "Music", credits: 1, duration: "55 min" },
    { id: 6, name: "David Brown", username: "@dbrown_fit", initials: "DB", title: "Open Mic Comedy Hour", listeners: 89, category: "Comedy", credits: 0, duration: "25 min", isFree: true },
  ];

  const filteredSpaces = liveSpaces.filter(space =>
    space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    space.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    space.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const APP_CREDIT_VALUE = 0.00033;
  const effectiveRate = isFreeSpace ? 0 : ratePerSecond;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isLive) {
      interval = setInterval(() => {
        setStreamTime(prev => prev + 1);
        setCurrentCost(prev => prev + effectiveRate);
        setListeners(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLive, effectiveRate]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartSpace = () => {
    if (scheduleType === "schedule") {
      onCreateSpace({
        title: spaceTitle || "My Space",
        description: spaceDescription,
        ratePerSecond: effectiveRate,
        isFree: isFreeSpace,
        scheduleType,
        scheduledDate,
        scheduledTime,
        timezone,
      });
      return;
    }
    setIsLive(true);
    setListeners(1);
  };

  const handleEndSpace = () => {
    setIsLive(false);
    setTimeout(() => {
      setStreamTime(0);
      setCurrentCost(0);
      setListeners(0);
    }, 3000);
  };

  return (
    <div className="mobile-container flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-foreground hover:text-foreground/80">
          <ArrowLeft size={20} />
        </Button>
        <div className="text-center">
          <h1 className="text-lg font-semibold">
            {isLive ? 'Space Live' : 'Host Space'}
          </h1>
          {isLive && (
            <Badge className="bg-spaces-orange/20 text-spaces-orange border-spaces-orange/30 mt-1">
              🎙️ LIVE
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
                ? 'text-spaces-orange border-b-2 border-spaces-orange'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('discover')}
          >
            <Eye size={16} className="inline mr-2" />
            Discover
          </button>
          <button
            className={`flex-1 py-3 px-4 font-medium transition-colors ${
              activeTab === 'host'
                ? 'text-spaces-orange border-b-2 border-spaces-orange'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('host')}
          >
            <Mic size={16} className="inline mr-2" />
            Host Space
          </button>
        </div>
      )}

      {!isLive ? (
        activeTab === 'host' ? (
          // Host Setup
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-spaces-orange/20 flex items-center justify-center mb-4 mx-auto">
                <Mic size={32} className="text-spaces-orange" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Ready to Host?</h2>
              <p className="text-muted-foreground">
                Start an audio space and connect with your audience
              </p>
            </div>

            <Card className="feature-card mb-6">
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Space Title</label>
                  <input
                    type="text"
                    value={spaceTitle}
                    onChange={(e) => setSpaceTitle(e.target.value)}
                    className="w-full p-3 bg-input border border-border rounded-lg"
                    placeholder="Give your space a catchy title..."
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <textarea
                    value={spaceDescription}
                    onChange={(e) => setSpaceDescription(e.target.value)}
                    className="w-full p-3 bg-input border border-border rounded-lg min-h-[80px] resize-none text-sm"
                    placeholder="Tell people what your space is about..."
                  />
                </div>

                {/* Free / Paid */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      id="freeSpace"
                      checked={isFreeSpace}
                      onChange={(e) => setIsFreeSpace(e.target.checked)}
                      className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary"
                    />
                    <label htmlFor="freeSpace" className="text-sm font-medium">
                      Make this space free
                    </label>
                  </div>

                  {!isFreeSpace && (
                    <>
                      <label className="text-sm font-medium mb-2 block">Rate per Second (App Credits)</label>
                      <input
                        type="number"
                        value={ratePerSecond}
                        onChange={(e) => setRatePerSecond(Math.max(0.1, parseFloat(e.target.value) || 1))}
                        min="0.1"
                        step="0.1"
                        className="w-full p-3 bg-input border border-border rounded-lg"
                        placeholder="Enter rate per second..."
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Equivalent to ${(ratePerSecond * APP_CREDIT_VALUE).toFixed(5)} per second
                      </p>
                    </>
                  )}

                  {isFreeSpace && (
                    <p className="text-sm text-chat-green">
                      ✓ This space will be free for all listeners
                    </p>
                  )}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <DollarSign size={24} className={`mx-auto mb-2 ${isFreeSpace ? 'text-chat-green' : 'text-wallet-blue'}`} />
                    <p className="text-sm font-medium">Rate per Second</p>
                    <p className={`text-lg font-bold ${isFreeSpace ? 'text-chat-green' : 'text-wallet-blue'}`}>
                      {isFreeSpace ? 'FREE' : `${ratePerSecond} Credits`}
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

            {/* Scheduling */}
            <Card className="feature-card mb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <CalendarIcon size={18} className="text-spaces-orange" />
                  <label className="text-sm font-semibold">Schedule</label>
                </div>
                <Select value={scheduleType} onValueChange={setScheduleType}>
                  <SelectTrigger className="bg-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Start Now</SelectItem>
                    <SelectItem value="schedule">Schedule for Later</SelectItem>
                  </SelectContent>
                </Select>

                {scheduleType === "schedule" && (
                  <div className="space-y-4 p-4 bg-muted rounded-lg">
                    {/* Date */}
                    <div className="space-y-2">
                      <Label>Select Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !scheduledDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon size={16} className="mr-2" />
                            {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={scheduledDate}
                            onSelect={setScheduledDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                      <Label>Select Time</Label>
                      <div className="relative">
                        <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="time"
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Timezone */}
                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger className="bg-input">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Action */}
            <div className="space-y-4">
              <Button
                onClick={handleStartSpace}
                className="w-full bg-spaces-orange hover:bg-spaces-orange/90 text-white py-4 text-lg font-semibold"
              >
                <Mic size={24} className="mr-3" />
                {scheduleType === "schedule" ? "Schedule Space" : "Start Space"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                {scheduleType === "schedule"
                  ? "Your space will be scheduled and participants will be notified"
                  : isFreeSpace
                    ? "This space is free — no charges will apply"
                    : `Billing starts immediately at ${ratePerSecond} App Credits per second`
                }
              </p>
            </div>
          </div>
        ) : (
          // Discover Tab
          <div className="flex-1 overflow-y-auto">
            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search live spaces..."
                  className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Live Count */}
            <div className="px-4 py-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-spaces-orange animate-pulse" />
              <span className="text-sm font-medium">{filteredSpaces.length} spaces are live now</span>
            </div>

            {/* Live Spaces List */}
            <div className="px-4 pb-4 space-y-3">
              {filteredSpaces.map((space) => (
                <Card key={space.id} className="feature-card cursor-pointer hover:border-spaces-orange/30 transition-colors">
                  <div className="flex gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-spaces-orange/20 text-spaces-orange font-medium text-sm">
                          {space.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-spaces-orange rounded-full border-2 border-background flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-sm truncate">{space.name}</span>
                        <Badge className="bg-spaces-orange/20 text-spaces-orange border-spaces-orange/30 text-[10px] px-1.5 py-0">
                          LIVE
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground font-medium truncate mb-1">{space.title}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users size={12} /> {space.listeners.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {space.duration}
                        </span>
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          {space.category}
                        </Badge>
                        <span className={`font-medium ${space.isFree ? 'text-chat-green' : 'text-wallet-blue'}`}>
                          {space.isFree ? 'FREE' : `${space.credits} cr/s`}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-spaces-orange hover:bg-spaces-orange/90 text-white self-center">
                      Join
                    </Button>
                  </div>
                </Card>
              ))}

              {filteredSpaces.length === 0 && (
                <div className="text-center py-12">
                  <Mic size={32} className="mx-auto text-muted-foreground mb-3" />
                  <p className="font-medium mb-1">No live spaces found</p>
                  <p className="text-sm text-muted-foreground">Try a different search or check back later</p>
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        // Live Space Interface (audio only)
        <>
          {/* Live Stats */}
          <div className="p-4 bg-spaces-orange/5 border-b border-border">
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
                  <Users size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Listeners</span>
                </div>
                <div className="text-xl font-bold">{listeners}</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <DollarSign size={16} className={isFreeSpace ? "text-chat-green" : "text-wallet-blue"} />
                  <span className="text-sm text-muted-foreground">
                    {isFreeSpace ? 'Free' : 'Earned'}
                  </span>
                </div>
                <div className={`text-xl font-bold ${isFreeSpace ? 'text-chat-green' : 'text-wallet-blue'}`}>
                  {isFreeSpace ? 'FREE' : `${currentCost.toFixed(2)}`}
                </div>
              </div>
            </div>
          </div>

          {/* Audio Visualization Area */}
          <div className="flex-1 bg-muted/30 relative flex items-center justify-center">
            <div className="text-center">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 mx-auto transition-all ${
                isMuted ? 'bg-destructive/20' : 'bg-spaces-orange/20 animate-pulse'
              }`}>
                {isMuted ? (
                  <MicOff size={48} className="text-destructive" />
                ) : (
                  <Mic size={48} className="text-spaces-orange" />
                )}
              </div>
              <p className="text-lg font-semibold">{spaceTitle || "My Space"}</p>
              {spaceDescription && (
                <p className="text-sm text-muted-foreground mt-1 max-w-[250px] mx-auto">{spaceDescription}</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">
                {isMuted ? "You're muted" : "You're speaking"}
              </p>
            </div>

            {/* Live Badge */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-spaces-orange text-white animate-pulse">
                🎙️ LIVE
              </Badge>
            </div>

            {/* Earnings */}
            <div className="absolute top-4 right-4">
              <div className="bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-border">
                <div className="text-xs text-muted-foreground">
                  {isFreeSpace ? 'Free Space' : 'Earnings'}
                </div>
                <div className={`font-mono font-bold ${isFreeSpace ? 'text-chat-green' : 'text-wallet-blue'}`}>
                  {isFreeSpace ? 'FREE' : `${currentCost.toFixed(2)} Credits`}
                </div>
              </div>
            </div>
          </div>

          {/* Controls (audio only - no camera) */}
          <div className="p-6 bg-background border-t border-border">
            <div className="flex items-center justify-center gap-6 mb-4">
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
                onClick={handleEndSpace}
                className="w-20 h-20 rounded-full bg-destructive hover:bg-destructive/90 text-white"
              >
                <Radio size={32} />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="w-16 h-16 rounded-full bg-muted"
              >
                <Users size={24} />
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {isFreeSpace
                  ? `Free space • ${listeners} listener${listeners !== 1 ? 's' : ''}`
                  : `Earning ${ratePerSecond} Credits/s • ${listeners} listener${listeners !== 1 ? 's' : ''}`
                }
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HostSpaceScreen;
