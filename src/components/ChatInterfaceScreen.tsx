import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ArrowLeft, Send, Phone, Video, MoreVertical, DollarSign, Clock, Pause, Play, UserPlus, Shield, Flag, Settings, FileText, Search, BellOff, Download } from "lucide-react";
import PausedSessionOverlay from "./PausedSessionOverlay";

const ChatInterfaceScreen = ({ 
  user, 
  onBack,
  onStartCall,
  onChatAction 
}: { 
  user: { name: string; username: string; rate: number; online: boolean }; 
  onBack: () => void;
  onStartCall: (type: 'voice' | 'video') => void;
  onChatAction: (action: string) => void;
}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! Thanks for reaching out. I'm excited to chat with you! 😊",
      sender: "them",
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: 2,
      text: "Hi! Great to connect with you. How's your day going?",
      sender: "me",
      timestamp: new Date(Date.now() - 3 * 60 * 1000)
    }
  ]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [sessionCost, setSessionCost] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseReason, setPauseReason] = useState<"user_paused" | "credits_exhausted">("user_paused");
  const maxCredits = 500; // Simulated credit balance
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
        setSessionCost(prev => {
          const newCost = prev + user.rate;
          if (newCost >= maxCredits) {
            setIsTimerActive(false);
            setIsPaused(true);
            setPauseReason("credits_exhausted");
            return maxCredits;
          }
          return newCost;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, user.rate]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "me" as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage("");
    
    if (!isTimerActive) {
      setIsTimerActive(true);
    }
  };

  const toggleTimer = () => {
    if (isTimerActive) {
      setIsTimerActive(false);
      setIsPaused(true);
      setPauseReason("user_paused");
    } else {
      setIsTimerActive(true);
      setIsPaused(false);
    }
  };

  const handleResumeSession = () => {
    setIsPaused(false);
    setIsTimerActive(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mobile-container flex flex-col h-screen relative">
      <PausedSessionOverlay
        isVisible={isPaused}
        reason={pauseReason}
        sessionType="chat"
        sessionTime={formatTime(sessionTime)}
        sessionCost={`${sessionCost.toFixed(0)} Credits`}
        onResume={handleResumeSession}
        onEndSession={onBack}
        onAddCredits={() => onChatAction('add-credits')}
      />
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              {user.online && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-chat-green rounded-full border-2 border-background"></div>
              )}
            </div>
            <div>
              <h1 className="font-semibold">{user.name}</h1>
              <p className="text-xs text-muted-foreground">
                {user.online ? "Online" : "Last seen recently"} • {user.rate} Credits/sec
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-calls-green"
            onClick={() => onStartCall('voice')}
          >
            <Phone size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-calls-green"
            onClick={() => onStartCall('video')}
          >
            <Video size={18} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-background border border-border shadow-lg z-50" align="end">
              <DropdownMenuItem 
                className="hover:bg-muted cursor-pointer"
                onClick={() => onChatAction('media-links-docs')}
              >
                <FileText size={16} className="mr-2" />
                Media, links and docs
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-muted cursor-pointer"
                onClick={() => onChatAction('search')}
              >
                <Search size={16} className="mr-2" />
                Search
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-muted cursor-pointer"
                onClick={() => onChatAction('notifications')}
              >
                <BellOff size={16} className="mr-2" />
                Mute notifications
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-muted cursor-pointer"
                onClick={() => onChatAction('export')}
              >
                <Download size={16} className="mr-2" />
                Export chat
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="hover:bg-muted cursor-pointer"
                onClick={() => onChatAction('add-contact')}
              >
                <UserPlus size={16} className="mr-2" />
                Add to Contacts
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-muted cursor-pointer"
                onClick={() => onChatAction('settings')}
              >
                <Settings size={16} className="mr-2" />
                Chat Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="hover:bg-muted cursor-pointer"
                onClick={() => onChatAction('block')}
              >
                <Shield size={16} className="mr-2" />
                Block User
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-muted cursor-pointer text-destructive hover:text-destructive"
                onClick={() => onChatAction('report')}
              >
                <Flag size={16} className="mr-2" />
                Report User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Timer/Billing Bar */}
      {(isTimerActive || sessionTime > 0) && (
        <div className="bg-wallet-blue/10 border-b border-wallet-blue/20 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-wallet-blue" />
                <span className="font-mono text-sm font-semibold">
                  {formatTime(sessionTime)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-wallet-blue" />
                <span className="font-mono text-sm font-semibold">
                  {sessionCost.toFixed(0)} Credits
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTimer}
              className="text-wallet-blue hover:bg-wallet-blue/20"
            >
              {isTimerActive ? <Pause size={16} /> : <Play size={16} />}
            </Button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.sender === "me"
                  ? "bg-primary text-primary-foreground ml-12"
                  : "bg-muted mr-12"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === "me" 
                  ? "text-primary-foreground/70" 
                  : "text-muted-foreground"
              }`}>
                {msg.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-background">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 bg-input border-border"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            <Send size={18} />
          </Button>
        </div>
        
        {!isTimerActive && sessionTime === 0 && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Timer will start when you send your first message • {user.rate} Credits/sec
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatInterfaceScreen;