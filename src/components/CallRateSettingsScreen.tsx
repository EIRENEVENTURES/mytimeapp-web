import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, DollarSign, Clock, Info, Zap, Phone, Video, Check, ChevronsUpDown } from "lucide-react";

const CallRateSettingsScreen = ({ onBack, onSaveSettings }: { onBack: () => void; onSaveSettings: () => void }) => {
  const [voiceRatePerSecond, setVoiceRatePerSecond] = useState("3");
  const [videoRatePerSecond, setVideoRatePerSecond] = useState("5");
  const [enableCallRateCharging, setEnableCallRateCharging] = useState(true);
  const [minimumCallDuration, setMinimumCallDuration] = useState("60");
  const [autoEndAfterInactivity, setAutoEndAfterInactivity] = useState(true);
  const [inactivityTimeout, setInactivityTimeout] = useState("10");
  const [requirePrePayment, setRequirePrePayment] = useState(true);
  const [minimumBalance, setMinimumBalance] = useState("1000");
  const [callCategory, setCallCategory] = useState("general");
  const [enableVideoRates, setEnableVideoRates] = useState(true);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const categories = [
    { value: "general", label: "General Conversation" },
    { value: "consultation", label: "Professional Consultation" },
    { value: "coaching", label: "Life/Career Coaching" },
    { value: "business", label: "Business Discussion" },
    { value: "technical", label: "Technical Support" },
    { value: "creative", label: "Creative Collaboration" },
    { value: "tutoring", label: "Tutoring/Teaching" },
  ];

  const voiceEstimatedEarnings = {
    minute: (parseFloat(voiceRatePerSecond) * 60).toFixed(0),
    hour: (parseFloat(voiceRatePerSecond) * 3600).toFixed(0)
  };

  const videoEstimatedEarnings = {
    minute: (parseFloat(videoRatePerSecond) * 60).toFixed(0),
    hour: (parseFloat(videoRatePerSecond) * 3600).toFixed(0)
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
            <h1 className="text-lg font-semibold">Call Rate Settings</h1>
            <p className="text-xs text-muted-foreground">Configure your voice & video call pricing</p>
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
            {/* Voice Call Rates */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Phone size={16} className="text-calls-green" />
                <label className="text-sm font-medium">Voice Call Rate (Credits/sec)</label>
              </div>
              <Input
                type="number"
                step="1"
                min="1"
                max="1000"
                value={voiceRatePerSecond}
                onChange={(e) => setVoiceRatePerSecond(e.target.value)}
                placeholder="3"
                className="text-center text-lg font-semibold"
              />
              <div className="mt-2 p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Voice Call Earnings:</p>
                <div className="flex justify-between text-sm">
                  <span>Per minute: <span className="font-semibold text-calls-green">{voiceEstimatedEarnings.minute} credits</span></span>
                  <span>Per hour: <span className="font-semibold text-calls-green">{voiceEstimatedEarnings.hour} credits</span></span>
                </div>
              </div>
            </div>

            {/* Video Call Rates Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable Different Video Rates</p>
                <p className="text-sm text-muted-foreground">Set different rates for video calls</p>
              </div>
              <Switch
                checked={enableVideoRates}
                onCheckedChange={setEnableVideoRates}
              />
            </div>

            {/* Video Call Rates */}
            {enableVideoRates && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Video size={16} className="text-calls-green" />
                  <label className="text-sm font-medium">Video Call Rate (Credits/sec)</label>
                </div>
                <Input
                  type="number"
                  step="1"
                  min="1"
                  max="1000"
                  value={videoRatePerSecond}
                  onChange={(e) => setVideoRatePerSecond(e.target.value)}
                  placeholder="5"
                  className="text-center text-lg font-semibold"
                />
                <div className="mt-2 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Video Call Earnings:</p>
                  <div className="flex justify-between text-sm">
                    <span>Per minute: <span className="font-semibold text-calls-green">{videoEstimatedEarnings.minute} credits</span></span>
                    <span>Per hour: <span className="font-semibold text-calls-green">{videoEstimatedEarnings.hour} credits</span></span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable Rate Charging</p>
                <p className="text-sm text-muted-foreground">Charge users for calling you</p>
              </div>
              <Switch
                checked={enableCallRateCharging}
                onCheckedChange={setEnableCallRateCharging}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Call Category</label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {callCategory
                      ? categories.find((category) => category.value === callCategory)?.label || callCategory
                      : "Select category..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput 
                      placeholder="Search or type custom category..." 
                      value={searchValue}
                      onValueChange={setSearchValue}
                    />
                    <CommandList>
                      <CommandEmpty>
                        {searchValue && (
                          <div className="p-2">
                            <p className="text-sm text-muted-foreground mb-2">No category found.</p>
                            <Button 
                              size="sm" 
                              className="w-full"
                              onClick={() => {
                                setCallCategory(searchValue);
                                setOpen(false);
                                setSearchValue("");
                              }}
                            >
                              Use "{searchValue}" as custom category
                            </Button>
                          </div>
                        )}
                      </CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            key={category.value}
                            value={category.value}
                            onSelect={(currentValue) => {
                              setCallCategory(currentValue);
                              setOpen(false);
                              setSearchValue("");
                            }}
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${
                                callCategory === category.value ? "opacity-100" : "opacity-0"
                              }`}
                            />
                            {category.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
        </div>

        {/* Call Duration Settings */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock size={18} className="text-primary" />
            Duration Settings
          </h3>
          
          <Card className="p-4 space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Minimum Call Duration (seconds)</label>
              <Input
                type="number"
                min="30"
                max="600"
                value={minimumCallDuration}
                onChange={(e) => setMinimumCallDuration(e.target.value)}
                placeholder="60"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Callers will be charged for at least this duration
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-end After Inactivity</p>
                <p className="text-sm text-muted-foreground">Automatically end calls after silence</p>
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
                  max="30"
                  value={inactivityTimeout}
                  onChange={(e) => setInactivityTimeout(e.target.value)}
                  placeholder="10"
                />
              </div>
            )}
          </Card>
        </div>

        {/* Payment Settings */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Zap size={18} className="text-primary" />
            Payment Settings
          </h3>
          
          <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Require Pre-payment</p>
                <p className="text-sm text-muted-foreground">Callers must have sufficient balance before calling</p>
              </div>
              <Switch
                checked={requirePrePayment}
                onCheckedChange={setRequirePrePayment}
              />
            </div>

            {requirePrePayment && (
              <div>
                <label className="text-sm font-medium mb-2 block">Minimum Balance Required (Credits)</label>
                <Input
                  type="number"
                  step="100"
                  min="100"
                  max="50000"
                  value={minimumBalance}
                  onChange={(e) => setMinimumBalance(e.target.value)}
                  placeholder="1000"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Callers need at least this many credits to start a call
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Rate Preview Card */}
        <Card className="p-4 bg-calls-green/5 border-calls-green/20">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-calls-green mt-0.5" />
            <div>
              <h4 className="font-semibold text-calls-green mb-2">Rate Preview</h4>
              <div className="space-y-1 text-sm">
                <p>Voice rate: <span className="font-semibold">{voiceRatePerSecond} credits/second</span></p>
                {enableVideoRates && (
                  <p>Video rate: <span className="font-semibold">{videoRatePerSecond} credits/second</span></p>
                )}
                <p>Category: <span className="font-semibold capitalize">{callCategory.replace('-', ' ')}</span></p>
                <p>Min duration: <span className="font-semibold">{minimumCallDuration} seconds</span></p>
                {requirePrePayment && (
                  <p>Min balance: <span className="font-semibold">{minimumBalance} credits</span></p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <Button className="w-full" size="lg" onClick={onSaveSettings}>
          Save Call Rate Settings
        </Button>
      </div>
    </div>
  );
};

export default CallRateSettingsScreen;