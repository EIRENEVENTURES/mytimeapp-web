import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Heart, MessageCircle, Send } from "lucide-react";

const CommentScreen = ({ 
  storyData, 
  onBack 
}: { 
  storyData: any; 
  onBack: () => void; 
}) => {
  const [comment, setComment] = useState("");
  const [comments] = useState([
    {
      id: 1,
      user: "john_doe",
      avatar: "JD",
      text: "Great story! Really inspiring content 👏",
      time: "2 hours ago",
      likes: 3
    },
    {
      id: 2,
      user: "sarah_wilson",
      avatar: "SW",
      text: "Love this perspective. Thanks for sharing your experience!",
      time: "5 hours ago",
      likes: 1
    }
  ]);

  const handleSendComment = () => {
    if (comment.trim()) {
      // Handle comment submission
      setComment("");
    }
  };

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
        <h1 className="text-lg font-semibold">Comments</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 flex flex-col">
        {/* Story Preview */}
        <div className="p-4 border-b border-border">
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="font-semibold text-sm">AC</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Alice Caller</p>
                <p className="text-xs text-muted-foreground">{storyData.title}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {comments.map((commentItem) => (
            <Card key={commentItem.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-semibold text-xs">{commentItem.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm">{commentItem.user}</p>
                    <p className="text-xs text-muted-foreground">{commentItem.time}</p>
                  </div>
                  <p className="text-sm text-foreground mb-2">{commentItem.text}</p>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground p-0 h-auto">
                      <Heart size={14} className="mr-1" />
                      <span className="text-xs">{commentItem.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground p-0 h-auto">
                      <MessageCircle size={14} className="mr-1" />
                      <span className="text-xs">Reply</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Comment Input */}
        <div className="p-4 border-t border-border bg-background">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="font-semibold text-xs">AC</span>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
              />
              <Button
                size="sm"
                onClick={handleSendComment}
                disabled={!comment.trim()}
                className="px-3"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentScreen;