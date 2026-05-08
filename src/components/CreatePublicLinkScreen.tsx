import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Link2, Copy, Share2, Globe, Lock, Users, Calendar, Clock, QrCode } from "lucide-react";

const CreatePublicLinkScreen = ({ onBack, spaceData }: { onBack: () => void; spaceData: any }) => {
  const [linkType, setLinkType] = useState("public");
  const [linkExpiry, setLinkExpiry] = useState("never");
  const [maxUses, setMaxUses] = useState("");
  const [requireApproval, setRequireApproval] = useState(false);
  const [allowSharing, setAllowSharing] = useState(true);
  
  const publicLink = `https://mytime.app/join/${Math.random().toString(36).substr(2, 12)}`;

  const copyLink = () => {
    navigator.clipboard.writeText(publicLink);
    // Toast notification would be shown here
  };

  const handleCreateLink = () => {
    // Here would be the logic to create the public link
    // For now, we'll just show success
    onBack();
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
          <h1 className="text-xl font-semibold">Create Public Link</h1>
        </div>
      </div>

      {/* Space Info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-spaces-orange/20 flex items-center justify-center">
            <Users size={20} className="text-spaces-orange" />
          </div>
          <div>
            <h3 className="font-semibold">{spaceData?.title || "My Space"}</h3>
            <p className="text-sm text-muted-foreground">
              {spaceData?.scheduleType === "now" ? "Live now" : "Scheduled space"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Link Type */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Link Type</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={linkType === "public" ? "default" : "outline"}
              onClick={() => setLinkType("public")}
              className="flex items-center gap-2 h-auto p-3 flex-col"
            >
              <Globe size={20} />
              <div className="text-center">
                <div className="font-medium">Public</div>
                <div className="text-xs opacity-80">Anyone with link can join</div>
              </div>
            </Button>
            <Button
              variant={linkType === "private" ? "default" : "outline"}
              onClick={() => setLinkType("private")}
              className="flex items-center gap-2 h-auto p-3 flex-col"
            >
              <Lock size={20} />
              <div className="text-center">
                <div className="font-medium">Private</div>
                <div className="text-xs opacity-80">Requires approval to join</div>
              </div>
            </Button>
          </div>
        </div>

        {/* Generated Link */}
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Space Link</Label>
              <Badge className={linkType === "public" ? "bg-chat-green/20 text-chat-green border-chat-green/30" : "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"}>
                {linkType.toUpperCase()}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Input
                value={publicLink}
                readOnly
                className="bg-background text-sm"
              />
              <Button size="sm" onClick={copyLink}>
                <Copy size={16} />
              </Button>
            </div>
          </div>
        </Card>

        {/* Link Settings */}
        <Card className="p-4 space-y-4">
          <Label className="text-base font-medium">Link Settings</Label>
          
          {/* Expiry */}
          <div className="space-y-2">
            <Label>Link Expires</Label>
            <Select value={linkExpiry} onValueChange={setLinkExpiry}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="1hour">1 Hour</SelectItem>
                <SelectItem value="24hours">24 Hours</SelectItem>
                <SelectItem value="7days">7 Days</SelectItem>
                <SelectItem value="30days">30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Max Uses */}
          <div className="space-y-2">
            <Label htmlFor="maxUses">Maximum Uses</Label>
            <Input
              id="maxUses"
              type="number"
              placeholder="Unlimited"
              value={maxUses}
              onChange={(e) => setMaxUses(e.target.value)}
              className="bg-background"
              min="1"
            />
            <p className="text-sm text-muted-foreground">Leave empty for unlimited uses</p>
          </div>

          {/* Options */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Require Approval</Label>
                <p className="text-sm text-muted-foreground">Host must approve before joining</p>
              </div>
              <Switch
                checked={requireApproval}
                onCheckedChange={setRequireApproval}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Allow Link Sharing</Label>
                <p className="text-sm text-muted-foreground">Users can share this link with others</p>
              </div>
              <Switch
                checked={allowSharing}
                onCheckedChange={setAllowSharing}
              />
            </div>
          </div>
        </Card>

        {/* Link Analytics */}
        <Card className="p-4 bg-card/50">
          <div className="space-y-3">
            <Label className="text-base font-medium">Link Analytics</Label>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-spaces-orange">0</div>
                <div className="text-sm text-muted-foreground">Clicks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-chat-green">0</div>
                <div className="text-sm text-muted-foreground">Joins</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-wallet-blue">0</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Share */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Quick Share</Label>
          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <QrCode size={16} />
              QR Code
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 size={16} />
              Share
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar size={16} />
              Schedule
            </Button>
          </div>
        </div>

        {/* Current Settings Summary */}
        <Card className="p-4 bg-spaces-orange/10 border-spaces-orange/20">
          <div className="space-y-2">
            <Label className="text-base font-medium text-spaces-orange">Link Summary</Label>
            <div className="text-sm space-y-1">
              <p>• Type: {linkType === "public" ? "Public access" : "Requires approval"}</p>
              <p>• Expires: {linkExpiry === "never" ? "Never" : linkExpiry}</p>
              <p>• Max uses: {maxUses || "Unlimited"}</p>
              <p>• Link sharing: {allowSharing ? "Allowed" : "Disabled"}</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" className="flex-1" onClick={onBack}>
            Cancel
          </Button>
          <Button
            className="flex-1 bg-spaces-orange hover:bg-spaces-orange/90 text-white"
            onClick={handleCreateLink}
          >
            <Link2 size={16} className="mr-2" />
            Create Link
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePublicLinkScreen;