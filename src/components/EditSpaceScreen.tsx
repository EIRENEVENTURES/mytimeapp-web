import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Users, DollarSign, Lock, Globe } from "lucide-react";
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

const EditSpaceScreen = ({ onBack, space }: { onBack: () => void; space: Space }) => {
  const [title, setTitle] = useState(space.title);
  const [description, setDescription] = useState("A collaborative space for discussions");
  const [maxParticipants, setMaxParticipants] = useState(space.maxParticipants);
  const [credits, setCredits] = useState(space.credits);
  const [isPrivate, setIsPrivate] = useState(false);
  const [allowRecording, setAllowRecording] = useState(true);
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Space Updated",
      description: "Your space settings have been saved successfully.",
    });
    onBack();
  };

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
            <h1 className="font-semibold">Edit Space</h1>
            <p className="text-sm text-muted-foreground">Modify your space settings</p>
          </div>
          <Button onClick={handleSave} className="bg-spaces-orange hover:bg-spaces-orange/90 text-white">
            Save
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Basic Info */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Space Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter space title"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your space..."
                className="mt-1"
                rows={3}
              />
            </div>
          </div>
        </Card>

        {/* Capacity & Pricing */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Capacity & Pricing</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="maxParticipants" className="flex items-center gap-2">
                <Users size={16} />
                Max Participants
              </Label>
              <Input
                id="maxParticipants"
                type="number"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(Number(e.target.value))}
                min="2"
                max="500"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="credits" className="flex items-center gap-2">
                <DollarSign size={16} />
                Credits per second
              </Label>
              <Input
                id="credits"
                type="number"
                value={credits}
                onChange={(e) => setCredits(Number(e.target.value))}
                min="0"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Set to 0 for free space
              </p>
            </div>
          </div>
        </Card>

        {/* Privacy & Settings */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Privacy & Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="flex items-center gap-2">
                  <Lock size={16} />
                  Private Space
                </Label>
                <p className="text-sm text-muted-foreground">
                  Only invited users can join
                </p>
              </div>
              <Switch
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Recording</Label>
                <p className="text-sm text-muted-foreground">
                  Let participants record the session
                </p>
              </div>
              <Switch
                checked={allowRecording}
                onCheckedChange={setAllowRecording}
              />
            </div>
          </div>
        </Card>

        {/* Current Status */}
        <Card className="p-4 bg-muted/50">
          <h4 className="font-medium text-sm mb-2">Current Status</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• Status: {space.status}</p>
            <p>• Current participants: {space.participants}</p>
            <p>• Space ID: #{space.id}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EditSpaceScreen;