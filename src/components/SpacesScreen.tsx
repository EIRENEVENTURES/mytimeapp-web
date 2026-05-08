import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ArrowLeft, Users, Music, Settings, Share2, MoreVertical, Edit, BarChart3, Archive, Trash2, Copy, UserPlus } from "lucide-react";

const SpacesScreen = ({ 
  onBack, 
  onNavigate, 
  onJoinSpace, 
  onShareSpace,
  onEditSpace,
  onCopyLink,
  onInvitePeople,
  onAnalytics,
  onSpaceSettings,
  onArchiveSpace,
  onDeleteSpace,
  activeTab: controlledActiveTab,
  onTabChange
}: { 
  onBack: () => void; 
  onNavigate: (screen: string) => void; 
  onJoinSpace: (space: any) => void; 
  onShareSpace?: (space: any) => void;
  onEditSpace?: (space: any) => void;
  onCopyLink?: (space: any) => void;
  onInvitePeople?: (space: any) => void;
  onAnalytics?: (space: any) => void;
  onSpaceSettings?: (space: any) => void;
  onArchiveSpace?: (space: any) => void;
  onDeleteSpace?: (space: any) => void;
  activeTab?: 'discover' | 'my-spaces';
  onTabChange?: (tab: 'discover' | 'my-spaces') => void;
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<'discover' | 'my-spaces'>('discover');
  const activeTab = controlledActiveTab || internalActiveTab;
  const setActiveTab = onTabChange || setInternalActiveTab;
  const discoverSpaces = [
    {
      id: 1,
      title: "Test Paid Space",
      host: "Alex Rodriguez",
      username: "@space_host_alex",
      type: "audio",
      participants: 1,
      maxParticipants: 5,
      credits: 10,
      status: "READY"
    },
    {
      id: 2,
      title: "Updated Community Chat",
      host: "Community Host",
      username: "@community_host",
      type: "audio",
      participants: 1,
      maxParticipants: 150,
      credits: 0,
      status: "READY"
    }
  ];

  const mySpaces = [
    {
      id: 3,
      title: "My Creative Workshop",
      host: "You",
      username: "@you",
      type: "audio",
      participants: 3,
      maxParticipants: 10,
      credits: 5,
      status: "LIVE",
      isOwned: true,
      created: "2 hours ago"
    },
    {
      id: 4,
      title: "Daily Standup",
      host: "You",
      username: "@you",
      type: "audio",
      participants: 0,
      maxParticipants: 8,
      credits: 0,
      status: "SCHEDULED",
      isOwned: true,
      created: "1 day ago"
    }
  ];

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
          <h1 className="text-xl font-semibold">Spaces</h1>
        </div>
        <Button
          size="sm"
          className="bg-spaces-orange hover:bg-spaces-orange/90 text-white rounded-full"
          onClick={() => onNavigate("host-space")}
        >
          Host
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        <button 
          className={`flex-1 py-3 px-4 font-medium ${
            activeTab === 'discover' 
              ? 'text-spaces-orange border-b-2 border-spaces-orange' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('discover')}
        >
          Discover
        </button>
        <button 
          className={`flex-1 py-3 px-4 font-medium ${
            activeTab === 'my-spaces' 
              ? 'text-spaces-orange border-b-2 border-spaces-orange' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('my-spaces')}
        >
          My Spaces
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {activeTab === 'discover' ? (
          /* Discover Spaces */
          discoverSpaces.map((space) => (
            <Card key={space.id} className="feature-card">
              <div className="space-y-3">
                {/* Host Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-spaces-orange/20 flex items-center justify-center">
                    <Users size={20} className="text-spaces-orange" />
                  </div>
                  <div>
                    <div className="font-medium">{space.host}</div>
                    <div className="text-sm text-muted-foreground">{space.username}</div>
                  </div>
                </div>

                {/* Space Info */}
                <div>
                  <h3 className="font-semibold mb-2">{space.title}</h3>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Music size={16} className="text-spaces-orange" />
                      <span>{space.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{space.participants}/{space.maxParticipants}</span>
                    </div>
                    <span className="text-wallet-blue font-medium">
                      {space.credits > 0 ? `💰${space.credits} credits/sec` : "FREE"}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <Badge className="bg-chat-green/20 text-chat-green border-chat-green/30">
                    {space.status}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-spaces-orange/30 text-spaces-orange hover:bg-spaces-orange/10"
                    onClick={() => onJoinSpace(space)}
                  >
                    Join Space
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          /* My Spaces */
          <>
            {mySpaces.length === 0 ? (
              <div className="text-center py-12">
                <Users size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">No spaces yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your first space to get started
                </p>
                <Button
                  className="bg-spaces-orange hover:bg-spaces-orange/90 text-white"
                  onClick={() => onNavigate("host-space")}
                >
                  Host a Space
                </Button>
              </div>
            ) : (
              mySpaces.map((space) => (
                <Card key={space.id} className="feature-card">
                  <div className="space-y-3">
                    {/* Header with actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-spaces-orange/20 flex items-center justify-center">
                          <Users size={20} className="text-spaces-orange" />
                        </div>
                        <div>
                          <div className="font-medium">{space.title}</div>
                          <div className="text-sm text-muted-foreground">Created {space.created}</div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-background border shadow-lg z-50">
                          <DropdownMenuItem 
                            className="flex items-center gap-2 hover:bg-accent cursor-pointer"
                            onClick={() => onEditSpace?.(space)}
                          >
                            <Edit size={14} />
                            Edit Space
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center gap-2 hover:bg-accent cursor-pointer"
                            onClick={() => onShareSpace?.(space)}
                          >
                            <Share2 size={14} />
                            Share Space
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center gap-2 hover:bg-accent cursor-pointer"
                            onClick={() => onCopyLink?.(space)}
                          >
                            <Copy size={14} />
                            Copy Link
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center gap-2 hover:bg-accent cursor-pointer"
                            onClick={() => onInvitePeople?.(space)}
                          >
                            <UserPlus size={14} />
                            Invite People
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="flex items-center gap-2 hover:bg-accent cursor-pointer"
                            onClick={() => onAnalytics?.(space)}
                          >
                            <BarChart3 size={14} />
                            Analytics
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center gap-2 hover:bg-accent cursor-pointer"
                            onClick={() => onSpaceSettings?.(space)}
                          >
                            <Settings size={14} />
                            Settings
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="flex items-center gap-2 hover:bg-accent cursor-pointer"
                            onClick={() => onArchiveSpace?.(space)}
                          >
                            <Archive size={14} />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center gap-2 hover:bg-accent cursor-pointer text-destructive"
                            onClick={() => onDeleteSpace?.(space)}
                          >
                            <Trash2 size={14} />
                            Delete Space
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Space Info */}
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Music size={16} className="text-spaces-orange" />
                        <span>{space.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{space.participants}/{space.maxParticipants}</span>
                      </div>
                      <span className="text-wallet-blue font-medium">
                        {space.credits > 0 ? `💰${space.credits} credits/sec` : "FREE"}
                      </span>
                    </div>

                    {/* Status and Actions */}
                    <div className="flex items-center justify-between">
                      <Badge className={`${
                        space.status === 'LIVE' 
                          ? 'bg-red-100 text-red-700 border-red-200' 
                          : space.status === 'SCHEDULED'
                          ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                          : 'bg-chat-green/20 text-chat-green border-chat-green/30'
                      }`}>
                        {space.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onSpaceSettings?.(space)}
                        >
                          <Settings size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onShareSpace?.(space)}
                        >
                          <Share2 size={16} />
                        </Button>
                        <Button
                          size="sm"
                          className={`${
                            space.status === 'LIVE'
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : 'bg-spaces-orange hover:bg-spaces-orange/90 text-white'
                          }`}
                          onClick={() => onJoinSpace(space)}
                        >
                          {space.status === 'LIVE' ? 'Join Live' : space.status === 'SCHEDULED' ? 'Start' : 'Enter'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SpacesScreen;