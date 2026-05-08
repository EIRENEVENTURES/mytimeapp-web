import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, UserMinus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Following {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  initials: string;
  followsBack: boolean;
}

const FollowingScreen = ({ 
  onBack, 
  onViewProfile 
}: { 
  onBack: () => void; 
  onViewProfile: (user: any) => void;
}) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [following, setFollowing] = useState<Following[]>([
    { id: "1", name: "Sarah Johnson", username: "@sarah_j", initials: "SJ", followsBack: true },
    { id: "2", name: "Mike Chen", username: "@mikec", initials: "MC", followsBack: false },
    { id: "3", name: "Emma Wilson", username: "@emma_w", initials: "EW", followsBack: true },
    { id: "4", name: "David Brown", username: "@david_b", initials: "DB", followsBack: true },
    { id: "5", name: "Jessica Lee", username: "@jess_l", initials: "JL", followsBack: false },
  ]);

  const handleUnfollow = (userId: string, userName: string) => {
    setFollowing(prev => prev.filter(f => f.id !== userId));
    toast({
      title: "Unfollowed",
      description: `You have unfollowed ${userName}.`,
    });
  };

  const filteredFollowing = following.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
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
        <h1 className="text-xl font-semibold">Following</h1>
        <span className="text-muted-foreground text-sm">({following.length})</span>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search following..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
      </div>

      {/* Following List */}
      <div className="p-4 space-y-3">
        {filteredFollowing.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {searchQuery ? "No users found" : "Not following anyone yet"}
          </div>
        ) : (
          filteredFollowing.map((user) => (
            <Card key={user.id} className="p-4">
              <div className="flex items-center gap-3">
                <div 
                  className="cursor-pointer"
                  onClick={() => onViewProfile(user)}
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => onViewProfile(user)}
                >
                  <h4 className="font-semibold">{user.name}</h4>
                  <p className="text-sm text-muted-foreground">{user.username}</p>
                  {user.followsBack && (
                    <span className="text-xs text-primary">Follows you</span>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUnfollow(user.id, user.name)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <UserMinus size={16} className="mr-1" />
                  Unfollow
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default FollowingScreen;
