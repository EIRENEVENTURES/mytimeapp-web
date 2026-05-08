import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Globe,
  Users,
  MoreHorizontal,
  PlayCircle,
  Repeat2,
  Edit,
  Trash2,
  Flag,
  Copy,
  Eye
} from "lucide-react";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/types/Post";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onReshare: (postId: string, originalAuthor?: any) => void;
  onEngagement: (postId: string, type: 'like' | 'comment') => void;
  onNavigate?: (screen: string, data?: any) => void;
  onDeletePost?: (postId: string) => void;
  onUpdatePost?: (post: Post) => void;
}

const PostCard = ({ post, onLike, onComment, onReshare, onEngagement, onNavigate, onDeletePost, onUpdatePost }: PostCardProps) => {
  const { profile } = useUserProfile();
  const { toast } = useToast();
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);

  // Convert file to URL for display
  if (post.mediaFile && !mediaUrl) {
    const url = URL.createObjectURL(post.mediaFile);
    setMediaUrl(url);
  }

  const handleLike = () => {
    onEngagement(post.id, 'like');
  };

  const handleComment = () => {
    onEngagement(post.id, 'comment');
  };

  const handleReshare = () => {
    if (onNavigate) {
      onNavigate('reshare-options', { post });
    }
  };

  const handleEditPost = () => {
    if (onNavigate) {
      onNavigate('edit-post', { post });
    }
  };

  const handleCopyLink = () => {
    const postUrl = `${window.location.origin}/post/${post.id}`;
    navigator.clipboard.writeText(postUrl).then(() => {
      toast({
        title: "Link copied!",
        description: "Post link has been copied to clipboard"
      });
    }).catch(() => {
      toast({
        title: "Failed to copy link",
        description: "Please try again",
        variant: "destructive"
      });
    });
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      if (onDeletePost) {
        onDeletePost(post.id);
      }
      toast({
        title: "Post deleted",
        description: "Your post has been removed"
      });
    }
  };

  const handleReportPost = () => {
    if (onNavigate) {
      onNavigate('report-post', { post });
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

  const displayAuthor = post.resharedBy || post.author;

  return (
    <Card className="p-4 mb-4">
      {/* Post Header */}
      <div className="flex items-start gap-3 mb-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={displayAuthor.profilePicture} alt={displayAuthor.name} />
          <AvatarFallback className="bg-primary/10 text-primary text-sm">
            {displayAuthor.initials}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          {/* Reshare indicator */}
          {post.isReshare && (
            <div className="flex items-center gap-1 mb-1 text-xs text-muted-foreground">
              <Repeat2 size={12} />
              <span>{displayAuthor.name} reshared</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">
              {post.isReshare ? post.originalPost?.author.name : displayAuthor.name}
            </span>
            <Badge variant="outline" className="text-xs">
              {post.isPublic ? (
                <>
                  <Globe size={10} className="mr-1" />
                  Public
                </>
              ) : (
                <>
                  <Users size={10} className="mr-1" />
                  Followers
                </>
              )}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(post.isReshare ? post.originalPost!.timestamp : post.timestamp)}
            </span>
            {post.isReshare && (
              <span className="text-xs text-muted-foreground">
                • Reshared {formatTimestamp(post.timestamp)}
              </span>
            )}
          </div>
          
          {post.type !== 'text' && (
            <Badge variant="secondary" className="text-xs mb-2">
              {post.type === 'image' ? '📷 Photo' : '🎥 Video'}
            </Badge>
          )}
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="cursor-pointer" onClick={handleEditPost}>
              <Edit size={14} className="mr-2" />
              Edit post
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={handleCopyLink}>
              <Copy size={14} className="mr-2" />
              Copy link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleDeletePost}>
              <Trash2 size={14} className="mr-2" />
              Delete post
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleReportPost}>
              <Flag size={14} className="mr-2" />
              Report post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Post Content */}
      {post.content && (
        <div className="mb-3">
          <p className="text-sm leading-relaxed">{post.content}</p>
        </div>
      )}

      {/* Media Content */}
      {mediaUrl && (
        <div className="mb-3 rounded-lg overflow-hidden bg-muted">
          {post.type === 'image' ? (
            <img 
              src={mediaUrl} 
              alt="Post content" 
              className="w-full max-h-80 object-cover"
            />
          ) : (
            <div className="relative">
              <video 
                src={mediaUrl}
                className="w-full max-h-80 object-cover"
                controls={false}
                poster=""
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <PlayCircle size={48} className="text-white/80" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Engagement Stats */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2 px-1">
        {post.views > 0 && (
          <span className="flex items-center gap-1">
            <Eye size={12} />
            {post.views} views
          </span>
        )}
        {post.likes > 0 && (
          <span>
            {post.likes} likes
            {post.isReshare && <span className="text-yellow-600 ml-1">• Split 50/50</span>}
          </span>
        )}
        {post.comments > 0 && (
          <span>
            {post.comments} comments
            {post.isReshare && <span className="text-yellow-600 ml-1">• Split 50/50</span>}
          </span>
        )}
        {post.reshares > 0 && <span>{post.reshares} reshares</span>}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center pt-2 border-t gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={`flex-1 h-auto py-1 px-2 flex-col items-center gap-0 ${post.hasLiked ? 'text-red-500' : 'text-muted-foreground'}`}
        >
          <span className="flex items-center gap-1">
            <Heart size={14} className={post.hasLiked ? 'fill-current' : ''} />
            Like
          </span>
          <span className="text-[10px] opacity-70">
            {(() => {
              const base = post.likePrice ?? 1;
              if (base === 0) return 'Free';
              return post.isReshare ? `${base / 2} credit each` : `${base} credit${base === 1 ? '' : 's'}`;
            })()}
          </span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleComment}
          className="flex-1 h-auto py-1 px-2 flex-col items-center gap-0 text-muted-foreground"
        >
          <span className="flex items-center gap-1">
            <MessageCircle size={14} />
            Comment
          </span>
          <span className="text-[10px] opacity-70">
            {(() => {
              const base = post.commentPrice ?? 2;
              if (base === 0) return 'Free';
              return post.isReshare ? `${base / 2} credit each` : `${base} credit${base === 1 ? '' : 's'}`;
            })()}
          </span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReshare}
          className="flex-1 h-auto py-1 px-2 flex-col items-center gap-0 text-muted-foreground"
        >
          <span className="flex items-center gap-1">
            <Share2 size={14} />
            Reshare
          </span>
          <span className="text-[10px] opacity-70">Free</span>
        </Button>
      </div>
    </Card>
  );
};

export default PostCard;