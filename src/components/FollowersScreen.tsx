import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, UserMinus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Follower {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  initials: string;
  isFollowingBack: boolean;
}

const FollowersScreen = ({ 
  onBack, 
  onViewProfile 
}: { 
  onBack: () => void; 
  onViewProfile: (user: any) => void;
}) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [followers, setFollowers] = useState<Follower[]>([
    { id: "1", name: "Sarah Johnson", username: "@sarah_j", initials: "SJ", isFollowingBack: true },
    { id: "2", name: "Mike Chen", username: "@mikec", initials: "MC", isFollowingBack: false },
    { id: "3", name: "Emma Wilson", username: "@emma_w", initials: "EW", isFollowingBack: true },
    { id: "4", name: "Alex Turner", username: "@alex_t", initials: "AT", isFollowingBack: false },
    { id: "5", name: "Lisa Park", username: "@lisa_p", initials: "LP", isFollowingBack: true },
  ]);

  const handleRemoveFollower = (followerId: string, followerName: string) => {
    setFollowers(prev => prev.filter(f => f.id !== followerId));
    toast({
      title: "Follower removed",
      description: `${followerName} has been removed from your followers.`,
    });
  };

  const filteredFollowers = followers.filter(follower =>
    follower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    follower.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mobile-container">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-semibold">Followers</h1>
        <span className="text-muted-foreground text-sm">({followers.length})</span>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search followers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
      </div>

      {/* Followers List */}
      <div className="p-4 space-y-3">
        {filteredFollowers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {searchQuery ? "No followers found" : "No followers yet"}
          </div>
        ) : (
          filteredFollowers.map((follower) => (
            <Card key={follower.id} className="p-4">
              <div className="flex items-center gap-3">
                <div 
                  className="cursor-pointer"
                  onClick={() => onViewProfile(follower)}
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={follower.avatar} alt={follower.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {follower.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => onViewProfile(follower)}
                >
                  <h4 className="font-semibold">{follower.name}</h4>
                  <p className="text-sm text-muted-foreground">{follower.username}</p>
                  {follower.isFollowingBack && (
                    <span className="text-xs text-primary">Follows you back</span>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFollower(follower.id, follower.name)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <UserMinus size={16} className="mr-1" />
                  Remove
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default FollowersScreen;
