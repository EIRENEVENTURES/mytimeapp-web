import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ArrowLeft, DollarSign, Clock, Info } from "lucide-react";

const ChatRateSettingsScreen = ({ onBack, onSaveSettings }: { onBack: () => void; onSaveSettings: () => void }) => {
  const [ratePerSecond, setRatePerSecond] = useState("5");
  const [enableRateCharging, setEnableRateCharging] = useState(true);
  
  const [autoEndAfterInactivity, setAutoEndAfterInactivity] = useState(true);
  const [inactivityTimeout, setInactivityTimeout] = useState("5");
  

  const estimatedEarnings = {
    minute: (parseFloat(ratePerSecond) * 60).toFixed(0),
    hour: (parseFloat(ratePerSecond) * 3600).toFixed(0)
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
            <h1 className="text-lg font-semibold">Chat Rate Settings</h1>
            <p className="text-xs text-muted-foreground">Configure your chat pricing</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Rate Configuration */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <DollarSign size={18} className="text-primary" />
            Rate Configuration
          </h3>
          
          <Card className="p-4 space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Rate per Second (Credits)</label>
              <Input
                type="number"
                step="1"
                min="1"
                max="1000"
                value={ratePerSecond}
                onChange={(e) => setRatePerSecond(e.target.value)}
                placeholder="5"
                className="text-center text-lg font-semibold"
              />
              <div className="mt-2 p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Estimated Earnings:</p>
                <div className="flex justify-between text-sm">
                  <span>Per minute: <span className="font-semibold text-wallet-blue">{estimatedEarnings.minute} credits</span></span>
                  <span>Per hour: <span className="font-semibold text-wallet-blue">{estimatedEarnings.hour} credits</span></span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable Rate Charging</p>
                <p className="text-sm text-muted-foreground">Charge users for chatting with you</p>
              </div>
              <Switch
                checked={enableRateCharging}
                onCheckedChange={setEnableRateCharging}
              />
            </div>

          </Card>
        </div>

        {/* Chat Duration Settings */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock size={18} className="text-primary" />
            Duration Settings
          </h3>
          
          <Card className="p-4 space-y-4">

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-end After Inactivity</p>
                <p className="text-sm text-muted-foreground">Automatically end chat after inactivity</p>
              </div>
              <Switch
                checked={autoEndAfterInactivity}
                onCheckedChange={setAutoEndAfterInactivity}
              />
            </div>

            {autoEndAfterInactivity && (
              <div>
                <label className="text-sm font-medium mb-2 block">Inactivity Timeout (minutes)</label>
                <Input
                  type="number"
                  min="1"
                  max="60"
                  value={inactivityTimeout}
                  onChange={(e) => setInactivityTimeout(e.target.value)}
                  placeholder="5"
                />
              </div>
            )}
          </Card>
        </div>


        {/* Rate Preview Card */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-primary mt-0.5" />
            <div>
              <h4 className="font-semibold text-primary mb-2">Rate Preview</h4>
              <div className="space-y-1 text-sm">
                <p>Your rate: <span className="font-semibold">{ratePerSecond} credits/second</span></p>
                
                
              </div>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <Button className="w-full" size="lg" onClick={onSaveSettings}>
          Save Rate Settings
        </Button>
      </div>
    </div>
  );
};

export default ChatRateSettingsScreen;