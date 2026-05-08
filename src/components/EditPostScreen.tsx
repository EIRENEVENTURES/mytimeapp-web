import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Edit, Image, Video, Globe, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Post } from "@/types/Post";

const EditPostScreen = ({ 
  post, 
  onBack,
  onSave
}: { 
  post: Post;
  onBack: () => void;
  onSave: (updatedPost: Post) => void;
}) => {
  const [content, setContent] = useState(post.content);
  const [isPublic, setIsPublic] = useState(post.isPublic);
  const [likePrice, setLikePrice] = useState(post.likePrice || 1);
  const [commentPrice, setCommentPrice] = useState(post.commentPrice || 2);
  const [customPricing, setCustomPricing] = useState(!!(post.likePrice || post.commentPrice));
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Post content cannot be empty",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const updatedPost: Post = {
        ...post,
        content: content.trim(),
        isPublic,
        likePrice: customPricing ? likePrice : undefined,
        commentPrice: customPricing ? commentPrice : undefined,
      };

      onSave(updatedPost);
      
      toast({
        title: "Post updated!",
        description: "Your post has been successfully updated"
      });
      
      onBack();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mobile-container min-h-screen bg-background px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={18} />
          </Button>
          <div className="flex items-center gap-2">
            <Edit size={18} className="text-primary" />
            <span className="font-semibold text-base">Edit Post</span>
          </div>
        </div>
        <Button onClick={handleSave} disabled={isLoading} size="sm">
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>

      <Card className="p-3">
        {/* Post Type Badge */}
        <div className="mb-3">
          <Badge variant="secondary" className="text-xs">
            {post.type === 'text' ? '📝 Text Post' : 
             post.type === 'image' ? '📷 Photo Post' : '🎥 Video Post'}
          </Badge>
        </div>

        {/* Content Editor */}
        <div className="mb-4">
          <Label htmlFor="content" className="text-xs font-medium mb-2 block">
            Post Content
          </Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="min-h-[80px] resize-none text-sm"
            maxLength={500}
          />
          <div className="text-xs text-muted-foreground mt-1 text-right">
            {content.length}/500 characters
          </div>
        </div>

        {/* Visibility Settings */}
        <div className="mb-4">
          <Label className="text-xs font-medium mb-2 block">Visibility</Label>
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
        </div>

        {/* Custom Pricing */}
        <div className="space-y-3">
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

        {/* Media Preview (if exists) */}
        {post.mediaFile && (
          <div className="mt-4">
            <Label className="text-xs font-medium mb-2 block">Attached Media</Label>
            <div className="p-3 border-2 border-dashed rounded-lg bg-muted/30">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {post.type === 'image' ? <Image size={14} /> : <Video size={14} />}
                <span>{post.type === 'image' ? 'Image attached' : 'Video attached'}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Media cannot be changed after posting
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EditPostScreen;