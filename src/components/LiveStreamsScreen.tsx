import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Radio, Eye, Clock, Calendar, Play, Pause } from "lucide-react";

const LiveStreamsScreen = ({ onBack, onNavigate, initialTab = 'discover' }: { onBack: () => void; onNavigate: (screen: string) => void; initialTab?: 'discover' | 'my-streams' }) => {
  const [activeTab, setActiveTab] = useState<'discover' | 'my-streams'>(initialTab);
  const liveStreams = [
    {
      id: 1,
      title: "Exclusive Business Webinar - Marketing Strategies",
      streamer: "@streamer_pro",
      viewers: 1,
      credits: 10,
      category: "Business",
      quality: "AUTO",
      status: "LIVE"
    }
  ];

  const myStreams = [
    {
      id: 1,
      title: "My Business Consultation Stream",
      scheduledFor: "Today, 3:00 PM",
      duration: "45 min",
      credits: 15,
      category: "Business",
      status: "SCHEDULED",
      viewers: 0
    },
    {
      id: 2,
      title: "Weekly Q&A Session",
      scheduledFor: "Yesterday, 2:00 PM",
      duration: "60 min",
      credits: 25,
      category: "General",
      status: "ENDED",
      viewers: 8,
      earnings: "$12.50"
    }
  ];

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
          <h1 className="text-xl font-semibold">Live Streams</h1>
        </div>
        <Button
          size="sm"
          className="bg-live-red hover:bg-live-red/90 text-white rounded-full"
          onClick={() => onNavigate("live")}
        >
          <Radio size={16} className="mr-2" />
          Go Live
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        <button 
          className={`flex-1 py-3 px-4 font-medium transition-colors ${
            activeTab === 'discover' 
              ? 'text-streams-purple border-b-2 border-streams-purple' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('discover')}
        >
          Discover
        </button>
        <button 
          className={`flex-1 py-3 px-4 font-medium transition-colors ${
            activeTab === 'my-streams' 
              ? 'text-streams-purple border-b-2 border-streams-purple' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('my-streams')}
        >
          My Streams
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {activeTab === 'discover' ? (
          // Discover Tab Content
          <>
            {liveStreams.map((stream) => (
              <Card key={stream.id} className="feature-card">
                <div className="space-y-3">
                  {/* Stream Header */}
                  <div className="flex items-center justify-between">
                    <Badge className="bg-live-red/20 text-live-red border-live-red/30">
                      🔴 LIVE
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye size={16} />
                      {stream.viewers}
                    </div>
                  </div>

                  {/* Stream Info */}
                  <div>
                    <h3 className="font-semibold text-lg leading-tight mb-2">
                      {stream.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{stream.streamer}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Badge variant="secondary" className="text-xs">
                        {stream.category}
                      </Badge>
                      <span className="text-wallet-blue font-medium">
                        💰{stream.credits} credits/sec
                      </span>
                      <span className="text-muted-foreground">
                        Quality: {stream.quality}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </>
        ) : (
          // My Streams Tab Content
          <>
            {myStreams.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-streams-purple/20 flex items-center justify-center mb-4 mx-auto">
                  <Radio size={24} className="text-streams-purple" />
                </div>
                <h3 className="font-semibold mb-2">No streams yet</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Start your first live stream to connect with your audience
                </p>
                <Button 
                  className="bg-live-red hover:bg-live-red/90 text-white"
                  onClick={() => onNavigate("live-from-my-streams")}
                >
                  <Radio size={16} className="mr-2" />
                  Go Live Now
                </Button>
              </div>
            ) : (
              myStreams.map((stream) => (
                <Card key={stream.id} className="feature-card">
                  <div className="space-y-3">
                    {/* Stream Header */}
                    <div className="flex items-center justify-between">
                      <Badge 
                        className={
                          stream.status === 'SCHEDULED' 
                            ? "bg-wallet-blue/20 text-wallet-blue border-wallet-blue/30"
                            : stream.status === 'LIVE'
                            ? "bg-live-red/20 text-live-red border-live-red/30"
                            : "bg-muted text-muted-foreground border-border"
                        }
                      >
                        {stream.status === 'SCHEDULED' && <Calendar size={12} className="mr-1" />}
                        {stream.status === 'LIVE' && '🔴'}
                        {stream.status === 'ENDED' && <Clock size={12} className="mr-1" />}
                        {stream.status}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Eye size={16} />
                        {stream.viewers}
                      </div>
                    </div>

                    {/* Stream Info */}
                    <div>
                      <h3 className="font-semibold text-lg leading-tight mb-2">
                        {stream.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <span>{stream.scheduledFor}</span>
                        <span>•</span>
                        <span>{stream.duration}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Badge variant="secondary" className="text-xs">
                          {stream.category}
                        </Badge>
                        <span className="text-wallet-blue font-medium">
                          💰{stream.credits} credits/sec
                        </span>
                        {stream.earnings && (
                          <span className="text-chat-green font-medium">
                            Earned: {stream.earnings}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stream Actions */}
                    <div className="flex gap-2 pt-2">
                      {stream.status === 'SCHEDULED' && (
                        <>
                          <Button 
                            size="sm" 
                            className="bg-live-red hover:bg-live-red/90 text-white"
                            onClick={() => onNavigate("live-from-my-streams")}
                          >
                            <Play size={16} className="mr-2" />
                            Start Stream
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onNavigate("live-from-my-streams")}
                          >
                            Edit
                          </Button>
                        </>
                      )}
                      {stream.status === 'LIVE' && (
                        <Button size="sm" variant="destructive">
                          <Pause size={16} className="mr-2" />
                          End Stream
                        </Button>
                      )}
                      {stream.status === 'ENDED' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onNavigate("stream-analytics")}
                        >
                          View Analytics
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LiveStreamsScreen;