import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Smile, Paperclip, Image, X } from "lucide-react";

interface SendMessageScreenProps {
  user: { name: string; username: string; rate: string; online: boolean };
  onBack: () => void;
  callType: 'voice' | 'video';
}

const SendMessageScreen = ({ user, onBack, callType }: SendMessageScreenProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{id: string, text: string, sent: boolean, timestamp: Date}>>([]);

  const quickMessages = [
    "Can you hear me?",
    "One moment please",
    "Let me share my screen",
    "Can you repeat that?",
    "I'll call you back",
    "Thanks for your time"
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: message.trim(),
        sent: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage("");
      
      // Simulate automatic response after 2 seconds
      setTimeout(() => {
        const response = {
          id: (Date.now() + 1).toString(),
          text: "Message received during call",
          sent: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleQuickMessage = (quickMsg: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text: quickMsg,
      sent: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="mobile-container flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-foreground hover:text-foreground/80"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="text-center">
          <h1 className="text-lg font-semibold">Chat Messages</h1>
          <p className="text-sm text-muted-foreground">
            {callType === 'voice' ? 'Voice Call' : 'Video Call'} with {user.name}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
        >
          <X size={20} />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                <Send size={24} className="text-primary" />
              </div>
              <h3 className="font-medium mb-2">Send a message during your call</h3>
              <p className="text-sm text-muted-foreground">
                Chat with {user.name} without interrupting your call
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sent
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sent ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Messages */}
        {messages.length === 0 && (
          <div className="p-4 border-t border-border">
            <h4 className="text-sm font-medium mb-3">Quick Messages</h4>
            <div className="flex flex-wrap gap-2">
              {quickMessages.map((quickMsg, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickMessage(quickMsg)}
                  className="text-xs h-8"
                >
                  {quickMsg}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="shrink-0"
            >
              <Paperclip size={20} />
            </Button>
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message ${user.name}...`}
                className="pr-12"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <Smile size={16} />
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="shrink-0"
            >
              <Send size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessageScreen;