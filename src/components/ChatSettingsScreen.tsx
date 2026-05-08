import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Settings, Palette, Clock, Shield, MessageCircle } from "lucide-react";

const ChatSettingsScreen = ({ 
  user, 
  onBack 
}: { 
  user: { name: string; username: string; rate: number; online: boolean }; 
  onBack: () => void; 
}) => {
  const [settings, setSettings] = useState({
    autoScroll: true,
    showTimestamps: true,
    showReadReceipts: true,
    saveToGallery: false,
    compressImages: true,
    enterToSend: true
  });
  const [chatTheme, setChatTheme] = useState("default");
  const [fontSize, setFontSize] = useState("medium");

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="mobile-container flex flex-col h-screen">
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
          <div>
            <h1 className="text-lg font-semibold">Chat Settings</h1>
            <p className="text-xs text-muted-foreground">with {user.name}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Appearance */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Palette size={18} className="text-primary" />
            Appearance
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Chat Theme</label>
              <Select value={chatTheme} onValueChange={setChatTheme}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="blue">Ocean Blue</SelectItem>
                  <SelectItem value="green">Forest Green</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Font Size</label>
              <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="extra-large">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Message Behavior */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <MessageCircle size={18} className="text-primary" />
            Message Behavior
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Auto Scroll</p>
                <p className="text-sm text-muted-foreground">Automatically scroll to new messages</p>
              </div>
              <Switch
                checked={settings.autoScroll}
                onCheckedChange={() => handleToggle('autoScroll')}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Enter to Send</p>
                <p className="text-sm text-muted-foreground">Send messages with Enter key</p>
              </div>
              <Switch
                checked={settings.enterToSend}
                onCheckedChange={() => handleToggle('enterToSend')}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Show Timestamps</p>
                <p className="text-sm text-muted-foreground">Display message timestamps</p>
              </div>
              <Switch
                checked={settings.showTimestamps}
                onCheckedChange={() => handleToggle('showTimestamps')}
              />
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Shield size={18} className="text-primary" />
            Privacy
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Read Receipts</p>
                <p className="text-sm text-muted-foreground">Show when messages are read</p>
              </div>
              <Switch
                checked={settings.showReadReceipts}
                onCheckedChange={() => handleToggle('showReadReceipts')}
              />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="space-y-4">
          <h3 className="font-semibold">Media Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Auto Save to Gallery</p>
                <p className="text-sm text-muted-foreground">Automatically save received photos</p>
              </div>
              <Switch
                checked={settings.saveToGallery}
                onCheckedChange={() => handleToggle('saveToGallery')}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Compress Images</p>
                <p className="text-sm text-muted-foreground">Reduce image size for faster sending</p>
              </div>
              <Switch
                checked={settings.compressImages}
                onCheckedChange={() => handleToggle('compressImages')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSettingsScreen;