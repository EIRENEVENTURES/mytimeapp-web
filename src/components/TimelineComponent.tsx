import { useState } from "react";
import PostCard from "./PostCard";
import PostEngagementModal from "./PostEngagementModal";
import ReshareOptionsScreen from "./ReshareOptionsScreen";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { RefreshCw, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Post, PostAuthor } from "@/types/Post";
import { useUserProfile } from "@/hooks/use-user-profile";

interface TimelineComponentProps {
  posts: Post[];
  onUpdatePost: (postId: string, updates: Partial<Post>) => void;
  currentCredits: number;
  onCreditsChange: (newBalance: number) => void;
  onNavigate?: (screen: string, data?: any) => void;
  onDeletePost?: (postId: string) => void;
}

const TimelineComponent = ({ 
  posts, 
  onUpdatePost, 
  currentCredits, 
  onCreditsChange,
  onNavigate,
  onDeletePost
}: TimelineComponentProps) => {
  const [engagementModal, setEngagementModal] = useState<{
    isOpen: boolean;
    post: Post | null;
    type: 'like' | 'comment';
  }>({
    isOpen: false,
    post: null,
    type: 'like'
  });
  const [reshareModal, setReshareModal] = useState<{
    isOpen: boolean;
    post: Post | null;
  }>({
    isOpen: false,
    post: null
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  const { profile } = useUserProfile();

  // Mock data for demonstration
  const [mockPosts] = useState<Post[]>([
    {
      id: 'demo-1',
      type: 'text',
      content: 'Just launched my new consulting service! 💼 Offering 1-on-1 business strategy sessions. Book a call with me to discuss your growth plans!',
      isPublic: true,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      likes: 15,
      comments: 3,
      reshares: 2,
      views: 142,
      hasLiked: false,
      author: {
        id: 'sarah-1',
        name: 'Sarah Johnson',
        profilePicture: '',
        initials: 'SJ'
      }
    },
    {
      id: 'demo-2',
      type: 'image',
      content: 'Beautiful sunset from my workspace today 🌅 Sometimes the best ideas come when you take a moment to appreciate the world around you.',
      isPublic: true,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      likes: 28,
      comments: 7,
      reshares: 5,
      views: 326,
      hasLiked: true,
      author: {
        id: 'mike-1',
        name: 'Mike Chen',
        profilePicture: '',
        initials: 'MC'
      }
    },
    {
      id: 'demo-3',
      type: 'text',
      content: 'Hosting a live Q&A session tomorrow at 3 PM! Topics: Digital marketing, social media growth, and building your personal brand. Join me! 🚀',
      isPublic: false,
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      likes: 42,
      comments: 12,
      reshares: 8,
      views: 687,
      hasLiked: false,
      author: {
        id: 'emily-1',
        name: 'Emily Rodriguez',
        profilePicture: '',
        initials: 'ER'
      }
    },
    // Add a reshared post example
    {
      id: 'demo-4-reshared',
      type: 'text',
      content: 'This is such valuable advice! Everyone should read this.',
      isPublic: true,
      timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
      likes: 8,
      comments: 2,
      reshares: 1,
      views: 89,
      hasLiked: false,
      isReshare: true,
      author: {
        id: 'sarah-1',
        name: 'Sarah Johnson',
        profilePicture: '',
        initials: 'SJ'
      },
      originalPost: {
        id: 'demo-1',
        author: {
          id: 'sarah-1',
          name: 'Sarah Johnson',
          profilePicture: '',
          initials: 'SJ'
        },
        timestamp: new Date(Date.now() - 3600000)
      },
      resharedBy: {
        id: 'current-user',
        name: profile.name,
        profilePicture: profile.profilePicture,
        initials: profile.initials
      }
    }
  ]);

  const allPosts = [...posts, ...mockPosts].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );

  const handleEngagement = (postId: string, type: 'like' | 'comment') => {
    const post = allPosts.find(p => p.id === postId);
    if (post) {
      setEngagementModal({
        isOpen: true,
        post,
        type
      });
    }
  };

  const handleEngagementConfirm = (postId: string, data?: { comment?: string }) => {
    const cost = engagementModal.type === 'like' ? 1 : 2;
    const post = engagementModal.post;
    
    if (currentCredits >= cost && post) {
      // Update credits
      onCreditsChange(currentCredits - cost);
      
      // Show credit distribution info for reshared posts
      if (post.isReshare) {
        const splitAmount = cost / 2;
        toast({
          title: `${engagementModal.type === 'like' ? 'Liked!' : 'Comment posted!'}`,
          description: `${cost} credits deducted. ${splitAmount} credits each to ${post.originalPost?.author.name} and ${post.resharedBy?.name}`,
          duration: 4000
        });
      }
      
      // Update post
      const updates: Partial<Post> = {};
      
      if (engagementModal.type === 'like') {
        updates.likes = (post.likes || 0) + 1;
        updates.hasLiked = true;
      } else {
        updates.comments = (post.comments || 0) + 1;
      }
      
      onUpdatePost(postId, updates);
    }
  };

  const handleReshare = (postId: string, originalAuthor?: PostAuthor) => {
    const post = allPosts.find(p => p.id === postId);
    if (post) {
      // Update the original post's reshare count
      onUpdatePost(postId, { 
        reshares: (post.reshares || 0) + 1 
      });

      // Create a new reshared post
      const resharedPost: Post = {
        id: `${postId}-reshared-${Date.now()}`,
        type: post.type,
        content: post.content,
        mediaFile: post.mediaFile,
        isPublic: post.isPublic,
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        reshares: 0,
        views: 0,
        hasLiked: false,
        isReshare: true,
        author: originalAuthor || post.author,
        originalPost: {
          id: postId,
          author: originalAuthor || post.author,
          timestamp: post.timestamp
        },
        resharedBy: {
          id: 'current-user',
          name: profile.name,
          profilePicture: profile.profilePicture,
          initials: profile.initials
        }
      };

      // This would typically be handled by the parent component
      // For now, we'll show a success message
      toast({
        title: "Post reshared!",
        description: "The post has been added to your timeline. You'll earn 50% of credits from future engagements on this reshared post.",
        duration: 4000
      });
    }
  };

  const handleDirectReshare = (post: Post) => {
    handleReshare(post.id, post.isReshare ? post.originalPost?.author : post.author);
    setReshareModal({ isOpen: false, post: null });
  };

  const handleQuotePost = (quotePostData: any) => {
    // This would typically be handled by the parent component to add the quote post
    // For now, we'll show a success message
    toast({
      title: "Quote posted!",
      description: "Your quote post has been added to your timeline.",
      duration: 4000
    });
    setReshareModal({ isOpen: false, post: null });
  };

  const handleReshareClick = (post: Post) => {
    setReshareModal({
      isOpen: true,
      post
    });
  };

  const handleDeletePost = (postId: string) => {
    if (onDeletePost) {
      onDeletePost(postId);
    }
    // Also remove from local state if it's a mock post
    // This would typically be handled by the parent component
  };

  const handleUpdatePost = (post: Post) => {
    // This would typically update the post in the backend
    // For now, we'll just update the local state
    onUpdatePost(post.id, post);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    toast({
      title: "Timeline refreshed",
      description: "Showing latest posts"
    });
  };

  if (allPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <TrendingUp size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
        <p className="text-muted-foreground">Create your first post to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {/* Timeline Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Your Timeline</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw size={16} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Posts */}
      {allPosts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          onLike={(postId) => handleEngagement(postId, 'like')}
          onComment={(postId) => handleEngagement(postId, 'comment')}
          onReshare={(postId) => {
            const foundPost = allPosts.find(p => p.id === postId);
            if (foundPost) {
              handleReshareClick(foundPost);
            }
          }}
          onEngagement={handleEngagement}
          onNavigate={onNavigate}
          onDeletePost={handleDeletePost}
          onUpdatePost={handleUpdatePost}
        />
      ))}

      {/* Engagement Modal */}
      {engagementModal.post && (
        <PostEngagementModal
          isOpen={engagementModal.isOpen}
          onClose={() => setEngagementModal(prev => ({ ...prev, isOpen: false, post: null }))}
          post={engagementModal.post}
          type={engagementModal.type}
          currentCredits={currentCredits}
          onConfirm={handleEngagementConfirm}
        />
      )}

      {/* Reshare Modal */}
      {reshareModal.post && (
        <Dialog open={reshareModal.isOpen} onOpenChange={(open) => setReshareModal(prev => ({ ...prev, isOpen: open }))}>
          <DialogContent className="mobile-container p-0 max-w-md mx-4 rounded-lg">
            <ReshareOptionsScreen
              post={reshareModal.post}
              onBack={() => setReshareModal({ isOpen: false, post: null })}
              onReshareDirectly={handleDirectReshare}
              onQuotePost={(post) => {
                setReshareModal({ isOpen: false, post: null });
                if (onNavigate) {
                  onNavigate('quote-post', { post });
                }
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TimelineComponent;