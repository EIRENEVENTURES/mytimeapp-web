import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Copy, Share2, MessageCircle, Mail, Twitter, Facebook, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Space {
  id: number;
  title: string;
  host: string;
  username: string;
  type: string;
  participants: number;
  maxParticipants: number;
  credits: number;
  status: string;
}

const SpaceShareScreen = ({ onBack, space }: { onBack: () => void; space: Space }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const spaceLink = `https://mytime.app/space/${space.id}`;
  const shareText = `Join "${space.title}" hosted by ${space.host} on MyTime`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(spaceLink);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Space link has been copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "text-green-600",
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${spaceLink}`)}`
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "text-blue-500",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(spaceLink)}`
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "text-blue-600",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(spaceLink)}`
    },
    {
      name: "Email",
      icon: Mail,
      color: "text-gray-600",
      url: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${shareText}\n\n${spaceLink}`)}`
    }
  ];

  return (
    <div className="mobile-container flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-background">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold">Share Space</h1>
            <p className="text-sm text-muted-foreground">Invite others to join</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Space Info */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-spaces-orange/20 flex items-center justify-center">
              <Share2 size={20} className="text-spaces-orange" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{space.title}</h3>
              <p className="text-sm text-muted-foreground">
                Hosted by {space.host} • {space.participants}/{space.maxParticipants} participants
              </p>
              {space.credits > 0 && (
                <p className="text-sm text-wallet-blue font-medium">
                  💰 {space.credits} credits/sec
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Copy Link */}
        <div className="space-y-3">
          <h3 className="font-medium">Share Link</h3>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Input 
                value={spaceLink} 
                readOnly 
                className="flex-1 text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="shrink-0"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </Button>
            </div>
          </Card>
        </div>

        {/* Share Options */}
        <div className="space-y-3">
          <h3 className="font-medium">Share via</h3>
          <div className="grid grid-cols-2 gap-3">
            {shareOptions.map((option) => (
              <Card key={option.name} className="p-4">
                <a
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium hover:opacity-75 transition-opacity"
                >
                  <option.icon size={20} className={option.color} />
                  {option.name}
                </a>
              </Card>
            ))}
          </div>
        </div>

        {/* Share Instructions */}
        <Card className="p-4 bg-muted/50">
          <h4 className="font-medium text-sm mb-2">How to share:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Copy the link and send it directly</li>
            <li>• Share via social media or messaging apps</li>
            <li>• Recipients can join by clicking the link</li>
            {space.credits > 0 && (
              <li>• Note: This is a paid space ({space.credits} credits/sec)</li>
            )}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default SpaceShareScreen;