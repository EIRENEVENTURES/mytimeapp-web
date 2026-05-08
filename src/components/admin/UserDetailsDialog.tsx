import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { User, Mail, Calendar, CreditCard, Activity } from "lucide-react";

interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  status: string;
  credits: number;
  joined: string;
}

interface UserDetailsDialogProps {
  user: UserData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserDetailsDialog = ({ user, open, onOpenChange }: UserDetailsDialogProps) => {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">User Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Avatar & Name */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.username}</p>
              <Badge variant={user.status === "active" ? "default" : "destructive"} className="mt-1">
                {user.status}
              </Badge>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3 border-border bg-accent/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Mail size={14} />
                <span className="text-xs">Email</span>
              </div>
              <p className="text-sm font-medium text-foreground truncate">{user.email}</p>
            </Card>
            <Card className="p-3 border-border bg-accent/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <CreditCard size={14} />
                <span className="text-xs">Credits</span>
              </div>
              <p className="text-sm font-medium text-foreground">{user.credits}</p>
            </Card>
            <Card className="p-3 border-border bg-accent/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Calendar size={14} />
                <span className="text-xs">Joined</span>
              </div>
              <p className="text-sm font-medium text-foreground">{user.joined}</p>
            </Card>
            <Card className="p-3 border-border bg-accent/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Activity size={14} />
                <span className="text-xs">Activity</span>
              </div>
              <p className="text-sm font-medium text-foreground">
                {user.status === "active" ? "Online" : "Offline"}
              </p>
            </Card>
          </div>

          {/* Activity Summary */}
          <Card className="p-4 border-border bg-accent/30">
            <h4 className="text-sm font-semibold text-foreground mb-2">Activity Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Posts</span>
                <span className="text-foreground font-medium">{Math.floor(Math.random() * 50) + 5}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Followers</span>
                <span className="text-foreground font-medium">{Math.floor(Math.random() * 500) + 20}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Following</span>
                <span className="text-foreground font-medium">{Math.floor(Math.random() * 200) + 10}</span>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;
