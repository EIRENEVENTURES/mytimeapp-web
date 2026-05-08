import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Volume2, Mic, Bell, Shield, Eye } from "lucide-react";

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

const SpaceSettingsScreen = ({ onBack, space }: { onBack: () => void; space: Space }) => {
  const [audioQuality, setAudioQuality] = useState([75]);
  const [micVolume, setMicVolume] = useState([80]);
  const [speakerVolume, setSpeakerVolume] = useState([85]);
  const [notifications, setNotifications] = useState(true);
  const [joinLeaveAlerts, setJoinLeaveAlerts] = useState(true);
  const [backgroundNoise, setBackgroundNoise] = useState(false);
  const [autoMute, setAutoMute] = useState(false);
  const [showParticipants, setShowParticipants] = useState(true);
  const [recordingAlert, setRecordingAlert] = useState(true);

  const handleSaveSettings = () => {
    // Save settings logic would go here
    onBack();
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
            <h1 className="text-lg font-semibold">Space Settings</h1>
            <p className="text-xs text-muted-foreground">{space.title}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Audio Settings */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Volume2 size={18} className="text-spaces-orange" />
            Audio Settings
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Audio Quality</label>
                <span className="text-sm text-muted-foreground">{audioQuality[0]}%</span>
              </div>
              <Slider
                value={audioQuality}
                onValueChange={setAudioQuality}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Higher quality uses more data
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Mic size={16} />
                  Microphone Volume
                </label>
                <span className="text-sm text-muted-foreground">{micVolume[0]}%</span>
              </div>
              <Slider
                value={micVolume}
                onValueChange={setMicVolume}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Volume2 size={16} />
                  Speaker Volume
                </label>
                <span className="text-sm text-muted-foreground">{speakerVolume[0]}%</span>
              </div>
              <Slider
                value={speakerVolume}
                onValueChange={setSpeakerVolume}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Background Noise Suppression</p>
                <p className="text-sm text-muted-foreground">
                  Reduce background noise from your microphone
                </p>
              </div>
              <Switch
                checked={backgroundNoise}
                onCheckedChange={setBackgroundNoise}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-mute when joining</p>
                <p className="text-sm text-muted-foreground">
                  Start with microphone muted by default
                </p>
              </div>
              <Switch
                checked={autoMute}
                onCheckedChange={setAutoMute}
              />
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Bell size={18} className="text-spaces-orange" />
            Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Space Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get notified about space activities
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Join/Leave Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Hear sounds when people join or leave
                </p>
              </div>
              <Switch
                checked={joinLeaveAlerts}
                onCheckedChange={setJoinLeaveAlerts}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Recording Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when recording starts/stops
                </p>
              </div>
              <Switch
                checked={recordingAlert}
                onCheckedChange={setRecordingAlert}
              />
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Shield size={18} className="text-spaces-orange" />
            Privacy & Display
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Participant List</p>
                <p className="text-sm text-muted-foreground">
                  Display all participants in the space
                </p>
              </div>
              <Switch
                checked={showParticipants}
                onCheckedChange={setShowParticipants}
              />
            </div>
          </div>
        </Card>

        {/* Cost Information */}
        {space.credits > 0 && (
          <Card className="p-4 bg-wallet-blue/5 border-wallet-blue/20">
            <h3 className="font-semibold mb-2 text-wallet-blue">💰 Current Session</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Rate:</span>
                <span className="font-semibold">{space.credits} credits/sec</span>
              </div>
              <div className="flex justify-between">
                <span>Time elapsed:</span>
                <span className="font-semibold">2m 45s</span>
              </div>
              <div className="flex justify-between">
                <span>Cost so far:</span>
                <span className="font-semibold text-wallet-blue">1,650 credits</span>
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-spaces-orange hover:bg-spaces-orange/90 text-white" 
            size="lg"
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            size="lg"
            onClick={onBack}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpaceSettingsScreen;