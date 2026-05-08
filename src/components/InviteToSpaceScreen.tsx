import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, UserPlus, Search, Check, Mail, MessageCircle } from "lucide-react";
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

interface Contact {
  id: number;
  name: string;
  username: string;
  avatar?: string;
  isInvited?: boolean;
}

const InviteToSpaceScreen = ({ onBack, space }: { onBack: () => void; space: Space }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [customMessage, setCustomMessage] = useState(`Hey! I'd like to invite you to join my space "${space.title}" on MyTime. Come join the conversation!`);
  const [invitedContacts, setInvitedContacts] = useState<number[]>([]);
  const { toast } = useToast();

  const contacts: Contact[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      username: "@sarah_j",
      isInvited: false
    },
    {
      id: 2,
      name: "Mike Chen",
      username: "@mike_chen",
      isInvited: true
    },
    {
      id: 3,
      name: "Emily Davis",
      username: "@emily_d",
      isInvited: false
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      username: "@alex_rod",
      isInvited: false
    }
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInviteContact = (contactId: number) => {
    setInvitedContacts(prev => [...prev, contactId]);
    toast({
      title: "Invitation Sent",
      description: "Your invitation has been sent successfully.",
    });
  };

  const handleInviteByEmail = () => {
    toast({
      title: "Email Invites",
      description: "Email invitations feature coming soon!",
    });
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
            <h1 className="font-semibold">Invite People</h1>
            <p className="text-sm text-muted-foreground">{space.title}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Space Info */}
        <Card className="p-4 bg-spaces-orange/5 border-spaces-orange/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-spaces-orange/20 flex items-center justify-center">
              <UserPlus size={20} className="text-spaces-orange" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{space.title}</h3>
              <p className="text-sm text-muted-foreground">
                {space.participants}/{space.maxParticipants} participants
                {space.credits > 0 && ` • ${space.credits} credits/sec`}
              </p>
            </div>
          </div>
        </Card>

        {/* Custom Message */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Invitation Message</h3>
          <Textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Write a custom invitation message..."
            rows={3}
            className="resize-none"
          />
        </Card>

        {/* Invite by Email */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Invite by Email</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Enter email address"
              className="flex-1"
            />
            <Button variant="outline" onClick={handleInviteByEmail}>
              <Mail size={16} />
            </Button>
          </div>
        </Card>

        {/* Search Contacts */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Invite Contacts</h3>
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-2">
            {filteredContacts.map((contact) => {
              const isInvitedNow = invitedContacts.includes(contact.id);
              const wasAlreadyInvited = contact.isInvited;
              const showInvited = isInvitedNow || wasAlreadyInvited;

              return (
                <div key={contact.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {contact.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.username}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={showInvited ? "ghost" : "default"}
                    onClick={() => !showInvited && handleInviteContact(contact.id)}
                    disabled={showInvited}
                    className={showInvited ? "text-chat-green" : "bg-spaces-orange hover:bg-spaces-orange/90 text-white"}
                  >
                    {showInvited ? (
                      <>
                        <Check size={14} className="mr-1" />
                        Invited
                      </>
                    ) : (
                      <>
                        <UserPlus size={14} className="mr-1" />
                        Invite
                      </>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Share Link */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Share Invite Link</h3>
          <div className="flex gap-2">
            <Input
              readOnly
              value={`https://mytime.app/space/${space.id}/invite`}
              className="flex-1 text-sm"
            />
            <Button variant="outline">
              <MessageCircle size={16} />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InviteToSpaceScreen;