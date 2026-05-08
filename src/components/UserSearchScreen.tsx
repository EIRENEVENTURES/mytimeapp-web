import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, MessageCircle, Phone, UserPlus, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  username: string;
  profilePicture?: string;
  isOnline: boolean;
  rating: number;
  ratePerSecond?: number;
  specialties: string[];
  verified?: boolean;
}

const UserSearchScreen = ({ onBack, onNavigate }: { onBack: () => void; onNavigate: (screen: string, user?: User) => void }) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock user data - in a real app, this would come from an API
  const mockUsers: User[] = [
    {
      id: "1",
      name: "Alex Rodriguez",
      username: "space_host_alex",
      profilePicture: "",
      isOnline: true,
      rating: 4.8,
      ratePerSecond: 5,
      specialties: ["Tech Talk", "Business", "Mentoring"],
      verified: true
    },
    {
      id: "2", 
      name: "Sarah Chen",
      username: "sarah_creator",
      profilePicture: "",
      isOnline: false,
      rating: 4.9,
      ratePerSecond: 8,
      specialties: ["Creative Writing", "Art", "Photography"]
    },
    {
      id: "3",
      name: "Mike Johnson", 
      username: "mike_coach",
      profilePicture: "",
      isOnline: true,
      rating: 4.7,
      ratePerSecond: 12,
      specialties: ["Life Coaching", "Fitness", "Motivation"],
      verified: true
    },
    {
      id: "4",
      name: "Emma Davis",
      username: "emma_teacher",
      profilePicture: "",
      isOnline: true,
      rating: 4.6,
      ratePerSecond: 3,
      specialties: ["Language Learning", "Education", "Travel"]
    },
    {
      id: "5",
      name: "Community Host",
      username: "community_host",
      profilePicture: "",
      isOnline: false,
      rating: 4.4,
      ratePerSecond: 0,
      specialties: ["Community Building", "Events", "Networking"]
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API search delay
    setTimeout(() => {
      const results = mockUsers.filter(user => 
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.specialties.some(specialty => specialty.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const handleStartChat = (user: User) => {
    toast({
      title: "Starting chat",
      description: `Initiating conversation with ${user.name}...`
    });
    onNavigate("chat-interface", user);
  };

  const handleStartCall = (user: User) => {
    toast({
      title: "Starting call", 
      description: `Calling ${user.name}...`
    });
    onNavigate("voice-call", user);
  };

  const handleAddContact = (user: User) => {
    toast({
      title: "Contact added",
      description: `${user.name} has been added to your contacts`
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
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
            <h1 className="font-semibold">Find Users</h1>
            <p className="text-sm text-muted-foreground">Search by username or name</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Enter MyTime username or name..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto p-4">
        {isSearching ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Searching...</p>
            </div>
          </div>
        ) : searchQuery.trim().length === 0 ? (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium mb-2">Find MyTime Users</h3>
            <p className="text-sm text-muted-foreground">
              Enter a username, name, or specialty to find users
            </p>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium mb-2">No users found</h3>
            <p className="text-sm text-muted-foreground">
              Try searching with a different username or name
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              Found {searchResults.length} user{searchResults.length !== 1 ? 's' : ''}
            </p>
            
            {searchResults.map((user) => (
              <Card key={user.id} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.profilePicture} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    {user.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium truncate">{user.name}</h3>
                      {user.verified && (
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">@{user.username}</p>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-500 fill-current" />
                        <span className="text-xs font-medium">{user.rating}</span>
                      </div>
                      {user.ratePerSecond && user.ratePerSecond > 0 && (
                        <span className="text-xs text-wallet-blue font-medium">
                          {user.ratePerSecond} credits/sec
                        </span>
                      )}
                      {user.ratePerSecond === 0 && (
                        <span className="text-xs text-green-600 font-medium">
                          FREE
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {user.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {user.specialties.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{user.specialties.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleStartChat(user)}
                    className="flex-1"
                  >
                    <MessageCircle size={14} className="mr-1" />
                    Chat
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleStartCall(user)}
                    className="flex-1"
                  >
                    <Phone size={14} className="mr-1" />
                    Call
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleAddContact(user)}
                  >
                    <UserPlus size={14} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSearchScreen;