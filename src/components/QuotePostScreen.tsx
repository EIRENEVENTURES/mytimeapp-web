import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Quote, Globe, Users, PlayCircle } from "lucide-react";
import { Post } from "@/types/Post";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/use-user-profile";

interface QuotePostScreenProps {
  originalPost: Post;
  onBack: () => void;
  onPost: (quotePostData: any) => void;
}

const QuotePostScreen = ({ 
  originalPost, 
  onBack, 
  onPost 
}: QuotePostScreenProps) => {
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [likePrice, setLikePrice] = useState(1);
  const [commentPrice, setCommentPrice] = useState(2);
  const [customPricing, setCustomPricing] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const { toast } = useToast();
  const { profile } = useUserProfile();

  const handlePost = async () => {
    if (!content.trim()) {
      toast({
        title: "Add your thoughts",
        description: "Please add some content to your quote post",
        variant: "destructive"
      });
      return;
    }

    setIsPosting(true);

    try {
      const quotePostData = {
        id: `quote-${Date.now()}`,
        type: 'text' as const,
        content: content.trim(),
        isPublic,
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        reshares: 0,
        hasLiked: false,
        isQuote: true,
        quotedPost: {
          id: originalPost.id,
          author: originalPost.author,
          content: originalPost.content,
          type: originalPost.type,
          timestamp: originalPost.timestamp,
          isPublic: originalPost.isPublic
        },
        ...(customPricing && {
          likePrice,
          commentPrice
        })
      };

      onPost(quotePostData);
      
      toast({
        title: "Quote posted!",
        description: "Your quote post has been shared to your timeline"
      });
      
      onBack();
    } catch (error) {
      toast({
        title: "Failed to post",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsPosting(false);
    }
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

  const displayAuthor = originalPost.resharedBy || originalPost.author;

  return (
    <div className="mobile-container min-h-screen bg-background px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={18} />
          </Button>
          <div className="flex items-center gap-2">
            <Quote size={18} className="text-primary" />
            <span className="font-semibold text-base">Quote Post</span>
          </div>
        </div>
        <Button onClick={handlePost} disabled={isPosting || !content.trim()} size="sm">
          {isPosting ? "Posting..." : "Post"}
        </Button>
      </div>

      {/* User Input Section */}
      <Card className="p-3 mb-3">
        <div className="flex items-start gap-2 mb-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={profile.profilePicture} alt={profile.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {profile.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <span className="font-medium text-sm">{profile.name}</span>
          </div>
        </div>

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add your thoughts about this post..."
          className="min-h-[80px] resize-none border-none shadow-none p-0 text-sm focus-visible:ring-0"
          maxLength={500}
        />
        
        <div className="text-xs text-muted-foreground mt-2 text-right">
          {content.length}/500 characters
        </div>

        {/* Visibility and Pricing Settings */}
        <div className="mt-3 pt-3 border-t space-y-3">
          {/* Visibility */}
          <div className="flex items-center gap-2">
            <Button
              variant={isPublic ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPublic(true)}
              className="flex items-center gap-1 text-xs px-2 py-1 h-7"
            >
              <Globe size={12} />
              Public
            </Button>
            <Button
              variant={!isPublic ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPublic(false)}
              className="flex items-center gap-1 text-xs px-2 py-1 h-7"
            >
              <Users size={12} />
              Followers Only
            </Button>
          </div>

          {/* Custom Pricing */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="custom-pricing" className="text-xs font-medium">
                  Custom Credit Pricing
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Set custom rates for likes and comments
                </p>
              </div>
              <Switch
                id="custom-pricing"
                checked={customPricing}
                onCheckedChange={setCustomPricing}
              />
            </div>

            {customPricing && (
              <div className="grid grid-cols-2 gap-3 p-2 border rounded-lg bg-muted/30">
                <div>
                  <Label htmlFor="like-price" className="text-xs font-medium mb-1 block">
                    Like Price (Credits)
                  </Label>
                  <input
                    id="like-price"
                    type="number"
                    min="1"
                    max="10"
                    value={likePrice}
                    onChange={(e) => setLikePrice(parseInt(e.target.value) || 1)}
                    className="w-full px-2 py-1 border rounded-md text-xs"
                  />
                </div>
                <div>
                  <Label htmlFor="comment-price" className="text-xs font-medium mb-1 block">
                    Comment Price (Credits)
                  </Label>
                  <input
                    id="comment-price"
                    type="number"
                    min="1"
                    max="10"
                    value={commentPrice}
                    onChange={(e) => setCommentPrice(parseInt(e.target.value) || 2)}
                    className="w-full px-2 py-1 border rounded-md text-xs"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Quoted Post Preview */}
      <Card className="p-3 border-l-4 border-l-primary/50 bg-muted/30">
        <div className="flex items-start gap-2 mb-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={displayAuthor.profilePicture} alt={displayAuthor.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {displayAuthor.initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            {/* Reshare indicator */}
            {originalPost.isReshare && (
              <div className="flex items-center gap-1 mb-1 text-xs text-muted-foreground">
                <Quote size={8} />
                <span>{displayAuthor.name} reshared</span>
              </div>
            )}
            
            <div className="flex items-center gap-1 mb-1 flex-wrap">
              <span className="font-medium text-xs">
                {originalPost.isReshare ? originalPost.originalPost?.author.name : displayAuthor.name}
              </span>
              <Badge variant="outline" className="text-xs px-1 py-0">
                {originalPost.isPublic ? (
                  <>
                    <Globe size={6} className="mr-1" />
                    Public
                  </>
                ) : (
                  <>
                    <Users size={6} className="mr-1" />
                    Followers
                  </>
                )}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatTimestamp(originalPost.isReshare ? originalPost.originalPost!.timestamp : originalPost.timestamp)}
              </span>
            </div>
            
            {originalPost.type !== 'text' && (
              <Badge variant="secondary" className="text-xs mb-2">
                {originalPost.type === 'image' ? '📷 Photo' : '🎥 Video'}
              </Badge>
            )}
          </div>
        </div>

        {/* Post Content */}
        {originalPost.content && (
          <div className="mb-2">
            <p className="text-xs leading-relaxed text-muted-foreground">{originalPost.content}</p>
          </div>
        )}

        {/* Media Content Placeholder */}
        {originalPost.type !== 'text' && (
          <div className="mb-2 rounded-lg overflow-hidden bg-muted">
            {originalPost.type === 'image' ? (
              <div className="w-full h-24 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-xs">📷 Image Content</span>
              </div>
            ) : (
              <div className="relative w-full h-24 bg-muted flex items-center justify-center">
                <PlayCircle size={24} className="text-muted-foreground" />
              </div>
            )}
          </div>
        )}

        {/* Engagement Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {originalPost.likes > 0 && <span>{originalPost.likes} likes</span>}
          {originalPost.comments > 0 && <span>{originalPost.comments} comments</span>}
          {originalPost.reshares > 0 && <span>{originalPost.reshares} reshares</span>}
        </div>
      </Card>
    </div>
  );
};

export default QuotePostScreen;