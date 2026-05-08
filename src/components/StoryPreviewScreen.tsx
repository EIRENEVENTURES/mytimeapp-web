import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Type, Camera, Mic, Video, Clock, Eye, Edit } from "lucide-react";

interface StoryPreviewScreenProps {
  storyData: any;
  onBack: () => void;
  onEdit: () => void;
  onNext: (storyData: any) => void;
}

const StoryPreviewScreen = ({ storyData, onBack, onEdit, onNext }: StoryPreviewScreenProps) => {
  const getStoryTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return <Type size={24} className="text-chat-green" />;
      case "image":
        return <Camera size={24} className="text-wallet-blue" />;
      case "voice":
        return <Mic size={24} className="text-live-red" />;
      case "video":
        return <Video size={24} className="text-streams-purple" />;
      default:
        return <Type size={24} className="text-muted-foreground" />;
    }
  };

  const getStoryTypeLabel = (type: string) => {
    switch (type) {
      case "text":
        return "Text Story";
      case "image":
        return "Photo Story";
      case "voice":
        return "Voice Story";
      case "video":
        return "Video Story";
      default:
        return "Story";
    }
  };

  const getStoryTypeColor = (type: string) => {
    switch (type) {
      case "text":
        return "bg-chat-green/10 border-chat-green/30";
      case "image":
        return "bg-wallet-blue/10 border-wallet-blue/30";
      case "voice":
        return "bg-live-red/10 border-live-red/30";
      case "video":
        return "bg-streams-purple/10 border-streams-purple/30";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="mobile-container flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="font-semibold">Preview Story</h1>
              <p className="text-sm text-muted-foreground">Review before posting</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="gap-2"
          >
            <Edit size={16} />
            Edit
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Story Type Badge */}
        <div className="flex items-center justify-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getStoryTypeColor(storyData?.type)}`}>
            {getStoryTypeIcon(storyData?.type)}
            <span className="font-medium">{getStoryTypeLabel(storyData?.type)}</span>
          </div>
        </div>

        {/* Story Preview Card */}
        <Card className="p-6 space-y-4">
          {/* Title */}
          {storyData?.title && (
            <div>
              <h2 className="text-xl font-bold">{storyData.title}</h2>
            </div>
          )}

          {/* Content Preview */}
          <div className="space-y-4">
            {storyData?.type === "text" && storyData?.content && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-foreground whitespace-pre-wrap">{storyData.content}</p>
              </div>
            )}

            {storyData?.type === "image" && (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Camera size={48} className="mx-auto mb-2 text-wallet-blue" />
                  <p className="text-sm text-muted-foreground">Image Preview</p>
                </div>
              </div>
            )}

            {storyData?.type === "voice" && (
              <div className="p-6 bg-live-red/10 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Mic size={48} className="mx-auto mb-2 text-live-red" />
                  <p className="text-sm text-muted-foreground">Voice Recording</p>
                  <p className="text-xs text-muted-foreground mt-1">Tap to play preview</p>
                </div>
              </div>
            )}

            {storyData?.type === "video" && (
              <div className="aspect-video bg-streams-purple/10 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Video size={48} className="mx-auto mb-2 text-streams-purple" />
                  <p className="text-sm text-muted-foreground">Video Preview</p>
                  <p className="text-xs text-muted-foreground mt-1">Tap to play</p>
                </div>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>Just now</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>Preview Mode</span>
            </div>
          </div>
        </Card>

        {/* Preview Info */}
        <Card className="p-4 bg-muted/50">
          <h3 className="font-medium mb-2">What happens next?</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Set privacy options (public or private)</li>
            <li>• Configure monetization settings</li>
            <li>• Choose how long your story stays visible</li>
            <li>• Publish your story for others to see</li>
          </ul>
        </Card>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border bg-background">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onEdit}
          >
            Edit Story
          </Button>
          <Button
            className="flex-1 bg-primary hover:bg-primary/90"
            onClick={() => onNext(storyData)}
          >
            Continue to Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoryPreviewScreen;
