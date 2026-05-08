import { Home, List, MessageCircle, Phone, Radio, Wallet } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onNavigate: (screen: string) => void;
  unreadMessages?: number;
  unreadTimeline?: number;
  missedCalls?: number;
}

const BottomNavigation = ({ 
  activeTab, 
  onNavigate,
  unreadMessages = 3,
  unreadTimeline = 5,
  missedCalls = 2
}: BottomNavigationProps) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "timeline", label: "Timeline", icon: List, badge: unreadTimeline },
    { id: "chat", label: "Chat & Calls", icon: null, badge: (unreadMessages || 0) + (missedCalls || 0), customIcon: true },
    { id: "live", label: "Go Live", icon: Radio },
    { id: "wallet", label: "Earnings", icon: Wallet },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto flex items-center justify-around py-2 md:py-3 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center min-w-[48px] md:min-w-[64px] py-1 px-2 md:px-3 rounded-lg transition-colors ${
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="relative">
                {item.customIcon ? (
                  <div className="relative w-[22px] h-[22px] md:w-[26px] md:h-[26px]">
                    <Phone size={16} className="absolute bottom-0 left-0 md:hidden" strokeWidth={isActive ? 2.5 : 2} />
                    <MessageCircle size={13} className="absolute top-0 right-0 md:hidden" strokeWidth={isActive ? 2.5 : 2} />
                    <Phone size={19} className="absolute bottom-0 left-0 hidden md:block" strokeWidth={isActive ? 2.5 : 2} />
                    <MessageCircle size={15} className="absolute top-0 right-0 hidden md:block" strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                ) : (
                  <>
                    <Icon size={22} className="md:hidden" strokeWidth={isActive ? 2.5 : 2} />
                    <Icon size={26} className="hidden md:block" strokeWidth={isActive ? 2.5 : 2} />
                  </>
                )}
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2.5 -right-3 min-w-[16px] h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] md:text-xs mt-0.5 font-medium ${isActive ? "font-semibold" : ""}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
