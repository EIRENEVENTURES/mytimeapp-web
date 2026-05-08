import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, MessageCircle, UserPlus, UserMinus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfileScreenProps {
  user: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    initials: string;
    bio?: string;
    followers?: number;
    following?: number;
    chatCreditPerSecond?: number;
    callCreditPerSecond?: number;
  };
  onBack: () => void;
  onStartChat: (user: any) => void;
}

const UserProfileScreen = ({ user, onBack, onStartChat }: UserProfileScreenProps) => {
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing 
        ? `You have unfollowed ${user.name}.`
        : `You are now following ${user.name}.`,
    });
  };

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
        <h1 className="text-xl font-semibold">Profile</h1>
      </div>

      {/* Profile Info */}
      <div className="p-6">
        <div className="flex flex-col items-center text-center mb-6">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-2xl">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-muted-foreground">{user.username}</p>
          {user.bio && (
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">{user.bio}</p>
          )}
        </div>

        {/* Stats */}
        <Card className="p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-center mb-4">
            <div>
              <div className="text-2xl font-bold">{user.followers || 0}</div>
              <div className="text-xs text-muted-foreground">Followers</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{user.following || 0}</div>
              <div className="text-xs text-muted-foreground">Following</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center pt-4 border-t border-border">
            <div>
              <div className="text-xl font-bold text-chat-green">{user.chatCreditPerSecond || 5}</div>
              <div className="text-xs text-muted-foreground">Chat credits/sec</div>
            </div>
            <div>
              <div className="text-xl font-bold text-calls-orange">{user.callCreditPerSecond || 8}</div>
              <div className="text-xs text-muted-foreground">Call credits/sec</div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            className="flex-1"
            variant={isFollowing ? "outline" : "default"}
            onClick={handleFollowToggle}
          >
            {isFollowing ? (
              <>
                <UserMinus size={16} className="mr-2" />
                Unfollow
              </>
            ) : (
              <>
                <UserPlus size={16} className="mr-2" />
                Follow
              </>
            )}
          </Button>
          <Button
            className="flex-1 bg-chat-green hover:bg-chat-green/90"
            onClick={() => onStartChat(user)}
          >
            <MessageCircle size={16} className="mr-2" />
            Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileScreen;
