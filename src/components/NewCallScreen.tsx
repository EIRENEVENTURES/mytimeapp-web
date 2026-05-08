import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Phone, Video, Search, UserPlus } from "lucide-react";
import { useState } from "react";

const NewCallScreen = ({ onBack, onStartCall, onNavigate, onSelectUser }: { 
  onBack: () => void; 
  onStartCall: (type: 'voice' | 'video', contact: any) => void;
  onNavigate: (screen: string) => void;
  onSelectUser: (user: any) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserSearch, setShowUserSearch] = useState(false);

  const contacts = [
    { id: 1, name: "Sarah Connor", username: "sarah_c", rate: 2.50, status: "online", inContacts: true },
    { id: 2, name: "John Smith", username: "john_s", rate: 3.00, status: "busy", inContacts: true },
    { id: 3, name: "Alice Johnson", username: "alice_j", rate: 1.75, status: "online", inContacts: true },
    { id: 4, name: "Michael Brown", username: "mike_b", rate: 4.00, status: "offline", inContacts: true },
  ];

  // Available users to add to contacts (not already in contacts)
  const availableUsers = [
    { id: 5, name: "Emma Wilson", username: "emma_w", rate: 2.25, status: "online", inContacts: false },
    { id: 6, name: "David Chen", username: "david_c", rate: 3.50, status: "busy", inContacts: false },
    { id: 7, name: "Lisa Garcia", username: "lisa_g", rate: 2.00, status: "online", inContacts: false },
    { id: 8, name: "Ryan Miller", username: "ryan_m", rate: 4.50, status: "online", inContacts: false },
  ];

  const filteredContacts = showUserSearch ? 
    availableUsers.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    ) :
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleAddNewContact = () => {
    setShowUserSearch(true);
    setSearchQuery("");
  };

  const handleSelectUserForContact = (user: any) => {
    onSelectUser(user);
    onNavigate('add-contact');
  };

  return (
    <div className="mobile-container">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={showUserSearch ? () => setShowUserSearch(false) : onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-semibold">
            {showUserSearch ? "Find Users" : "New Call"}
          </h1>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder={showUserSearch ? "Search users to add..." : "Search contacts..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 px-4">
        <div className="space-y-3">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-calls-green to-calls-green/70 flex items-center justify-center text-white font-semibold">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-medium">{contact.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        contact.status === 'online' ? 'bg-green-500' :
                        contact.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`} />
                      <span className="text-sm text-muted-foreground capitalize">{contact.status}</span>
                      <span className="text-sm font-medium">{contact.rate} Credits/sec</span>
                      {showUserSearch && (
                        <span className="text-xs text-muted-foreground">@{contact.username}</span>
                      )}
                    </div>
                  </div>
                </div>
                {showUserSearch ? (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleSelectUserForContact(contact)}
                    >
                      <UserPlus size={16} className="mr-2" />
                      Add
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="p-2"
                      disabled={contact.status === 'offline'}
                      onClick={() => onStartCall('voice', contact)}
                    >
                      <Phone size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="p-2"
                      disabled={contact.status === 'offline'}
                      onClick={() => onStartCall('video', contact)}
                    >
                      <Video size={16} />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Add Contact Button */}
        {!showUserSearch && (
          <div className="mt-6">
            <Button variant="outline" className="w-full" onClick={handleAddNewContact}>
              <UserPlus size={16} className="mr-2" />
              Add New Contact
            </Button>
          </div>
        )}

        {filteredContacts.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No {showUserSearch ? 'users' : 'contacts'} found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCallScreen;