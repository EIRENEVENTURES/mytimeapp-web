import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle,
  Phone,
  Users, 
  Wallet, 
  Radio,
  Plus,
  Search,
  Edit3,
  List,
  Camera,
  ImagePlus,
  Info,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/use-user-profile";
import CreatePostComponent from "./CreatePostComponent";
import TimelineComponent from "./TimelineComponent";
import { Post } from "@/types/Post";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const HomeScreen = ({ onNavigate }: { 
  onNavigate: (screen: string, data?: any) => void;
}) => {
  const { toast } = useToast();
  const { profile } = useUserProfile();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentCredits, setCurrentCredits] = useState(50);
  const [showMyStoriesModal, setShowMyStoriesModal] = useState(false);
  const [showInsightsModal, setShowInsightsModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [myStories] = useState<Array<{
    id: string;
    content: string;
    mediaUrl?: string;
    mediaType?: 'image' | 'video';
    createdAt: Date;
    expiresAt: Date;
    views: number;
    likes: number;
    comments: number;
    price: number;
  }>>([
    {
      id: "story-1",
      content: "Just started my day! ☀️",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000),
      views: 156,
      likes: 42,
      comments: 8,
      price: 0.05
    },
    {
      id: "story-2", 
      content: "Working on something exciting! 🚀",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000),
      views: 89,
      likes: 23,
      comments: 5,
      price: 0.10
    }
  ]);

  // Mock viewers for insights
  const mockViewers = [
    { id: "1", name: "Sarah Johnson", username: "@sarahj", viewedAt: "2 min ago", liked: true, commented: false },
    { id: "2", name: "Mike Chen", username: "@mikechen", viewedAt: "5 min ago", liked: true, commented: true },
    { id: "3", name: "Emma Wilson", username: "@emmaw", viewedAt: "12 min ago", liked: false, commented: false },
    { id: "4", name: "John Davis", username: "@johnd", viewedAt: "18 min ago", liked: true, commented: false },
    { id: "5", name: "Lisa Park", username: "@lisap", viewedAt: "25 min ago", liked: false, commented: true },
  ];

  const handleCreatePost = (postData: any) => {
    // Convert to proper Post format
    const newPost: Post = {
        ...postData,
        views: 0, // Initialize views to 0 for new posts
        author: {
          id: 'current-user',
          name: profile.name,
          profilePicture: profile.profilePicture,
          initials: profile.initials
        }
      };
    setPosts(prev => [newPost, ...prev]);
    setShowCreatePost(false);
  };

  const handleUpdatePost = (postId: string, updates: Partial<Post>) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, ...updates } : post
    ));
  };

  const handleCreditsChange = (newBalance: number) => {
    setCurrentCredits(newBalance);
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
    toast({
      title: "Post deleted",
      description: "Your post has been removed from your timeline"
    });
  };

  const quickActions = [
    {
      id: "chat",
      title: "Chat & Calls",
      subtitle: "Chat and call users",
      icon: MessageCircle,
      customIcon: true,
      style: "chat-button"
    },
    {
      id: "live",
      title: "Go Live",
      subtitle: "Start live streaming",
      icon: Radio,
      style: "live-button"
    },
    {
      id: "host-space",
      title: "Host Space",
      subtitle: "Create audio room",
      icon: Users,
      style: "spaces-button"
    },
    {
      id: "wallet",
      title: "Credit & Earnings",
      subtitle: "50 Credits",
      icon: Wallet,
      style: "wallet-button"
    }
  ];

  if (showCreatePost) {
    return (
      <div className="mobile-container px-4 py-6">
        <CreatePostComponent
          onPost={handleCreatePost}
          onCancel={() => setShowCreatePost(false)}
        />
        <TimelineComponent
          posts={posts}
          onUpdatePost={handleUpdatePost}
          currentCredits={currentCredits}
          onCreditsChange={handleCreditsChange}
          onNavigate={onNavigate}
          onDeletePost={handleDeletePost}
        />
      </div>
    );
  }

  if (showTimeline) {
    return (
      <div className="mobile-container px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTimeline(false)}
          >
            ← Back
          </Button>
          <h1 className="text-xl font-semibold">Timeline</h1>
        </div>
        <TimelineComponent
          posts={posts}
          onUpdatePost={handleUpdatePost}
          currentCredits={currentCredits}
          onCreditsChange={handleCreditsChange}
          onNavigate={onNavigate}
          onDeletePost={handleDeletePost}
        />
      </div>
    );
  }

  return (
    <div className="mobile-container px-4 py-6">
      {/* Stories Row - Instagram Style (Topmost) */}
      <div className="mb-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {/* My Story with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer">
                <div className="relative">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-[2px] bg-gradient-to-tr from-primary via-primary/70 to-primary/40">
                    <Avatar className="w-full h-full border-2 border-background">
                      <AvatarImage src={profile.profilePicture} alt={profile.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg md:text-xl">
                        {profile.initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                    <Plus size={10} className="text-primary-foreground" />
                  </div>
                </div>
                <span className="text-xs font-medium">Your story</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={() => onNavigate("profile", { editPicture: true })}>
                <Camera size={16} className="mr-2" />
                Update Profile Picture
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate("create-story")}>
                <ImagePlus size={16} className="mr-2" />
                Add a Story
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowMyStoriesModal(true)}>
                <Eye size={16} className="mr-2" />
                My Active Stories
                {myStories.length > 0 && (
                  <span className="ml-auto text-xs bg-primary text-primary-foreground rounded-full px-1.5">
                    {myStories.length}
                  </span>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Following Stories */}
          {[
            { name: "Sarah", initials: "SA", hasStory: true },
            { name: "Mike", initials: "MI", hasStory: true },
            { name: "Emma", initials: "EM", hasStory: true },
            { name: "John", initials: "JO", hasStory: false },
            { name: "Lisa", initials: "LI", hasStory: true },
            { name: "Alex", initials: "AL", hasStory: true },
          ].map((user, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer"
              onClick={() => onNavigate("view-story", { user })}
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full p-[2px] ${user.hasStory ? 'bg-gradient-to-tr from-primary via-primary/70 to-primary/40' : 'bg-muted'}`}>
                <Avatar className="w-full h-full border-2 border-background">
                  <AvatarFallback className="bg-muted text-muted-foreground font-semibold text-sm md:text-base">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
              </div>
              <span className="text-xs text-muted-foreground truncate max-w-[64px]">{user.name}</span>
            </div>
          ))}
        </div>
      </div>


      {/* Stats Card */}
      <Card className="stats-card mb-6">
        <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-wallet-blue">{Math.floor(currentCredits)}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Credits</div>
          </div>
          <div 
            className="cursor-pointer hover:bg-muted/50 rounded-lg p-1 -m-1 transition-colors group"
            onClick={() => onNavigate("followers")}
          >
            <div className="text-2xl md:text-3xl font-bold">5</div>
            <div className="text-xs md:text-sm text-primary underline underline-offset-2 group-hover:text-primary/80">Followers</div>
          </div>
          <div 
            className="cursor-pointer hover:bg-muted/50 rounded-lg p-1 -m-1 transition-colors group"
            onClick={() => onNavigate("following")}
          >
            <div className="text-2xl md:text-3xl font-bold">5</div>
            <div className="text-xs md:text-sm text-primary underline underline-offset-2 group-hover:text-primary/80">Following</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1 mt-3 pt-3 border-t border-border/50">
          <Info size={12} className="text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Credits are virtual items used for in-app interactions.</span>
        </div>
      </Card>

      {/* Create Post, Timeline & Search */}
      <div className="flex items-center gap-2 mb-4">
        <Button
          size="sm"
          onClick={() => setShowCreatePost(true)}
          className="flex-1"
        >
          <Edit3 size={16} className="mr-1" />
          Create Post
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowTimeline(true)}
          className="flex-1"
        >
          <List size={16} className="mr-1" />
          Timeline
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate("user-search")}
          className="text-muted-foreground hover:text-foreground"
        >
          <Search size={20} />
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const colorMap: Record<string, string> = {
              "chat-button": "from-chat-green/20 to-chat-green/5 hover:from-chat-green/30 hover:to-chat-green/10 border-chat-green/20",
              "calls-button": "from-calls-orange/20 to-calls-orange/5 hover:from-calls-orange/30 hover:to-calls-orange/10 border-calls-orange/20",
              "live-button": "from-live-red/20 to-live-red/5 hover:from-live-red/30 hover:to-live-red/10 border-live-red/20",
              "spaces-button": "from-spaces-cyan/20 to-spaces-cyan/5 hover:from-spaces-cyan/30 hover:to-spaces-cyan/10 border-spaces-cyan/20",
              "timeline-button": "from-streams-purple/20 to-streams-purple/5 hover:from-streams-purple/30 hover:to-streams-purple/10 border-streams-purple/20",
              "wallet-button": "from-wallet-blue/20 to-wallet-blue/5 hover:from-wallet-blue/30 hover:to-wallet-blue/10 border-wallet-blue/20",
            };
            const iconColorMap: Record<string, string> = {
              "chat-button": "text-chat-green",
              "calls-button": "text-calls-orange",
              "live-button": "text-live-red",
              "spaces-button": "text-spaces-cyan",
              "timeline-button": "text-streams-purple",
              "wallet-button": "text-wallet-blue",
            };
            return (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className={`group relative p-4 md:p-6 rounded-2xl bg-gradient-to-br ${colorMap[action.style]} border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]`}
              >
                <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-xl bg-background/80 flex items-center justify-center mb-3 ${iconColorMap[action.style]} group-hover:scale-110 transition-transform duration-300`}>
                  {action.customIcon ? (
                    <>
                      <Phone size={20} className="absolute bottom-2 left-2" />
                      <MessageCircle size={13} className="absolute top-2 right-2" />
                    </>
                  ) : (
                    <Icon size={20} />
                  )}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm md:text-base leading-tight">{action.title}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{action.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* My Active Stories Modal */}
      <Dialog open={showMyStoriesModal} onOpenChange={setShowMyStoriesModal}>
        <DialogContent className="max-w-sm max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>My Active Stories</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[60vh] -mx-2 px-2">
            {myStories.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No active stories</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => {
                    setShowMyStoriesModal(false);
                    onNavigate("create-story");
                  }}
                >
                  <Plus size={14} className="mr-1" />
                  Create Story
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {myStories.map((story) => {
                  const hoursLeft = Math.max(0, Math.floor((story.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60)));
                  return (
                    <div
                      key={story.id}
                      className="flex gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedStory(story);
                        setShowMyStoriesModal(false);
                        setShowInsightsModal(true);
                      }}
                    >
                      {/* Story thumbnail */}
                      <div className="relative w-16 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 overflow-hidden flex-shrink-0">
                        {story.mediaUrl ? (
                          story.mediaType === 'video' ? (
                            <video src={story.mediaUrl} className="w-full h-full object-cover" />
                          ) : (
                            <img src={story.mediaUrl} alt="" className="w-full h-full object-cover" />
                          )
                        ) : (
                          <div className="w-full h-full flex items-center justify-center p-1">
                            <p className="text-[8px] text-center text-muted-foreground line-clamp-3">{story.content}</p>
                          </div>
                        )}
                        <div className="absolute top-0.5 right-0.5">
                          <div className="w-5 h-5 rounded-full bg-background/90 flex items-center justify-center">
                            <span className="text-[7px] font-bold text-primary">{hoursLeft}h</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Story info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{story.content}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatDistanceToNow(story.createdAt, { addSuffix: true })}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye size={12} /> {story.views}
                          </span>
                          <span>❤️ {story.likes}</span>
                          <span>💬 {story.comments}</span>
                        </div>
                        <div className="text-[10px] text-primary mt-1">
                          {hoursLeft}h remaining
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Story Insights Modal */}
      <Dialog open={showInsightsModal} onOpenChange={setShowInsightsModal}>
        <DialogContent className="max-w-sm max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => {
                  setShowInsightsModal(false);
                  setShowMyStoriesModal(true);
                }}
              >
                ←
              </Button>
              Story Insights
            </DialogTitle>
          </DialogHeader>
          
          {selectedStory && (
            <div className="overflow-y-auto max-h-[65vh] -mx-2 px-2 space-y-4">
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-2">
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <div className="text-lg font-bold">{selectedStory.views}</div>
                  <div className="text-[10px] text-muted-foreground">Views</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <div className="text-lg font-bold text-red-500">{selectedStory.likes}</div>
                  <div className="text-[10px] text-muted-foreground">Likes</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <div className="text-lg font-bold text-blue-500">{selectedStory.comments}</div>
                  <div className="text-[10px] text-muted-foreground">Comments</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <div className="text-lg font-bold text-green-500">
                    {(selectedStory.views * selectedStory.price * 0.8).toFixed(1)}
                  </div>
                  <div className="text-[10px] text-muted-foreground">Earned</div>
                </div>
              </div>

              {/* Story Preview */}
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <p className="text-sm">{selectedStory.content}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>{formatDistanceToNow(selectedStory.createdAt, { addSuffix: true })}</span>
                  <span>{Math.max(0, Math.floor((selectedStory.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60)))}h remaining</span>
                </div>
              </div>

              {/* Viewers List */}
              <div>
                <h4 className="text-sm font-semibold mb-2">Viewers</h4>
                <div className="space-y-2">
                  {mockViewers.map((viewer) => (
                    <div
                      key={viewer.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => {
                        setShowInsightsModal(false);
                        onNavigate("user-profile", { user: viewer });
                      }}
                    >
                      <Avatar className="w-9 h-9">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {viewer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{viewer.name}</p>
                        <p className="text-xs text-muted-foreground">{viewer.viewedAt}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {viewer.liked && <span className="text-red-500">❤️</span>}
                        {viewer.commented && <span className="text-blue-500">💬</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engagement Stats */}
              <div className="p-3 rounded-xl bg-muted/30">
                <h4 className="text-sm font-semibold mb-2">Engagement</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Engagement Rate</span>
                    <span className="font-medium">
                      {((selectedStory.likes + selectedStory.comments) / selectedStory.views * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg. View Duration</span>
                    <span className="font-medium">4.2s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Credits Earned</span>
                    <span className="font-medium text-green-500">
                      +{(selectedStory.views * selectedStory.price * 0.8).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomeScreen;