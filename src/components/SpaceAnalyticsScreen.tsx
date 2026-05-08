import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Users, Clock, DollarSign, Download } from "lucide-react";

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

const SpaceAnalyticsScreen = ({ onBack, space, onExport }: { onBack: () => void; space: Space; onExport?: () => void }) => {
  const analyticsData = {
    totalSessions: 12,
    totalParticipants: 45,
    totalDuration: "8h 32m",
    totalEarnings: 1250,
    averageSessionLength: "42m",
    peakParticipants: 8,
    participantRetention: "78%",
    topCountries: ["United States", "Canada", "United Kingdom"]
  };

  const recentSessions = [
    {
      id: 1,
      date: "Dec 15, 2024",
      duration: "1h 24m",
      participants: 6,
      earnings: 156
    },
    {
      id: 2,
      date: "Dec 14, 2024",
      duration: "56m",
      participants: 4,
      earnings: 89
    },
    {
      id: 3,
      date: "Dec 13, 2024",
      duration: "2h 12m",
      participants: 8,
      earnings: 245
    }
  ];

  return (
    <div className="mobile-container flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-background">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold">Analytics</h1>
            <p className="text-sm text-muted-foreground">{space.title}</p>
          </div>
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download size={16} className="mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-spaces-orange/20 flex items-center justify-center">
                <Users size={18} className="text-spaces-orange" />
              </div>
              <div>
                <p className="text-2xl font-bold">{analyticsData.totalParticipants}</p>
                <p className="text-sm text-muted-foreground">Total Participants</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-wallet-blue/20 flex items-center justify-center">
                <DollarSign size={18} className="text-wallet-blue" />
              </div>
              <div>
                <p className="text-2xl font-bold">{analyticsData.totalEarnings}</p>
                <p className="text-sm text-muted-foreground">Credits Earned</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-chat-green/20 flex items-center justify-center">
                <Clock size={18} className="text-chat-green" />
              </div>
              <div>
                <p className="text-2xl font-bold">{analyticsData.totalSessions}</p>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <TrendingUp size={18} className="text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{analyticsData.participantRetention}</p>
                <p className="text-sm text-muted-foreground">Retention Rate</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Performance Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Duration</span>
              <span className="font-medium">{analyticsData.totalDuration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Average Session</span>
              <span className="font-medium">{analyticsData.averageSessionLength}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Peak Participants</span>
              <span className="font-medium">{analyticsData.peakParticipants} users</span>
            </div>
          </div>
        </Card>

        {/* Recent Sessions */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Recent Sessions</h3>
          <div className="space-y-3">
            {recentSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm">{session.date}</p>
                  <p className="text-xs text-muted-foreground">
                    {session.duration} • {session.participants} participants
                  </p>
                </div>
                <Badge className="bg-wallet-blue/20 text-wallet-blue border-wallet-blue/30">
                  {session.earnings} credits
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Geographic Data */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Top Countries</h3>
          <div className="space-y-2">
            {analyticsData.topCountries.map((country, index) => (
              <div key={country} className="flex items-center justify-between">
                <span className="text-sm">{country}</span>
                <Badge variant="outline">{index === 0 ? '45%' : index === 1 ? '28%' : '18%'}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SpaceAnalyticsScreen;