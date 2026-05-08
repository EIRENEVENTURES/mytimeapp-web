import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Search, MessageCircle, UserCheck, Phone, Plus, PhoneCall, Video } from "lucide-react";

interface ChatAndCallsScreenProps {
  onBack: () => void;
  onStartChat: (user: any) => void;
  onNavigate: (screen: string) => void;
}

const ChatAndCallsScreen = ({ onBack, onStartChat, onNavigate }: ChatAndCallsScreenProps) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'calls'>('chats');
  const [searchQuery, setSearchQuery] = useState("");
  const [callsSubTab, setCallsSubTab] = useState<'incoming' | 'history'>('incoming');

  const searchResults = searchQuery ? [
    { id: 1, name: "Sarah Johnson", username: "@sarah_j", chatRate: 5, callRate: 8, online: true, followers: 1240, avatar: "SJ" },
    { id: 2, name: "Mike Chen", username: "@mikec", chatRate: 3, callRate: 10, online: false, followers: 856, avatar: "MC" },
    { id: 3, name: "Emma Wilson", username: "@emma_w", chatRate: 4, callRate: 6, online: true, followers: 2100, avatar: "EW" }
  ].filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="mobile-container">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-semibold">Chat & Calls</h1>
        </div>
        {activeTab === 'calls' && (
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
            onClick={() => onNavigate('new-call')}
          >
            <Plus size={16} className="mr-2" />
            New Call
          </Button>
        )}
      </div>

      {/* Main Tabs */}
      <div className="flex border-b border-border">
        <button
          className={`flex-1 py-3 px-4 font-medium transition-colors ${
            activeTab === 'chats'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('chats')}
        >
          <MessageCircle size={16} className="inline mr-2" />
          Chats
        </button>
        <button
          className={`flex-1 py-3 px-4 font-medium transition-colors ${
            activeTab === 'calls'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('calls')}
        >
          <Phone size={16} className="inline mr-2" />
          Calls
        </button>
      </div>

      {/* Chats Tab Content */}
      {activeTab === 'chats' && (
        <>
          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
          </div>

          {searchQuery && (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                Search Results ({searchResults.length})
              </h3>
              <div className="space-y-3">
                {searchResults.map((user) => (
                  <Card key={user.id} className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="font-semibold text-sm">{user.avatar}</span>
                        </div>
                        {user.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-chat-green rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{user.name}</h4>
                          {user.followers > 1000 && <UserCheck size={16} className="text-wallet-blue" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{user.username}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-chat-green font-semibold">Chat: {user.chatRate} cr/s</span>
                          <span className="text-xs text-calls-orange font-semibold">Call: {user.callRate} cr/s</span>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground">{user.followers} followers</span>
                          <span className={`text-xs ${user.online ? 'text-chat-green' : 'text-muted-foreground'}`}>
                            {user.online ? 'Online' : 'Offline'}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" onClick={() => onStartChat(user)} className="bg-chat-green hover:bg-chat-green/90 text-white">
                        <MessageCircle size={16} className="mr-2" />
                        Chat
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {!searchQuery && (
            <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <MessageCircle size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-3">Find People to Chat With</h2>
              <p className="text-muted-foreground leading-relaxed">
                Search for users to start monetized conversations and earn credits per second!
              </p>
            </div>
          )}
        </>
      )}

      {/* Calls Tab Content */}
      {activeTab === 'calls' && (
        <>
          {/* Sub-tabs */}
          <div className="flex border-b border-border">
            <button
              className={`flex-1 py-2.5 px-4 text-sm font-medium transition-colors ${
                callsSubTab === 'incoming'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setCallsSubTab('incoming')}
            >
              Incoming (0)
            </button>
            <button
              className={`flex-1 py-2.5 px-4 text-sm font-medium transition-colors ${
                callsSubTab === 'history'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setCallsSubTab('history')}
            >
              History
            </button>
          </div>

          {callsSubTab === 'incoming' ? (
            <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Phone size={40} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-3">No Incoming Calls</h2>
              <p className="text-muted-foreground leading-relaxed">
                Incoming calls will appear here. Users can call you for monetized conversations at your set rate.
              </p>
            </div>
          ) : (
            <div className="flex-1">
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <PhoneCall size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Sarah Connor</p>
                      <p className="text-sm text-muted-foreground">Incoming • 5 min ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">2.50 Credits/sec</p>
                    <p className="text-xs text-muted-foreground">8 min call</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Video size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">John Smith</p>
                      <p className="text-sm text-muted-foreground">Video call • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">3.00 Credits/sec</p>
                    <p className="text-xs text-muted-foreground">15 min call</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <PhoneCall size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Alice Johnson</p>
                      <p className="text-sm text-muted-foreground">Outgoing • Yesterday</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">1.75 Credits/sec</p>
                    <p className="text-xs text-muted-foreground">12 min call</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatAndCallsScreen;
