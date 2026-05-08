import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, UserPlus, Check, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddContactScreen = ({ 
  user, 
  onBack 
}: { 
  user: { name: string; username: string; rate: number; online: boolean } | null; 
  onBack: () => void; 
}) => {
  const [contactName, setContactName] = useState(user?.name || "");
  const [notes, setNotes] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const handleAddContact = async () => {
    setIsAdding(true);
    // Simulate adding contact
    setTimeout(() => {
      setIsAdding(false);
      toast({
        title: "Contact Added",
        description: `${contactName} has been added to your contacts.`,
      });
      onBack();
    }, 1000);
  };

  if (!user) {
    return (
      <div className="mobile-container flex flex-col h-screen">
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
            <h1 className="text-lg font-semibold">Add to Contacts</h1>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">User not found</p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-lg font-semibold">Add to Contacts</h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* User Info */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-2xl font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            {user.online && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-chat-green rounded-full border-2 border-background"></div>
            )}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">@{user.username}</p>
            <p className="text-sm text-primary">${user.rate}/sec</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Contact Name</label>
            <Input
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Enter contact name"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Notes (Optional)</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this contact..."
              className="mt-1 min-h-[100px]"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <p className="font-medium">Favorite Contact</p>
              <p className="text-sm text-muted-foreground">Pin to top of contacts list</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFavorite(!isFavorite)}
              className={isFavorite ? "text-yellow-500" : "text-muted-foreground"}
            >
              <Star size={20} fill={isFavorite ? "currentColor" : "none"} />
            </Button>
          </div>
        </div>

        {/* Contact Preview */}
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-3">Contact Preview</h4>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-semibold">
                {contactName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">{contactName}</p>
                {isFavorite && <Star size={14} className="text-yellow-500" fill="currentColor" />}
              </div>
              <p className="text-xs text-muted-foreground">@{user.username} • ${user.rate}/sec</p>
              {notes && <p className="text-xs text-muted-foreground mt-1">{notes}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Add Button */}
      <div className="p-4 border-t border-border">
        <Button
          onClick={handleAddContact}
          disabled={!contactName.trim() || isAdding}
          className="w-full"
        >
          {isAdding ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Adding Contact...
            </>
          ) : (
            <>
              <UserPlus size={16} className="mr-2" />
              Add to Contacts
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddContactScreen;