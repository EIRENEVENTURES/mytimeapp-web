import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Heart, MessageCircle, Share, Eye, Clock, DollarSign, BarChart3 } from "lucide-react";

const ViewStoryScreen = ({ 
  storyData, 
  onBack,
  onNavigate 
}: { 
  storyData: any; 
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}) => {
  const [liked, setLiked] = useState(false);
  const [views] = useState(23);
  const [likes] = useState(liked ? 8 : 7);

  return (
    <div className="mobile-container bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-lg font-semibold">Your Story</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate && onNavigate("story-insights")}
          className="text-primary hover:text-primary/80"
        >
          <BarChart3 size={20} />
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Story Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-semibold">AC</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold">Alice Caller</p>
              <p className="text-sm text-muted-foreground">
                {new Date(storyData.postedAt).toLocaleString()}
              </p>
            </div>
            <div 
              className="text-right cursor-pointer hover:bg-muted/50 rounded-lg p-2 -m-2 transition-colors group"
              onClick={() => onNavigate && onNavigate("story-insights")}
            >
              <div className="flex items-center gap-1 text-sm text-primary group-hover:text-primary/80">
                <Eye size={14} />
                <span className="underline underline-offset-2">{views}</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Tap to see who viewed</p>
            </div>
          </div>

          {/* Story Metadata */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{storyData.duration}h remaining</span>
            </div>
            {storyData.monetized && (
              <div className="flex items-center gap-1 text-wallet-blue">
                <DollarSign size={14} />
                <span>{storyData.price} credits</span>
              </div>
            )}
            <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
              {storyData.privacy}
            </div>
          </div>
        </div>

        {/* Story Content */}
        <div className="p-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">{storyData.title}</h2>
            
            {storyData.type === "text" && (
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {storyData.content}
                </p>
              </div>
            )}
            
            {storyData.type === "image" && (
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center mb-4">
                <span className="text-muted-foreground">📸 Image Story</span>
              </div>
            )}
            
            {storyData.type === "voice" && (
              <div className="bg-gradient-to-r from-live-red/10 to-live-red/5 rounded-lg p-6 text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-live-red/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎵</span>
                </div>
                <p className="text-live-red font-semibold">Voice Story</p>
                <p className="text-sm text-muted-foreground">Tap to play</p>
              </div>
            )}
            
            {storyData.type === "video" && (
              <div className="bg-gradient-to-r from-streams-purple/10 to-streams-purple/5 rounded-lg h-48 flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-streams-purple/20 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📹</span>
                  </div>
                  <p className="text-streams-purple font-semibold">Video Story</p>
                  <p className="text-sm text-muted-foreground">Tap to play</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Story Stats - Now Clickable */}
        <div className="p-4 border-t border-border">
          <Card 
            className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => onNavigate && onNavigate("story-insights")}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Story Performance</h3>
              <div className="flex items-center gap-1 text-xs text-primary">
                <BarChart3 size={12} />
                <span>View details</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{views}</div>
                <div className="text-xs text-muted-foreground">Views</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-live-red">{likes}</div>
                <div className="text-xs text-muted-foreground">Likes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-wallet-blue">
                  {storyData.monetized ? `$${(views * storyData.price * 0.8).toFixed(2)}` : "$0.00"}
                </div>
                <div className="text-xs text-muted-foreground">Earned</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-border bg-background">
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLiked(!liked)}
            className={liked ? "text-live-red" : "text-muted-foreground"}
          >
            <Heart size={20} className={liked ? "fill-current" : ""} />
            <span className="ml-2">{likes}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground"
            onClick={() => onNavigate && onNavigate("comments")}
          >
            <MessageCircle size={20} />
            <span className="ml-2">Comment</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground"
            onClick={() => onNavigate && onNavigate("share")}
          >
            <Share size={20} />
            <span className="ml-2">Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewStoryScreen;