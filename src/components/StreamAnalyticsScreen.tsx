import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Clock, DollarSign, Users, TrendingUp, Calendar } from "lucide-react";

const StreamAnalyticsScreen = ({ onBack }: { onBack: () => void }) => {
  const analyticsData = {
    streamTitle: "Weekly Q&A Session",
    totalViews: 127,
    peakViewers: 15,
    averageViewers: 8,
    duration: "60 min",
    earnings: "25,000 App Credits",
    streamDate: "Yesterday, 2:00 PM",
    engagement: "High",
    topCountries: ["United States", "Canada", "United Kingdom"],
    averageWatchTime: "35 min"
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
          <h1 className="text-xl font-semibold">Stream Analytics</h1>
        </div>
      </div>

      {/* Stream Info */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold mb-2">{analyticsData.streamTitle}</h2>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            {analyticsData.streamDate}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            {analyticsData.duration}
          </div>
          <Badge className="bg-chat-green/20 text-chat-green border-chat-green/30">
            ENDED
          </Badge>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="p-4 space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="feature-card">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-streams-purple/20 mb-3 mx-auto">
                <Eye size={24} className="text-streams-purple" />
              </div>
              <div className="text-2xl font-bold text-streams-purple">{analyticsData.totalViews}</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </div>
          </Card>

          <Card className="feature-card">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-wallet-blue/20 mb-3 mx-auto">
                <DollarSign size={24} className="text-wallet-blue" />
              </div>
              <div className="text-2xl font-bold text-wallet-blue">{analyticsData.earnings}</div>
              <div className="text-sm text-muted-foreground">Total Earnings</div>
            </div>
          </Card>

          <Card className="feature-card">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-chat-green/20 mb-3 mx-auto">
                <Users size={24} className="text-chat-green" />
              </div>
              <div className="text-2xl font-bold text-chat-green">{analyticsData.peakViewers}</div>
              <div className="text-sm text-muted-foreground">Peak Viewers</div>
            </div>
          </Card>

          <Card className="feature-card">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-live-red/20 mb-3 mx-auto">
                <TrendingUp size={24} className="text-live-red" />
              </div>
              <div className="text-2xl font-bold text-live-red">{analyticsData.averageViewers}</div>
              <div className="text-sm text-muted-foreground">Avg Viewers</div>
            </div>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Card className="feature-card">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Performance Details</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Average Watch Time</span>
                <span className="font-medium">{analyticsData.averageWatchTime}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Engagement Level</span>
                <Badge className="bg-chat-green/20 text-chat-green border-chat-green/30">
                  {analyticsData.engagement}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Stream Quality</span>
                <span className="font-medium">AUTO (720p avg)</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Top Countries */}
        <Card className="feature-card">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Top Viewer Locations</h3>
            
            <div className="space-y-2">
              {analyticsData.topCountries.map((country, index) => (
                <div key={country} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                    <span>{country}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {index === 0 ? '45%' : index === 1 ? '25%' : '15%'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Export Options */}
        <Card className="feature-card">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Export & Share</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm">
                Export PDF
              </Button>
              <Button variant="outline" size="sm">
                Share Report
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StreamAnalyticsScreen;