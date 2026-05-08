import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import ChatAndCallsScreen from "./ChatAndCallsScreen";
import ChatInterfaceScreen from "./ChatInterfaceScreen";
import CreditsEarningsScreen from "./CreditsEarningsScreen";

import SpacesScreen from "./SpacesScreen";
import CreateStoryScreen from "./CreateStoryScreen";
import StoryPreviewScreen from "./StoryPreviewScreen";
import PostStoryScreen from "./PostStoryScreen";
import ViewStoryScreen from "./ViewStoryScreen";
import StoryInsightsScreen from "./StoryInsightsScreen";
import CommentScreen from "./CommentScreen";
import UserSearchScreen from "./UserSearchScreen";
import ShareScreen from "./ShareScreen";
import VoiceCallScreen from "./VoiceCallScreen";
import VideoCallScreen from "./VideoCallScreen";
import MediaLinksDocsScreen from "./MediaLinksDocsScreen";
import ChatSearchScreen from "./ChatSearchScreen";
import NotificationSettingsScreen from "./NotificationSettingsScreen";
import ExportChatScreen from "./ExportChatScreen";
import AddContactScreen from "./AddContactScreen";
import ChatSettingsScreen from "./ChatSettingsScreen";
import BlockUserScreen from "./BlockUserScreen";
import NewCallScreen from "./NewCallScreen";
import ReportUserScreen from "./ReportUserScreen";
import SignUpScreen from "./SignUpScreen";
import ShareScreenScreen from "./ShareScreenScreen";
import SendMessageScreen from "./SendMessageScreen";
import GoLiveScreen from "./GoLiveScreen";
import StreamAnalyticsScreen from "./StreamAnalyticsScreen";
import HostSpaceScreen from "./HostSpaceScreen";
import CreatedSpaceScreen from "./CreatedSpaceScreen";
import InviteParticipantsScreen from "./InviteParticipantsScreen";
import SendInviteScreen from "./SendInviteScreen";
import ChatRateSettingsScreen from "./ChatRateSettingsScreen";
import CallRateSettingsScreen from "./CallRateSettingsScreen";
import CreatePublicLinkScreen from "./CreatePublicLinkScreen";
import JoinSpaceScreen from "./JoinSpaceScreen";
import ActiveSpaceScreen from "./ActiveSpaceScreen";
import EditSpaceScreen from "./EditSpaceScreen";
import SpaceAnalyticsScreen from "./SpaceAnalyticsScreen";
import ExportAnalyticsScreen from "./ExportAnalyticsScreen";
import InviteToSpaceScreen from "./InviteToSpaceScreen";
import SpaceShareScreen from "./SpaceShareScreen";
import SpaceSettingsScreen from "./SpaceSettingsScreen";
import EditPostScreen from "./EditPostScreen";
import ReportPostScreen from "./ReportPostScreen";
import ReshareOptionsScreen from "./ReshareOptionsScreen";
import QuotePostScreen from "./QuotePostScreen";
import ProfileScreen from "./ProfileScreen";
import FollowersScreen from "./FollowersScreen";
import FollowingScreen from "./FollowingScreen";
import UserProfileScreen from "./UserProfileScreen";
import BottomNavigation from "./BottomNavigation";
import TimelineComponent from "./TimelineComponent";
import { Post } from "@/types/Post";
import { useUserProfile } from "@/hooks/use-user-profile";

type Screen = "login" | "signup" | "home" | "timeline" | "chat" | "chat-interface" | "new-call" | "wallet" | "spaces" | "join-space" | "active-space" | "space-settings" | "space-share" | "edit-space" | "space-analytics" | "export-analytics" | "invite-to-space" | "host-space" | "created-space" | "invite-participants" | "send-invite" | "create-public-link" | "live" | "create-story" | "story-preview" | "post-story" | "view-story" | "story-insights" | "comments" | "share" | "voice-call" | "video-call" | "media-links-docs" | "chat-search" | "notification-settings" | "export-chat" | "add-contact" | "chat-settings" | "block-user" | "report-user" | "share-screen" | "send-message" | "go-live" | "stream-analytics" | "user-search" | "edit-post" | "report-post" | "reshare-options" | "quote-post" | "profile" | "followers" | "following" | "user-profile";

// Main navigation tabs for bottom nav
const MAIN_TABS = ["home", "timeline", "chat", "live", "wallet"];

