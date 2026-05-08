import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Bell, BellOff, Volume2, Vibrate } from "lucide-react";

const NotificationSettingsScreen = ({ 
  user, 
  onBack 
}: { 
  user: { name: string; username: string; rate: number; online: boolean }; 
  onBack: () => void; 
}) => {
  const [notifications, setNotifications] = useState({
    messages: true,
    calls: true,
    sounds: true,
    vibration: true,
    previews: true
  });
  const [muteUntil, setMuteUntil] = useState<string>("");

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
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
            <h1 className="text-lg font-semibold">Notifications</h1>
            <p className="text-xs text-muted-foreground">{user.name}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Quick Mute */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <BellOff size={18} className="text-primary" />
            Quick Mute
          </h3>
          <div className="space-y-3">
            <Select value={muteUntil} onValueChange={setMuteUntil}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Mute notifications until..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15min">15 minutes</SelectItem>
                <SelectItem value="1hour">1 hour</SelectItem>
                <SelectItem value="8hours">8 hours</SelectItem>
                <SelectItem value="24hours">24 hours</SelectItem>
                <SelectItem value="forever">Until I turn it back on</SelectItem>
              </SelectContent>
            </Select>
            {muteUntil && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Notifications from {user.name} will be muted {muteUntil === 'forever' ? 'until you turn them back on' : `for ${muteUntil.replace('min', ' minutes').replace('hour', ' hour').replace('hours', ' hours')}`}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Notification Types */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Bell size={18} className="text-primary" />
            Notification Types
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Messages</p>
                <p className="text-sm text-muted-foreground">Get notified for new messages</p>
              </div>
              <Switch
                checked={notifications.messages}
                onCheckedChange={() => handleToggle('messages')}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Voice & Video Calls</p>
                <p className="text-sm text-muted-foreground">Get notified for incoming calls</p>
              </div>
              <Switch
                checked={notifications.calls}
                onCheckedChange={() => handleToggle('calls')}
              />
            </div>
          </div>
        </div>

        {/* Sound & Vibration */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Volume2 size={18} className="text-primary" />
            Sound & Vibration
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Sound</p>
                <p className="text-sm text-muted-foreground">Play notification sounds</p>
              </div>
              <Switch
                checked={notifications.sounds}
                onCheckedChange={() => handleToggle('sounds')}
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Vibration</p>
                <p className="text-sm text-muted-foreground">Vibrate for notifications</p>
              </div>
              <Switch
                checked={notifications.vibration}
                onCheckedChange={() => handleToggle('vibration')}
              />
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="space-y-4">
          <h3 className="font-semibold">Privacy</h3>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="font-medium">Show Previews</p>
              <p className="text-sm text-muted-foreground">Show message content in notifications</p>
            </div>
            <Switch
              checked={notifications.previews}
              onCheckedChange={() => handleToggle('previews')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettingsScreen;