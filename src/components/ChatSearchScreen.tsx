import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Calendar, User } from "lucide-react";

const ChatSearchScreen = ({ 
  user, 
  onBack 
}: { 
  user: { name: string; username: string; rate: number; online: boolean }; 
  onBack: () => void; 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults] = useState([
    {
      id: 1,
      text: "Hey! Thanks for reaching out. I'm excited to chat with you! 😊",
      sender: "them",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      context: "conversation starter"
    },
    {
      id: 2,
      text: "Hi! Great to connect with you. How's your day going?",
      sender: "me",
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      context: "greeting"
    },
    {
      id: 3,
      text: "Can we schedule a call tomorrow?",
      sender: "me",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      context: "scheduling"
    }
  ]);

  const filteredResults = searchResults.filter(result =>
    result.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-lg font-semibold">Search Chat</h1>
            <p className="text-xs text-muted-foreground">with {user.name}</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>
        {searchQuery && (
          <p className="text-xs text-muted-foreground mt-2">
            {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found
          </p>
        )}
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-auto">
        {searchQuery ? (
          <div className="p-4 space-y-3">
            {filteredResults.map((result) => (
              <div key={result.id} className="p-3 bg-muted rounded-lg border-l-4 border-primary">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    {result.sender === "me" ? (
                      <User size={14} />
                    ) : (
                      <span className="text-xs font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{result.text}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {result.timestamp.toLocaleDateString()} at {result.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                      <span className="text-xs text-primary font-medium">
                        {result.sender === "me" ? "You" : user.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredResults.length === 0 && (
              <div className="text-center py-12">
                <Search size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try different keywords or check your spelling
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center px-8">
            <Search size={48} className="text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">Search Messages</h3>
            <p className="text-muted-foreground text-center">
              Find specific messages, dates, or topics from your conversation with {user.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSearchScreen;