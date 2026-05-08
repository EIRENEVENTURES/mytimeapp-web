import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Type, 
  Image as ImageIcon, 
  Video, 
  Globe, 
  Users,
  X 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreatePostComponentProps {
  onPost: (postData: any) => void;
  onCancel: () => void;
}

const CreatePostComponent = ({ onPost, onCancel }: CreatePostComponentProps) => {
  const [postType, setPostType] = useState<'text' | 'image' | 'video'>('text');
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [useCustomPricing, setUseCustomPricing] = useState(false);
  const [isFreePost, setIsFreePost] = useState(false);
  const [likePrice, setLikePrice] = useState(1);
  const [commentPrice, setCommentPrice] = useState(2);

  const effectiveLikePrice = isFreePost ? 0 : likePrice;
  const effectiveCommentPrice = isFreePost ? 0 : commentPrice;
  const { toast } = useToast();

  const postTypes = [
    { type: 'text' as const, icon: Type, label: 'Text', color: 'text-blue-500' },
    { type: 'image' as const, icon: ImageIcon, label: 'Photo', color: 'text-green-500' },
    { type: 'video' as const, icon: Video, label: 'Video', color: 'text-purple-500' }
  ];

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSize = postType === 'video' ? 50 * 1024 * 1024 : 10 * 1024 * 1024; // 50MB for video, 10MB for image
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `Please choose a ${postType} smaller than ${postType === 'video' ? '50MB' : '10MB'}`,
          variant: "destructive"
        });
        return;
      }
      setMediaFile(file);
    }
  };

  const handlePost = () => {
    if (!content.trim() && !mediaFile) {
      toast({
        title: "Empty post",
        description: "Please add some content to your post",
        variant: "destructive"
      });
      return;
    }

    const postData = {
      id: Date.now().toString(),
      type: postType,
      content: content.trim(),
      mediaFile,
      isPublic,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      reshares: 0,
      hasLiked: false,
      ...(isFreePost
        ? { likePrice: 0, commentPrice: 0, isFree: true }
        : useCustomPricing && { likePrice, commentPrice })
    };

    onPost(postData);
    toast({
      title: "Post created!",
      description: `Your ${postType} post has been shared with ${isPublic ? 'everyone' : 'your followers'}`
    });
  };

  return (
    <Card className="p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Create Post</h3>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X size={16} />
        </Button>
      </div>

      {/* Post Type Selection */}
      <div className="flex gap-2 mb-4">
        {postTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Button
              key={type.type}
              variant={postType === type.type ? "default" : "outline"}
              size="sm"
              onClick={() => setPostType(type.type)}
              className="flex-1"
            >
              <Icon size={16} className={`mr-2 ${type.color}`} />
              {type.label}
            </Button>
          );
        })}
      </div>

      {/* Content Input */}
      <Textarea
        placeholder={`What's on your mind? Share a ${postType} post...`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-4 min-h-[100px]"
      />

      {/* Media Upload */}
      {postType !== 'text' && (
        <div className="mb-4">
          <Label htmlFor={`${postType}-upload`} className="cursor-pointer">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              {mediaFile ? (
                <div className="text-sm text-muted-foreground">
                  {mediaFile.name} ({(mediaFile.size / 1024 / 1024).toFixed(1)}MB)
                </div>
              ) : (
                <>
                  <div className="text-muted-foreground mb-2">
                    {postType === 'image' ? <ImageIcon size={32} className="mx-auto" /> : <Video size={32} className="mx-auto" />}
                  </div>
                  <div className="text-sm text-muted-foreground">Click to upload {postType}</div>
                </>
              )}
            </div>
          </Label>
          <Input
            id={`${postType}-upload`}
            type="file"
            accept={postType === 'image' ? 'image/*' : 'video/*'}
            onChange={handleMediaUpload}
            className="hidden"
          />
        </div>
      )}

      {/* Privacy Settings */}
      <div className="flex items-center justify-between mb-4 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-2">
          {isPublic ? <Globe size={16} className="text-blue-500" /> : <Users size={16} className="text-green-500" />}
          <Label htmlFor="privacy-toggle" className="text-sm">
            {isPublic ? 'Public - Everyone can see' : 'Followers only'}
          </Label>
        </div>
        <Switch
          id="privacy-toggle"
          checked={isPublic}
          onCheckedChange={setIsPublic}
        />
      </div>

      {/* Free Post */}
      <div className="mb-4 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="free-post" className="text-sm font-medium">
              Free post
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Likes and comments cost 0 credits
            </p>
          </div>
          <Switch
            id="free-post"
            checked={isFreePost}
            onCheckedChange={(checked) => {
              setIsFreePost(checked);
              if (checked) setUseCustomPricing(false);
            }}
          />
        </div>
      </div>

      {/* Custom Pricing */}
      <div className={`mb-4 p-3 bg-muted/30 rounded-lg ${isFreePost ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="flex items-center justify-between mb-3">
          <Label htmlFor="custom-pricing" className="text-sm font-medium">
            Custom engagement pricing
          </Label>
          <Switch
            id="custom-pricing"
            checked={useCustomPricing}
            onCheckedChange={setUseCustomPricing}
            disabled={isFreePost}
          />
        </div>
        
        {useCustomPricing && !isFreePost && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="like-price" className="text-xs text-muted-foreground">
                Like price (credits)
              </Label>
              <Input
                id="like-price"
                type="number"
                min="0"
                max="10"
                value={likePrice}
                onChange={(e) => setLikePrice(Math.max(0, Math.min(10, parseInt(e.target.value) || 0)))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="comment-price" className="text-xs text-muted-foreground">
                Comment price (credits)
              </Label>
              <Input
                id="comment-price"
                type="number"
                min="0"
                max="10"
                value={commentPrice}
                onChange={(e) => setCommentPrice(Math.max(0, Math.min(10, parseInt(e.target.value) || 0)))}
                className="mt-1"
              />
            </div>
          </div>
        )}
        
        {!useCustomPricing && !isFreePost && (
          <p className="text-xs text-muted-foreground">
            Default pricing: 1 credit for likes, 2 credits for comments
          </p>
        )}
      </div>

      {/* Post Button */}
      <Button 
        onClick={handlePost} 
        className="w-full"
        disabled={!content.trim() && !mediaFile}
      >
        Share Post
      </Button>
    </Card>
  );
};

export default CreatePostComponent;