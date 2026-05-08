import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Monitor, Smartphone, RectangleHorizontal, Chrome, Check, X } from "lucide-react";

interface ShareScreenScreenProps {
  user: { name: string; username: string; rate: string; online: boolean };
  onBack: () => void;
  callType: 'voice' | 'video';
}

const ShareScreenScreen = ({ user, onBack, callType }: ShareScreenScreenProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  const shareOptions = [
    {
      id: 'entire-screen',
      icon: Monitor,
      title: 'Entire Screen',
      description: 'Share your entire screen'
    },
    {
      id: 'application-window',
      icon: RectangleHorizontal,
      title: 'Application Window',
      description: 'Share a specific app window'
    },
    {
      id: 'browser-tab',
      icon: Chrome,
      title: 'Browser Tab',
      description: 'Share a specific browser tab'
    }
  ];

  const handleStartSharing = () => {
    if (selectedOption) {
      setIsSharing(true);
      // Simulate sharing start
      setTimeout(() => {
        onBack();
      }, 2000);
    }
  };

  const handleStopSharing = () => {
    setIsSharing(false);
    onBack();
  };

  return (
    <div className="mobile-container flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-foreground hover:text-foreground/80"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="text-center">
          <h1 className="text-lg font-semibold">Share Screen</h1>
          <p className="text-sm text-muted-foreground">
            {callType === 'voice' ? 'Voice Call' : 'Video Call'} with {user.name}
          </p>
        </div>
        <div className="w-10" />
      </div>

      {!isSharing ? (
        <div className="flex-1 p-6">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold mb-2">Choose what to share</h2>
            <p className="text-muted-foreground">
              Select what you want to share with {user.name}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {shareOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <Card
                  key={option.id}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedOption === option.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                      selectedOption === option.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      <IconComponent size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{option.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                    {selectedOption === option.id && (
                      <Check size={20} className="text-primary" />
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleStartSharing}
              disabled={!selectedOption}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3"
            >
              Start Sharing
            </Button>
            <Button
              variant="outline"
              onClick={onBack}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Monitor size={32} className="text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Screen Sharing Active</h2>
            <p className="text-muted-foreground">
              You're sharing your screen with {user.name}
            </p>
          </div>

          <div className="w-full max-w-sm">
            <Card className="p-4 mb-6 bg-primary/5 border-primary">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-primary">Sharing: Entire Screen</p>
                  <p className="text-sm text-muted-foreground">
                    {user.name} can see your screen
                  </p>
                </div>
                <div className="w-3 h-3 rounded-full bg-destructive animate-pulse"></div>
              </div>
            </Card>

            <Button
              onClick={handleStopSharing}
              variant="destructive"
              className="w-full"
            >
              <X size={20} className="mr-2" />
              Stop Sharing
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareScreenScreen;