import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Copy, Share2, Mail, MessageSquare, Users, Twitter, Facebook, Link2, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

const InviteParticipantsScreen = ({ onBack, spaceData, onInviteContact, onNavigate, invitedContacts = [] }: { onBack: () => void; spaceData: any; onInviteContact: (contact: any) => void; onNavigate: (screen: string) => void; invitedContacts?: any[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [inviteLink] = useState(`https://mytime.app/space/${Math.random().toString(36).substr(2, 9)}`);

  const contacts = [
    { id: 1, name: "Alice Johnson", username: "@alice_j", avatar: "A", status: "online" },
    { id: 2, name: "Bob Smith", username: "@bob_smith", avatar: "B", status: "offline" },
    { id: 3, name: "Charlie Brown", username: "@charlie_b", avatar: "C", status: "online" },
    { id: 4, name: "Diana Ross", username: "@diana_r", avatar: "D", status: "away" },
  ];

  const invitedUsers = [
    { id: 1, name: "Alice Johnson", username: "@alice_j", status: "pending" },
    { id: 2, name: "Bob Smith", username: "@bob_smith", status: "accepted" },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    // Toast notification would be shown here
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
          <h1 className="text-xl font-semibold">Invite Participants</h1>
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

      <div className="p-4">
        <Tabs defaultValue="contacts" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="link">Share Link</TabsTrigger>
            <TabsTrigger value="invited">Invited</TabsTrigger>
          </TabsList>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>

            {/* Contacts List */}
            <div className="space-y-2">
              {filteredContacts.map((contact) => (
                <Card key={contact.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-spaces-orange/20 flex items-center justify-center">
                        <span className="font-medium text-spaces-orange">{contact.avatar}</span>
                      </div>
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          {contact.username}
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            contact.status === "online" ? "bg-chat-green" :
                            contact.status === "away" ? "bg-yellow-500" : "bg-gray-400"
                          )} />
                        </div>
                      </div>
                    </div>
                    {invitedContacts.some(inv => inv.id === contact.id) ? (
                      <Button size="sm" disabled className="bg-chat-green/20 text-chat-green border-chat-green/30">
                        <UserPlus size={16} className="mr-2" />
                        Invited
                      </Button>
                    ) : (
                      <Button size="sm" className="bg-spaces-orange hover:bg-spaces-orange/90 text-white" onClick={() => onInviteContact(contact)}>
                        <UserPlus size={16} className="mr-2" />
                        Invite
                      </Button>
                    )}
                  </div>
                </Card>
              ))}

              {filteredContacts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No contacts found
                </div>
              )}
            </div>
          </TabsContent>

          {/* Share Link Tab */}
          <TabsContent value="link" className="space-y-4">
            {/* Invite Link */}
            <Card className="p-4">
              <div className="space-y-3">
                <Label className="text-base font-medium">Space Invite Link</Label>
                <div className="flex gap-2">
                  <Input
                    value={inviteLink}
                    readOnly
                    className="bg-background text-sm"
                  />
                  <Button size="sm" onClick={copyInviteLink}>
                    <Copy size={16} />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Share this link with anyone you want to invite to your space
                </p>
              </div>
            </Card>

            {/* Share Options */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Share via</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Mail size={16} />
                  Email
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageSquare size={16} />
                  SMS
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Twitter size={16} />
                  Twitter
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Facebook size={16} />
                  Facebook
                </Button>
              </div>
            </div>

            {/* Custom Message */}
            <Card className="p-4 bg-card/50">
              <div className="space-y-3">
                <Label htmlFor="custom-message">Custom Invitation Message</Label>
                <textarea
                  id="custom-message"
                  placeholder="Add a personal message to your invitation..."
                  className="w-full p-3 rounded-md border border-border bg-background resize-none min-h-[80px]"
                  defaultValue={`Hey! I'm hosting a space "${spaceData?.title || "My Space"}" and would love for you to join. Click the link to participate!`}
                />
              </div>
            </Card>
          </TabsContent>

          {/* Invited Tab */}
          <TabsContent value="invited" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Invited Participants ({invitedUsers.length})</Label>
              <Button size="sm" variant="outline">
                <Share2 size={16} className="mr-2" />
                Send Reminder
              </Button>
            </div>

            <div className="space-y-2">
              {invitedUsers.map((user) => (
                <Card key={user.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-spaces-orange/20 flex items-center justify-center">
                        <span className="font-medium text-spaces-orange">{user.name[0]}</span>
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.username}</div>
                      </div>
                    </div>
                    <Badge className={cn(
                      user.status === "accepted" ? "bg-chat-green/20 text-chat-green border-chat-green/30" :
                      user.status === "declined" ? "bg-red-500/20 text-red-500 border-red-500/30" :
                      "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
                    )}>
                      {user.status.toUpperCase()}
                    </Badge>
                  </div>
                </Card>
              ))}

              {invitedUsers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No participants invited yet
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6">
          <Button variant="outline" className="flex-1" onClick={onBack}>
            Done
          </Button>
          <Button className="flex-1 bg-spaces-orange hover:bg-spaces-orange/90 text-white" onClick={() => onNavigate("create-public-link")}>
            <Link2 size={16} className="mr-2" />
            Create Public Link
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InviteParticipantsScreen;