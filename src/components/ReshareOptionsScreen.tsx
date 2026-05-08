import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Repeat2, Quote, Globe, Users, PlayCircle } from "lucide-react";
import { Post } from "@/types/Post";
import { useToast } from "@/hooks/use-toast";

interface ReshareOptionsScreenProps {
  post: Post;
  onBack: () => void;
  onReshareDirectly: (post: Post) => void;
  onQuotePost: (post: Post) => void;
}

const ReshareOptionsScreen = ({ 
  post, 
  onBack, 
  onReshareDirectly, 
  onQuotePost 
}: ReshareOptionsScreenProps) => {
  const { toast } = useToast();

  const handleDirectReshare = () => {
    onReshareDirectly(post);
    toast({
      title: "Post reshared!",
      description: "The post has been shared to your timeline"
    });
    onBack();
  };

  const handleQuotePost = () => {
    onQuotePost(post);
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    return `${diffDays}d`;
  };

  const displayAuthor = post.resharedBy || post.author;

  return (
    <div className="mobile-container min-h-screen bg-background px-4 py-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft size={18} />
        </Button>
        <div className="flex items-center gap-2">
          <Repeat2 size={18} className="text-primary" />
          <span className="font-semibold text-base">Reshare Post</span>
        </div>
      </div>

      {/* Post Preview */}
      <Card className="p-3 mb-4">
        <div className="flex items-start gap-2 mb-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={displayAuthor.profilePicture} alt={displayAuthor.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {displayAuthor.initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            {/* Reshare indicator */}
            {post.isReshare && (
            <div className="flex items-center gap-1 mb-1 text-xs text-muted-foreground">
              <Repeat2 size={10} />
              <span>{displayAuthor.name} reshared</span>
            </div>
            )}
            
            <div className="flex items-center gap-1 mb-1 flex-wrap">
              <span className="font-medium text-sm">
                {post.isReshare ? post.originalPost?.author.name : displayAuthor.name}
              </span>
              <Badge variant="outline" className="text-xs px-1 py-0">
                {post.isPublic ? (
                  <>
                    <Globe size={8} className="mr-1" />
                    Public
                  </>
                ) : (
                  <>
                    <Users size={8} className="mr-1" />
                    Followers
                  </>
                )}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatTimestamp(post.isReshare ? post.originalPost!.timestamp : post.timestamp)}
              </span>
            </div>
            
            {post.type !== 'text' && (
              <Badge variant="secondary" className="text-xs mb-2">
                {post.type === 'image' ? '📷 Photo' : '🎥 Video'}
              </Badge>
            )}
          </div>
        </div>

        {/* Post Content */}
        {post.content && (
          <div className="mb-2">
            <p className="text-sm leading-relaxed">{post.content}</p>
          </div>
        )}

        {/* Media Content Placeholder */}
        {post.type !== 'text' && (
          <div className="mb-2 rounded-lg overflow-hidden bg-muted">
            {post.type === 'image' ? (
              <div className="w-full h-32 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-xs">📷 Image Content</span>
              </div>
            ) : (
              <div className="relative w-full h-32 bg-muted flex items-center justify-center">
                <PlayCircle size={32} className="text-muted-foreground" />
              </div>
            )}
          </div>
        )}

        {/* Engagement Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {post.likes > 0 && <span>{post.likes} likes</span>}
          {post.comments > 0 && <span>{post.comments} comments</span>}
          {post.reshares > 0 && <span>{post.reshares} reshares</span>}
        </div>
      </Card>

      {/* Reshare Options */}
      <div className="space-y-3">
        <h3 className="font-medium text-base mb-3">Choose how to reshare</h3>
        
        {/* Direct Reshare Option */}
        <Card className="p-3 cursor-pointer hover:bg-muted/50 transition-colors" onClick={handleDirectReshare}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
              <Repeat2 size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm mb-1">Reshare</h4>
              <p className="text-xs text-muted-foreground leading-tight">
                Instantly share this post to your timeline without adding your own content
              </p>
            </div>
          </div>
        </Card>

        {/* Quote Post Option */}
        <Card className="p-3 cursor-pointer hover:bg-muted/50 transition-colors" onClick={handleQuotePost}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
              <Quote size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm mb-1">Quote Post</h4>
              <p className="text-xs text-muted-foreground leading-tight">
                Add your own thoughts and commentary to this post before sharing
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="p-3 mt-4 bg-muted/30">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-primary text-xs">💡</span>
          </div>
          <div className="min-w-0">
            <h4 className="font-medium text-xs mb-1">Earn Credits from Reshares</h4>
            <p className="text-xs text-muted-foreground leading-tight">
              You'll earn 50% of credits from likes and comments on your reshared posts. 
              The original author gets the other 50%.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReshareOptionsScreen;