import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Eye, Heart, MessageCircle, Share, DollarSign, TrendingUp, Clock, Users } from "lucide-react";

interface StoryViewer {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  viewedAt: string;
  liked: boolean;
  commented: boolean;
}

interface StoryInsightsScreenProps {
  storyData: any;
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

const StoryInsightsScreen = ({ storyData, onBack, onNavigate }: StoryInsightsScreenProps) => {
  const [activeTab, setActiveTab] = useState("viewers");

  // Mock viewers data
  const viewers: StoryViewer[] = [
    { id: "1", name: "Jordan Smith", username: "@jordansmith", viewedAt: "2 min ago", liked: true, commented: true },
    { id: "2", name: "Sarah Wilson", username: "@sarahw", viewedAt: "5 min ago", liked: true, commented: false },
    { id: "3", name: "Mike Johnson", username: "@mikej", viewedAt: "12 min ago", liked: false, commented: false },
    { id: "4", name: "Emily Davis", username: "@emilyd", viewedAt: "18 min ago", liked: true, commented: true },
    { id: "5", name: "Chris Brown", username: "@chrisb", viewedAt: "25 min ago", liked: false, commented: false },
    { id: "6", name: "Alex Turner", username: "@alext", viewedAt: "32 min ago", liked: true, commented: false },
    { id: "7", name: "Rachel Green", username: "@rachelg", viewedAt: "45 min ago", liked: false, commented: true },
    { id: "8", name: "David Lee", username: "@davidl", viewedAt: "1 hr ago", liked: true, commented: false },
  ];

  // Mock performance stats
  const stats = {
    totalViews: 156,
    uniqueViewers: 89,
    likes: 42,
    comments: 18,
    shares: 7,
    avgViewDuration: "12s",
    peakViewTime: "2:00 PM",
    creditsEarned: storyData?.monetized ? (156 * (storyData?.price || 0.05) * 0.8).toFixed(2) : "0.00",
    engagementRate: "34.2%",
    reachRate: "18.5%",
  };

  const handleViewerProfile = (viewer: StoryViewer) => {
    if (onNavigate) {
      onNavigate("user-profile", { user: viewer });
    }
  };

  return (
    <div className="mobile-container bg-background flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border bg-background">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Story Insights</h1>
          <p className="text-xs text-muted-foreground truncate">{storyData?.title || "Your Story"}</p>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Eye size={14} className="text-primary" />
            </div>
            <div className="text-lg font-bold">{stats.totalViews}</div>
            <div className="text-[10px] text-muted-foreground">Views</div>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Heart size={14} className="text-live-red" />
            </div>
            <div className="text-lg font-bold">{stats.likes}</div>
            <div className="text-[10px] text-muted-foreground">Likes</div>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <MessageCircle size={14} className="text-chat-green" />
            </div>
            <div className="text-lg font-bold">{stats.comments}</div>
            <div className="text-[10px] text-muted-foreground">Comments</div>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <DollarSign size={14} className="text-wallet-blue" />
            </div>
            <div className="text-lg font-bold">${stats.creditsEarned}</div>
            <div className="text-[10px] text-muted-foreground">Earned</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-2 mx-4 mt-4">
          <TabsTrigger value="viewers" className="gap-2">
            <Users size={14} />
            Viewers ({viewers.length})
          </TabsTrigger>
          <TabsTrigger value="performance" className="gap-2">
            <TrendingUp size={14} />
            Performance
          </TabsTrigger>
        </TabsList>

        {/* Viewers Tab */}
        <TabsContent value="viewers" className="flex-1 overflow-y-auto px-4 pb-4 mt-4">
          <div className="space-y-2">
            {viewers.map((viewer) => (
              <Card 
                key={viewer.id} 
                className="p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleViewerProfile(viewer)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={viewer.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {viewer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{viewer.name}</p>
                      <div className="flex items-center gap-1">
                        {viewer.liked && (
                          <Heart size={12} className="text-live-red fill-live-red" />
                        )}
                        {viewer.commented && (
                          <MessageCircle size={12} className="text-chat-green" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{viewer.username}</p>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={10} />
                    {viewer.viewedAt}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="flex-1 overflow-y-auto px-4 pb-4 mt-4 space-y-4">
          {/* Engagement Stats */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp size={16} className="text-primary" />
              Engagement Metrics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Engagement Rate</span>
                <span className="font-semibold text-primary">{stats.engagementRate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Reach Rate</span>
                <span className="font-semibold">{stats.reachRate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg. View Duration</span>
                <span className="font-semibold">{stats.avgViewDuration}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Peak View Time</span>
                <span className="font-semibold">{stats.peakViewTime}</span>
              </div>
            </div>
          </Card>

          {/* Audience Stats */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Users size={16} className="text-chat-green" />
              Audience Breakdown
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Views</span>
                <span className="font-semibold">{stats.totalViews}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Unique Viewers</span>
                <span className="font-semibold">{stats.uniqueViewers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Shares</span>
                <span className="font-semibold">{stats.shares}</span>
              </div>
            </div>
          </Card>

          {/* Earnings */}
          {storyData?.monetized && (
            <Card className="p-4 border-wallet-blue/30 bg-wallet-blue/5">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-wallet-blue">
                <DollarSign size={16} />
                Earnings
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Price per view</span>
                  <span className="font-semibold">{storyData.price} credits</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total views</span>
                  <span className="font-semibold">{stats.totalViews}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Platform fee (20%)</span>
                  <span className="font-semibold text-muted-foreground">
                    -${((stats.totalViews * storyData.price) * 0.2).toFixed(2)}
                  </span>
                </div>
                <div className="pt-2 border-t border-border flex justify-between items-center">
                  <span className="text-sm font-semibold">Net Earnings</span>
                  <span className="text-lg font-bold text-wallet-blue">${stats.creditsEarned}</span>
                </div>
              </div>
            </Card>
          )}

          {/* Interactions Breakdown */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Heart size={16} className="text-live-red" />
              Interactions
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-live-red/10 rounded-lg">
                <Heart size={20} className="mx-auto mb-1 text-live-red" />
                <div className="text-lg font-bold">{stats.likes}</div>
                <div className="text-xs text-muted-foreground">Likes</div>
              </div>
              <div className="p-3 bg-chat-green/10 rounded-lg">
                <MessageCircle size={20} className="mx-auto mb-1 text-chat-green" />
                <div className="text-lg font-bold">{stats.comments}</div>
                <div className="text-xs text-muted-foreground">Comments</div>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Share size={20} className="mx-auto mb-1 text-primary" />
                <div className="text-lg font-bold">{stats.shares}</div>
                <div className="text-xs text-muted-foreground">Shares</div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoryInsightsScreen;
