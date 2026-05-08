import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Phone, Plus, Clock, PhoneCall, Video } from "lucide-react";
import { useState } from "react";

const CallsScreen = ({ onBack, onNavigate }: { onBack: () => void; onNavigate: (screen: string) => void }) => {
  const [activeTab, setActiveTab] = useState<'incoming' | 'history'>('incoming');
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
          <h1 className="text-xl font-semibold">Calls</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-calls-green hover:bg-calls-green/90 text-white rounded-full"
            onClick={() => onNavigate('new-call')}
          >
            <Plus size={16} className="mr-2" />
            New Call
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        <button 
          className={`flex-1 py-3 px-4 font-medium ${
            activeTab === 'incoming' 
              ? 'text-calls-green border-b-2 border-calls-green' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('incoming')}
        >
          Incoming (0)
        </button>
        <button 
          className={`flex-1 py-3 px-4 font-medium ${
            activeTab === 'history' 
              ? 'text-calls-green border-b-2 border-calls-green' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'incoming' ? (
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-24 h-24 rounded-full bg-calls-green/10 flex items-center justify-center mb-6">
            <Phone size={40} className="text-calls-green" />
          </div>
          <h2 className="text-xl font-semibold mb-3">No Incoming Calls</h2>
          <p className="text-muted-foreground leading-relaxed">
            Incoming calls will appear here. Users can call you for monetized conversations at your set rate.
          </p>
        </div>
      ) : (
        <div className="flex-1">
          <div className="p-4 space-y-3">
            {/* Sample call history items */}
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-calls-green/10 flex items-center justify-center">
                  <PhoneCall size={16} className="text-calls-green" />
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
                <div className="w-10 h-10 rounded-full bg-calls-green/10 flex items-center justify-center">
                  <Video size={16} className="text-calls-green" />
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
                <div className="w-10 h-10 rounded-full bg-calls-green/10 flex items-center justify-center">
                  <PhoneCall size={16} className="text-calls-green" />
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
    </div>
  );
};

export default CallsScreen;