import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Eye, Lock, Clock } from "lucide-react";

const PostStoryScreen = ({ 
  storyData, 
  onBack, 
  onPost 
}: { 
  storyData: any; 
  onBack: () => void; 
  onPost: (postData: any) => void; 
}) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [duration, setDuration] = useState("24");

  const handlePost = () => {
    const postData = {
      ...storyData,
      privacy: isPrivate ? "private" : "public",
      duration: parseInt(duration),
      postedAt: new Date().toISOString()
    };
    
    onPost(postData);
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
          <h1 className="text-xl font-semibold">Post Story</h1>
        </div>
        <Button onClick={handlePost} className="bg-primary hover:bg-primary/90">
          Post Story
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Story Preview */}
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Story Preview</h3>
          <div className="bg-background rounded-lg p-4 border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-semibold">AC</span>
              </div>
              <div>
                <p className="font-semibold">Alice Caller</p>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>
            </div>
            
            <h4 className="font-semibold mb-2">{storyData.title}</h4>
            
            {storyData.type === "text" && (
              <p className="text-sm">{storyData.content}</p>
            )}
            
            {storyData.type === "image" && (
              <div className="bg-muted rounded-lg h-32 flex items-center justify-center">
                <span className="text-muted-foreground">Image Preview</span>
              </div>
            )}
            
            {storyData.type === "voice" && (
              <div className="bg-muted rounded-lg p-4 flex items-center justify-center">
                <span className="text-muted-foreground">🎵 Voice Story</span>
              </div>
            )}
            
            {storyData.type === "video" && (
              <div className="bg-muted rounded-lg h-32 flex items-center justify-center">
                <span className="text-muted-foreground">📹 Video Preview</span>
              </div>
            )}
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {isPrivate ? <Lock size={20} /> : <Eye size={20} />}
              <div>
                <h3 className="font-semibold">Privacy</h3>
                <p className="text-sm text-muted-foreground">
                  {isPrivate ? "Only followers can view" : "Public story"}
                </p>
              </div>
            </div>
            <Switch
              checked={isPrivate}
              onCheckedChange={setIsPrivate}
            />
          </div>
        </Card>


        {/* Story Duration */}
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Clock size={20} />
            <div>
              <h3 className="font-semibold">Story Duration</h3>
              <p className="text-sm text-muted-foreground">
                How long should your story be visible?
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "1", label: "1 Hour" },
              { value: "24", label: "24 Hours" },
              { value: "168", label: "1 Week" }
            ].map((option) => (
              <Button
                key={option.value}
                variant={duration === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => setDuration(option.value)}
                className="text-xs"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PostStoryScreen;