const MyTimeApp = () => {
  const { toast } = useToast();
  const { profile } = useUserProfile();
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  
  // Add debugging for screen changes
  useEffect(() => {
    console.log("Current screen changed to:", currentScreen);
  }, [currentScreen]);
  const [previousScreen, setPreviousScreen] = useState<Screen | null>(null);
  const [previousScreenContext, setPreviousScreenContext] = useState<string | null>(null);
  const [spacesActiveTab, setSpacesActiveTab] = useState<'discover' | 'my-spaces'>('discover');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [storyData, setStoryData] = useState<any>(null);
  const [callType, setCallType] = useState<'voice' | 'video'>('voice');
  
  const [createdSpaceData, setCreatedSpaceData] = useState<any>(null);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [invitedContacts, setInvitedContacts] = useState<any[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<any>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentCredits, setCurrentCredits] = useState(0.08);

  // Get active tab for bottom navigation
  const getActiveTab = () => {
    if (MAIN_TABS.includes(currentScreen)) return currentScreen;
    if (currentScreen === "go-live") return "live";
    return "home";
  };

  const handleBottomNavigation = (tab: string) => {
    if (tab === "live") {
      setCurrentScreen("go-live");
    } else {
      setCurrentScreen(tab as Screen);
    }
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

  // Check if we should show bottom navigation
  const showBottomNav = isLoggedIn && MAIN_TABS.includes(currentScreen);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen("home");
  };

  const handleSignUp = () => {
    setIsLoggedIn(true);
    setCurrentScreen("home");
  };

  const handleNavigateToSignUp = () => {
    setCurrentScreen("signup");
  };

  const handleBackToLogin = () => {
    setCurrentScreen("login");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen("login");
  };

  const handleNavigate = (screen: string, data?: any) => {
    switch (screen) {
      case "chat":
        setCurrentScreen("chat");
        break;
      case "wallet":
        setCurrentScreen("wallet");
        break;
      case "spaces":
        setCurrentScreen("spaces");
        break;
      case "join-space":
        setCurrentScreen("join-space");
        break;
      case "host-space":
        setCurrentScreen("host-space");
        break;
      case "created-space":
        setCurrentScreen("created-space");
        break;
      case "invite-participants":
        setCurrentScreen("invite-participants");
        break;
      case "send-invite":
        setCurrentScreen("send-invite");
        break;
      case "user-search":
        setCurrentScreen("user-search");
        break;
      case "live":
        setCurrentScreen("go-live");
        break;
      case "timeline":
        setCurrentScreen("timeline");
        break;
      case "stream-analytics":
        setCurrentScreen("stream-analytics");
        break;
      case "create-story":
        setCurrentScreen("create-story");
        break;
      case "comments":
        setCurrentScreen("comments");
        break;
      case "share":
        setCurrentScreen("share");
        break;
      case "new-call":
        setCurrentScreen("new-call");
        break;
      case "add-contact":
        setPreviousScreen(currentScreen);
        setCurrentScreen("add-contact");
        break;
      case "edit-post":
        if (data?.post) {
          setSelectedPost(data.post);
        }
        setCurrentScreen("edit-post");
        break;
      case "report-post":
        if (data?.post) {
          setSelectedPost(data.post);
        }
        setCurrentScreen("report-post");
        break;
      case "reshare-options":
        if (data?.post) {
          setSelectedPost(data.post);
        }
        setCurrentScreen("reshare-options");
        break;
      case "quote-post":
        if (data?.post) {
          setSelectedPost(data.post);
        }
        setCurrentScreen("quote-post");
        break;
      case "profile":
        setCurrentScreen("profile");
        break;
      case "followers":
        setCurrentScreen("followers");
        break;
      case "following":
        setCurrentScreen("following");
        break;
      case "user-profile":
        if (data?.user) {
          setSelectedUser(data.user);
        }
        setCurrentScreen("user-profile");
        break;
      case "story-insights":
        setCurrentScreen("story-insights");
        break;
      default:
        setCurrentScreen("home");
    }
  };

  const handleStartChat = (user: any) => {
    setSelectedUser(user);
    setCurrentScreen("chat-interface");
  };

  const handleStartCall = (type: 'voice' | 'video') => {
    setCallType(type);
    setCurrentScreen(type === 'voice' ? 'voice-call' : 'video-call');
  };

  const handleNewCallAction = (type: 'voice' | 'video', contact: any) => {
    setCallType(type);
    setSelectedUser(contact);
    setCurrentScreen(type === 'voice' ? 'voice-call' : 'video-call');
  };

  const handleEndCall = () => {
    setCurrentScreen("chat-interface");
  };

  const handleChatAction = (action: string) => {
    switch (action) {
      case "media-links-docs":
        setCurrentScreen("media-links-docs");
        break;
      case "search":
        setCurrentScreen("chat-search");
        break;
      case "notifications":
        setCurrentScreen("notification-settings");
        break;
      case "export":
        setCurrentScreen("export-chat");
        break;
      case "add-contact":
        setPreviousScreen(currentScreen);
        setCurrentScreen("add-contact");
        break;
      case "settings":
        setCurrentScreen("chat-settings");
        break;
      case "block":
        setCurrentScreen("block-user");
        break;
      case "report":
        setCurrentScreen("report-user");
        break;
      default:
        break;
    }
  };

  const handleCallAction = (action: string) => {
    switch (action) {
      case "share-screen":
        setPreviousScreen(currentScreen);
        setCurrentScreen("share-screen");
        break;
      case "send-message":
        setPreviousScreen(currentScreen);
        setCurrentScreen("send-message");
        break;
      default:
        break;
    }
  };

  const handleCreateStory = (data: any) => {
    setStoryData(data);
    setCurrentScreen("story-preview");
  };

  const handlePreviewToPost = (data: any) => {
    setStoryData(data);
    setCurrentScreen("post-story");
  };

  const handlePostStory = (postData: any) => {
    setStoryData(postData);
    setCurrentScreen("view-story");
  };

  const handleInviteContact = (contact: any) => {
    setSelectedContact(contact);
    setCurrentScreen("send-invite");
  };

  const handleInviteSent = (contact: any) => {
    setInvitedContacts(prev => [...prev, contact]);
  };

  const handleCreateSpace = (spaceData: any) => {
    setCreatedSpaceData(spaceData);
    setCurrentScreen("created-space");
  };

  const handleJoinSpace = (space: any) => {
    setSelectedSpace(space);
    setCurrentScreen("join-space");
  };

  const handleEnterSpace = () => {
    console.log("Entering space, switching to active-space screen");
    setCurrentScreen("active-space");
  };

  const handleLeaveSpace = () => {
    setCurrentScreen("spaces");
  };

  const handleSpaceSettings = () => {
    console.log("Settings icon clicked - handleSpaceSettings called");
    setPreviousScreenContext("active-space");
    console.log("Setting current screen to space-settings");
    setCurrentScreen("space-settings");
  };

  const handleCopySpaceLink = (space: any) => {
    const spaceLink = `https://mytime.app/space/${space.id}`;
    navigator.clipboard.writeText(spaceLink).then(() => {
      toast({
        title: "Link copied!",
        description: "Space link has been copied to clipboard",
      });
    }).catch(() => {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    });
  };

  const handleArchiveSpace = (space: any) => {
    toast({
      title: "Space Archived",
      description: `"${space.title}" has been archived successfully.`,
    });
  };

  const handleDeleteSpace = (space: any) => {
    toast({
      title: "Space Deleted",
      description: `"${space.title}" has been deleted permanently.`,
      variant: "destructive",
    });
  };

  const handleSpaceShareFromSpaces = (space: any) => {
    setSelectedSpace(space);
    setCurrentScreen("space-share");
  };

  const handleSpaceEditFromSpaces = (space: any) => {
    setSelectedSpace(space);
    setSpacesActiveTab('my-spaces');
    setCurrentScreen("edit-space");
  };

  const handleSpaceAnalyticsFromSpaces = (space: any) => {
    setSelectedSpace(space);
    setSpacesActiveTab('my-spaces');
    setCurrentScreen("space-analytics");
  };

  const handleStartHostedSpace = () => {
    console.log("Starting hosted space, switching to active-space");
    setCurrentScreen("active-space");
  };

  const handleEndHostedSpace = () => {
    console.log("Ending hosted space");
    toast({
      title: "Space Ended",
      description: "Your space has been ended successfully.",
    });
    setCurrentScreen("spaces");
  };

  const handleHostedSpaceShare = () => {
    console.log("Sharing hosted space");
    setPreviousScreenContext("created-space");
    setCurrentScreen("space-share");  
  };

  const handleHostedSpaceSettings = () => {
    console.log("Opening hosted space settings");
    setPreviousScreenContext("created-space");
    setCurrentScreen("space-settings");
  };

  const handleExportAnalytics = () => {
    setCurrentScreen("export-analytics");
  };

  const handleSpaceInvite = (space: any) => {
    setSelectedSpace(space);
    setSpacesActiveTab('my-spaces');
    setCurrentScreen("invite-to-space");
  };

  const handleSpaceSettingsFromSpaces = (space: any) => {
    setSelectedSpace(space);
    setPreviousScreenContext("spaces");
    setSpacesActiveTab('my-spaces');
    setCurrentScreen("space-settings");
  };

  const handleActiveSpaceShare = () => {
    setCurrentScreen("space-share");
  };

  const handleSaveRateSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your chat rate settings have been saved successfully.",
    });
    setCurrentScreen("chat");
  };

  const handleSaveCallRateSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your call rate settings have been saved successfully.",
    });
    setCurrentScreen("chat");
  };


  const handleBack = () => {
    setCurrentScreen("home");
  };

  const handleResetPassword = () => {
    toast({
      title: "Reset Password",
      description: "Password reset functionality will be available when authentication is set up.",
    });
  };

  if (!isLoggedIn) {
    if (currentScreen === "signup") {
      return <SignUpScreen onSignUp={handleSignUp} onBack={handleBackToLogin} />;
    }
    return <LoginScreen onLogin={handleLogin} onNavigateToSignUp={handleNavigateToSignUp} />;
  }

  switch (currentScreen) {
    case "profile":
      return <ProfileScreen onBack={() => setCurrentScreen("home")} onLogout={handleLogout} onResetPassword={handleResetPassword} />;
    case "followers":
      return <FollowersScreen 
        onBack={() => setCurrentScreen("home")} 
        onViewProfile={(user) => {
          setSelectedUser(user);
          setCurrentScreen("user-profile");
        }} 
      />;
    case "following":
      return <FollowingScreen 
        onBack={() => setCurrentScreen("home")} 
        onViewProfile={(user) => {
          setSelectedUser(user);
          setCurrentScreen("user-profile");
        }} 
      />;
    case "user-profile":
      return <UserProfileScreen 
        user={selectedUser} 
        onBack={() => {
          // Go back to the previous screen (followers or following)
          if (previousScreen) {
            setCurrentScreen(previousScreen);
            setPreviousScreen(null);
          } else {
            setCurrentScreen("home");
          }
        }} 
        onStartChat={handleStartChat} 
      />;
    case "chat":
      return (
        <>
          <div className="pb-16">
            <ChatAndCallsScreen onBack={handleBack} onStartChat={handleStartChat} onNavigate={handleNavigate} />
          </div>
          <BottomNavigation activeTab={getActiveTab()} onNavigate={handleBottomNavigation} />
        </>
      );
    case "chat-interface":
      return <ChatInterfaceScreen user={selectedUser} onBack={() => setCurrentScreen("chat")} onStartCall={handleStartCall} onChatAction={handleChatAction} />;
    case "voice-call":
      return <VoiceCallScreen user={selectedUser} onBack={() => setCurrentScreen("chat-interface")} onEndCall={handleEndCall} onCallAction={handleCallAction} />;
    case "video-call":
      return <VideoCallScreen user={selectedUser} onBack={() => setCurrentScreen("chat-interface")} onEndCall={handleEndCall} onCallAction={handleCallAction} />;
    case "share-screen":
      return <ShareScreenScreen user={selectedUser} onBack={() => {
        if (previousScreen) {
          setCurrentScreen(previousScreen);
          setPreviousScreen(null);
        } else {
          setCurrentScreen("chat-interface");
        }
      }} callType={callType} />;
    case "send-message":
      return <SendMessageScreen user={selectedUser} onBack={() => {
        if (previousScreen) {
          setCurrentScreen(previousScreen);
          setPreviousScreen(null);
        } else {
          setCurrentScreen("chat-interface");
        }
      }} callType={callType} />;
    case "media-links-docs":
      return <MediaLinksDocsScreen user={selectedUser} onBack={() => setCurrentScreen("chat-interface")} />;
    case "chat-search":
      return <ChatSearchScreen user={selectedUser} onBack={() => setCurrentScreen("chat-interface")} />;
    case "notification-settings":
      return <NotificationSettingsScreen user={selectedUser} onBack={() => setCurrentScreen("chat-interface")} />;
    case "export-chat":
      return <ExportChatScreen user={selectedUser} onBack={() => setCurrentScreen("chat-interface")} />;
    case "add-contact":
      return <AddContactScreen user={selectedUser} onBack={() => {
        // Navigate back based on previous screen context
        if (previousScreen === "new-call") {
          setCurrentScreen("new-call");
        } else {
          setCurrentScreen("chat-interface");
        }
        setPreviousScreen(null);
      }} />;
    case "chat-settings":
      return <ChatSettingsScreen user={selectedUser} onBack={() => setCurrentScreen("chat-interface")} />;
    case "block-user":
      return <BlockUserScreen user={selectedUser} onBack={() => setCurrentScreen("chat-interface")} />;
    case "report-user":
      return <ReportUserScreen user={selectedUser} onBack={() => setCurrentScreen("chat-interface")} />;
    case "new-call":
      return <NewCallScreen onBack={() => setCurrentScreen("chat")} onStartCall={handleNewCallAction} onNavigate={handleNavigate} onSelectUser={setSelectedUser} />;
    case "wallet":
      return (
        <>
          <div className="pb-16">
            <CreditsEarningsScreen onBack={handleBack} />
          </div>
          <BottomNavigation activeTab={getActiveTab()} onNavigate={handleBottomNavigation} />
        </>
      );
    case "go-live":
      return (
        <>
          <div className="pb-16">
            <GoLiveScreen onBack={handleBack} />
          </div>
          <BottomNavigation activeTab={getActiveTab()} onNavigate={handleBottomNavigation} />
        </>
      );
    case "stream-analytics":
      return <StreamAnalyticsScreen onBack={handleBack} />;
    case "spaces":
      return <SpacesScreen 
        onBack={handleBack} 
        onNavigate={handleNavigate} 
        onJoinSpace={handleJoinSpace} 
        onShareSpace={handleSpaceShareFromSpaces}
        onEditSpace={handleSpaceEditFromSpaces}
        onCopyLink={handleCopySpaceLink}
        onInvitePeople={handleSpaceInvite}
        onAnalytics={handleSpaceAnalyticsFromSpaces}
        onSpaceSettings={handleSpaceSettingsFromSpaces}
        onArchiveSpace={handleArchiveSpace}
        onDeleteSpace={handleDeleteSpace}
        activeTab={spacesActiveTab}
        onTabChange={setSpacesActiveTab}
      />;
    case "join-space":
      return <JoinSpaceScreen onBack={() => setCurrentScreen("spaces")} space={selectedSpace} onJoinSpace={handleEnterSpace} />;
    case "active-space":
      console.log("Rendering ActiveSpaceScreen with space:", selectedSpace);
      return <ActiveSpaceScreen onLeave={handleLeaveSpace} space={selectedSpace} onSpaceSettings={handleSpaceSettings} onShare={handleActiveSpaceShare} />;
    case "space-settings":
      console.log("Rendering SpaceSettingsScreen with space:", selectedSpace);
      return <SpaceSettingsScreen 
        onBack={() => {
          const backScreen = previousScreenContext || "active-space";
          setPreviousScreenContext(null);
          if (backScreen === "spaces") {
            setSpacesActiveTab('my-spaces');
          } else if (backScreen === "created-space") {
            // Return to created space screen for hosted spaces
          }
          setCurrentScreen(backScreen as Screen);
        }}
        space={selectedSpace} 
      />;
    case "space-share":
      return <SpaceShareScreen 
        onBack={() => {
          const backScreen = previousScreenContext || "spaces";
          setPreviousScreenContext(null);
          if (backScreen === "spaces") {
            setSpacesActiveTab('my-spaces');
          }
          setCurrentScreen(backScreen as Screen);
        }} 
        space={selectedSpace} 
      />;
    case "edit-space":
      return <EditSpaceScreen onBack={() => {
        setSpacesActiveTab('my-spaces');
        setCurrentScreen("spaces");
      }} space={selectedSpace} />;
    case "space-analytics":
      return <SpaceAnalyticsScreen onBack={() => {
        setSpacesActiveTab('my-spaces');
        setCurrentScreen("spaces");
      }} space={selectedSpace} onExport={handleExportAnalytics} />;
    case "export-analytics":
      return <ExportAnalyticsScreen onBack={() => setCurrentScreen("space-analytics")} space={selectedSpace} />;
    case "invite-to-space":
      return <InviteToSpaceScreen onBack={() => {
        setSpacesActiveTab('my-spaces');
        setCurrentScreen("spaces");
      }} space={selectedSpace} />;
    case "host-space":
      return <HostSpaceScreen onBack={() => setCurrentScreen("home")} onCreateSpace={handleCreateSpace} />;
    case "created-space":
      return <CreatedSpaceScreen 
        onBack={() => setCurrentScreen("spaces")} 
        spaceData={createdSpaceData} 
        onNavigate={handleNavigate}
        onShare={handleHostedSpaceShare}
        onSettings={handleHostedSpaceSettings}
        onStartSpace={handleStartHostedSpace}
        onEndSpace={handleEndHostedSpace}
      />;
    case "invite-participants":
      return <InviteParticipantsScreen onBack={() => setCurrentScreen("created-space")} spaceData={createdSpaceData} onInviteContact={handleInviteContact} onNavigate={handleNavigate} invitedContacts={invitedContacts} />;
    case "send-invite":
      return <SendInviteScreen onBack={() => setCurrentScreen("invite-participants")} contact={selectedContact} spaceData={createdSpaceData} onInviteSent={handleInviteSent} />;
    case "create-public-link":
      return <CreatePublicLinkScreen onBack={() => setCurrentScreen("invite-participants")} spaceData={createdSpaceData} />;
    case "create-story":
      return <CreateStoryScreen onBack={handleBack} onNext={handleCreateStory} />;
    case "story-preview":
      return <StoryPreviewScreen 
        storyData={storyData} 
        onBack={() => setCurrentScreen("create-story")} 
        onEdit={() => setCurrentScreen("create-story")}
        onNext={handlePreviewToPost} 
      />;
    case "post-story":
      return <PostStoryScreen storyData={storyData} onBack={() => setCurrentScreen("story-preview")} onPost={handlePostStory} />;
    case "view-story":
      return <ViewStoryScreen storyData={storyData} onBack={handleBack} onNavigate={handleNavigate} />;
    case "story-insights":
      return <StoryInsightsScreen storyData={storyData} onBack={() => setCurrentScreen("view-story")} onNavigate={handleNavigate} />;
    case "user-search":
      return <UserSearchScreen onBack={handleBack} onNavigate={(screen, user) => {
        if (user) {
          setSelectedUser(user);
        }
        setCurrentScreen(screen as Screen);
      }} />;
    case "comments":
      return <CommentScreen storyData={storyData} onBack={() => setCurrentScreen("view-story")} />;
    case "share":
      return <ShareScreen storyData={storyData} onBack={() => setCurrentScreen("view-story")} />;
    case "edit-post":
      return <EditPostScreen 
        post={selectedPost} 
        onBack={() => setCurrentScreen("home")} 
        onSave={(updatedPost) => {
          // Handle post update logic here
          setCurrentScreen("home");
        }} 
      />;
    case "report-post":
      return <ReportPostScreen 
        post={selectedPost} 
        onBack={() => setCurrentScreen("home")} 
      />;
    case "reshare-options":
      return <ReshareOptionsScreen 
        post={selectedPost} 
        onBack={() => setCurrentScreen("home")} 
        onReshareDirectly={(post) => {
          // Handle direct reshare logic here
          setCurrentScreen("home");
        }}
        onQuotePost={(post) => {
          setCurrentScreen("quote-post");
        }}
      />;
    case "quote-post":
      return <QuotePostScreen 
        originalPost={selectedPost} 
        onBack={() => setCurrentScreen("home")} 
        onPost={(quotePostData) => {
          // Handle quote post creation logic here
          setCurrentScreen("home");
        }}
      />;
    case "timeline":
      return (
        <>
          <div className="mobile-container px-4 py-6 pb-20">
            <TimelineComponent
              posts={posts}
              onUpdatePost={handleUpdatePost}
              currentCredits={currentCredits}
              onCreditsChange={handleCreditsChange}
              onNavigate={handleNavigate}
              onDeletePost={handleDeletePost}
            />
          </div>
          <BottomNavigation activeTab={getActiveTab()} onNavigate={handleBottomNavigation} />
        </>
      );
    default:
      return (
        <>
          <div className="pb-16">
            <HomeScreen onNavigate={handleNavigate} />
          </div>
          <BottomNavigation activeTab={getActiveTab()} onNavigate={handleBottomNavigation} />
        </>
      );
  }
};

export default MyTimeApp;