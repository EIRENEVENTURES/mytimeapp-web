import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Camera, Mic, Video, Type, Upload, DollarSign } from "lucide-react";

const CreateStoryScreen = ({ onBack, onNext }: { onBack: () => void; onNext: (storyData: any) => void }) => {
  const [selectedType, setSelectedType] = useState<"text" | "image" | "voice" | "video" | null>(null);
  const [textContent, setTextContent] = useState("");
  const [title, setTitle] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [creditPerView, setCreditPerView] = useState("3");
  const storyTypes = [
    {
      type: "text" as const,
      icon: Type,
      title: "Text Story",
      subtitle: "Share your thoughts",
      color: "text-chat-green"
    },
    {
      type: "image" as const,
      icon: Camera,
      title: "Photo Story",
      subtitle: "Upload an image",
      color: "text-wallet-blue"
    },
    {
      type: "voice" as const,
      icon: Mic,
      title: "Voice Story",
      subtitle: "Record audio",
      color: "text-live-red"
    },
    {
      type: "video" as const,
      icon: Video,
      title: "Video Story",
      subtitle: "Upload or record video",
      color: "text-streams-purple"
    }
  ];

  const handleNext = () => {
    if (!selectedType) return;
    
    const storyData = {
      type: selectedType,
      title,
      content: textContent,
      isPaid,
      creditPerView: isPaid ? parseInt(creditPerView) : 0,
      timestamp: new Date().toISOString()
    };
    
    onNext(storyData);
  };

  return (
    <div className="mobile-container">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-semibold">Create Story</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Free/Paid Toggle */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <DollarSign size={20} className="text-wallet-blue" />
              <div>
                <h3 className="font-semibold">{isPaid ? "Paid Story" : "Free Story"}</h3>
                <p className="text-sm text-muted-foreground">
                  {isPaid ? "Viewers pay credits to view" : "Anyone can view for free"}
                </p>
              </div>
            </div>
            <Switch
              checked={isPaid}
              onCheckedChange={setIsPaid}
            />
          </div>

          {isPaid && (
            <div className="pt-4 border-t border-border space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rate (Credits/view)</label>
                <div className="flex items-center gap-2">
                  <span className="text-wallet-blue">💰</span>
                  <input
                    type="number"
                    value={creditPerView}
                    onChange={(e) => setCreditPerView(e.target.value)}
                    step="1"
                    min="1"
                    className="flex-1 px-3 py-2 rounded-md border border-border bg-input text-sm"
                  />
                  <span className="text-sm text-muted-foreground">credits/view</span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Story Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Story Title</label>
          <Input
            placeholder="What's your story about?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-input border-border"
          />
        </div>

        {/* Story Type Selection */}
        {!selectedType ? (
          <div>
            <h2 className="text-lg font-semibold mb-4">Choose Story Type</h2>
            <div className="grid grid-cols-2 gap-3">
              {storyTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Card
                    key={type.type}
                    className="p-4 cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => setSelectedType(type.type)}
                  >
                    <div className="text-center">
                      <Icon size={32} className={`mx-auto mb-2 ${type.color}`} />
                      <h3 className="font-semibold">{type.title}</h3>
                      <p className="text-sm text-muted-foreground">{type.subtitle}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedType(null)}
                className="text-muted-foreground"
              >
                ← Change Type
              </Button>
              <span className="text-sm text-muted-foreground">
                {storyTypes.find(t => t.type === selectedType)?.title}
              </span>
            </div>

            {/* Content Input Based on Type */}
            {selectedType === "text" && (
              <div>
                <label className="block text-sm font-medium mb-2">Your Story</label>
                <Textarea
                  placeholder="Share your story..."
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  className="min-h-[200px] bg-input border-border"
                />
              </div>
            )}

            {selectedType === "image" && (
              <Card className="p-8 text-center border-dashed border-2 border-primary/30">
                <Upload size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Upload an image for your story</p>
                <Button variant="outline">Choose Image</Button>
              </Card>
            )}

            {selectedType === "voice" && (
              <Card className="p-8 text-center">
                <Mic size={48} className="mx-auto mb-4 text-live-red" />
                <p className="text-muted-foreground mb-4">Record your voice story</p>
                <Button variant="outline" className="border-live-red text-live-red hover:bg-live-red hover:text-white">
                  Start Recording
                </Button>
              </Card>
            )}

            {selectedType === "video" && (
              <Card className="p-8 text-center">
                <Video size={48} className="mx-auto mb-4 text-streams-purple" />
                <p className="text-muted-foreground mb-4">Upload or record a video</p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">Upload Video</Button>
                  <Button variant="outline" className="w-full border-streams-purple text-streams-purple hover:bg-streams-purple hover:text-white">
                    Record Video
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}


        {/* Next Button */}
        {selectedType && title && (selectedType !== "text" || textContent) && (
          <Button onClick={handleNext} className="w-full bg-primary hover:bg-primary/90">
            Continue to Post
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateStoryScreen;