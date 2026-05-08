import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users, 
  CreditCard, 
  FileText, 
  BarChart3, 
  DollarSign, 
  Settings,
  LogOut,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Search,
  Eye,
  Ban,
  Check,
  X,
  Clock
} from "lucide-react";
import UserDetailsDialog from "./UserDetailsDialog";
import BanUserDialog from "./BanUserDialog";
import ReportDetailsDialog from "./ReportDetailsDialog";
import ReportActionDialog from "./ReportActionDialog";
import PayoutDetailsDialog from "./PayoutDetailsDialog";
import PayoutActionDialog from "./PayoutActionDialog";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [showReportDetails, setShowReportDetails] = useState(false);
  const [showReportAction, setShowReportAction] = useState(false);
  const [reportAction, setReportAction] = useState<"resolve" | "dismiss" | null>(null);
  const [reportsList, setReportsList] = useState([
    { id: 1, type: "Post", reportedItem: "Post by @spam_user", reason: "Spam content", reporter: "@sarah_creator", status: "pending", date: "Dec 14, 2024" },
    { id: 2, type: "User", reportedItem: "@fake_account", reason: "Fake account", reporter: "@mike_w", status: "pending", date: "Dec 14, 2024" },
    { id: 3, type: "Post", reportedItem: "Post by @john_doe", reason: "Inappropriate content", reporter: "@lisa_b", status: "reviewed", date: "Dec 13, 2024" },
    { id: 4, type: "Comment", reportedItem: "Comment on post #1234", reason: "Harassment", reporter: "@emily_c", status: "resolved", date: "Dec 12, 2024" },
  ]);
  const [selectedPayout, setSelectedPayout] = useState<any>(null);
  const [showPayoutDetails, setShowPayoutDetails] = useState(false);
  const [showPayoutAction, setShowPayoutAction] = useState(false);
  const [payoutAction, setPayoutAction] = useState<"approve" | "reject" | null>(null);
  const [payoutsList, setPayoutsList] = useState([
    { id: 1, user: "@sarah_creator", amount: "$450", method: "Bank Transfer", status: "pending", requested: "Dec 14, 2024" },
    { id: 2, user: "@mike_w", amount: "$280", method: "Paystack", status: "pending", requested: "Dec 14, 2024" },
    { id: 3, user: "@john_doe", amount: "$150", method: "Opay", status: "approved", requested: "Dec 13, 2024" },
    { id: 4, user: "@lisa_b", amount: "$320", method: "Bank Transfer", status: "completed", requested: "Dec 12, 2024" },
    { id: 5, user: "@emily_c", amount: "$200", method: "Paystack", status: "rejected", requested: "Dec 11, 2024" },
  ]);
  const [usersList, setUsersList] = useState([
    { id: 1, name: "Sarah Johnson", username: "@sarah_creator", email: "sarah@email.com", status: "active", credits: 1250, joined: "Jan 15, 2024" },
    { id: 2, name: "John Doe", username: "@john_doe", email: "john@email.com", status: "active", credits: 890, joined: "Feb 3, 2024" },
    { id: 3, name: "Emily Chen", username: "@emily_c", email: "emily@email.com", status: "suspended", credits: 0, joined: "Dec 20, 2023" },
    { id: 4, name: "Mike Wilson", username: "@mike_w", email: "mike@email.com", status: "active", credits: 2100, joined: "Mar 8, 2024" },
    { id: 5, name: "Lisa Brown", username: "@lisa_b", email: "lisa@email.com", status: "active", credits: 560, joined: "Jan 28, 2024" },
  ]);

  const handleLogout = () => {
    navigate("/admin/login");
  };

  const stats = [
    { label: "Total Users", value: "12,847", change: "+12%", icon: Users, color: "text-primary" },
    { label: "Active Today", value: "2,341", change: "+8%", icon: TrendingUp, color: "text-green-500" },
    { label: "Total Revenue", value: "$48,290", change: "+23%", icon: DollarSign, color: "text-streams-purple" },
    { label: "Pending Payouts", value: "$3,420", change: "14 requests", icon: CreditCard, color: "text-orange-500" },
  ];

  const menuItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "User Management", icon: Users },
    { id: "transactions", label: "Transactions", icon: CreditCard },
    { id: "content", label: "Content Moderation", icon: FileText },
    { id: "payouts", label: "Payout Management", icon: DollarSign },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const recentActivity = [
    { type: "payout", message: "Payout request from @sarah_creator", time: "2 min ago", status: "pending" },
    { type: "report", message: "Post reported for spam", time: "15 min ago", status: "pending" },
    { type: "user", message: "New user registration spike detected", time: "1 hour ago", status: "info" },
    { type: "payout", message: "Payout completed for @john_doe", time: "2 hours ago", status: "completed" },
  ];

  const handleBanUser = (userId: number, action: string) => {
    setUsersList(prev => prev.map(u => 
      u.id === userId 
        ? { ...u, status: action === "suspend" ? "suspended" : "active" }
        : u
    ));
  };


  const handlePayoutAction = (payoutId: number, newStatus: string) => {
    setPayoutsList(prev => prev.map(p => p.id === payoutId ? { ...p, status: newStatus } : p));
  };


  const analyticsData = [
    { metric: "Daily Active Users", value: "2,341", change: "+8%", trend: "up" },
    { metric: "New Signups (Today)", value: "127", change: "+15%", trend: "up" },
    { metric: "Total Posts Created", value: "8,492", change: "+5%", trend: "up" },
    { metric: "Avg. Session Duration", value: "12m 34s", change: "-2%", trend: "down" },
    { metric: "Credit Transactions", value: "3,891", change: "+18%", trend: "up" },
    { metric: "Payout Volume", value: "$12,450", change: "+22%", trend: "up" },
  ];

  const renderOverview = () => (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5 border-border bg-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                <p className="text-xs text-green-500 mt-1">{stat.change}</p>
              </div>
              <div className={`p-2 rounded-lg bg-accent ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-5 border-border bg-card">
          <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`p-1.5 rounded-full ${
                  activity.status === "pending" ? "bg-orange-100 text-orange-500" :
                  activity.status === "completed" ? "bg-green-100 text-green-500" :
                  "bg-blue-100 text-blue-500"
                }`}>
                  {activity.status === "pending" ? <AlertCircle size={14} /> :
                   activity.status === "completed" ? <CheckCircle size={14} /> :
                   <TrendingUp size={14} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-5 border-border bg-card">
          <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveTab("users")}>
              <Users size={20} />
              <span className="text-xs">View Users</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveTab("payouts")}>
              <CreditCard size={20} />
              <span className="text-xs">Process Payouts</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveTab("content")}>
              <FileText size={20} />
              <span className="text-xs">Review Reports</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setActiveTab("transactions")}>
              <BarChart3 size={20} />
              <span className="text-xs">View Analytics</span>
            </Button>
          </div>
        </Card>
      </div>
    </>
  );

  const renderUsers = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">User Management</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input 
            placeholder="Search users..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Card className="border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersList.filter(u => 
              u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              u.username.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.username}</p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.status === "active" ? "default" : "destructive"}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-foreground">{user.credits}</TableCell>
                <TableCell className="text-muted-foreground">{user.joined}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => { setSelectedUser(user); setShowUserDetails(true); }}>
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => { setSelectedUser(user); setShowBanDialog(true); }}>
                      <Ban size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const renderPayouts = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Payout Management</h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-orange-100 text-orange-600 border-orange-200">
            {payoutsList.filter(p => p.status === "pending").length} Pending
          </Badge>
        </div>
      </div>

      <Card className="border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payoutsList.map((payout) => (
              <TableRow key={payout.id}>
                <TableCell className="font-medium text-foreground">{payout.user}</TableCell>
                <TableCell className="text-foreground">{payout.amount}</TableCell>
                <TableCell className="text-muted-foreground">{payout.method}</TableCell>
                <TableCell>
                  <Badge variant={
                    payout.status === "pending" ? "outline" :
                    payout.status === "approved" ? "default" :
                    payout.status === "completed" ? "secondary" : "destructive"
                  } className={
                    payout.status === "pending" ? "bg-orange-100 text-orange-600 border-orange-200" :
                    payout.status === "approved" ? "bg-blue-100 text-blue-600 border-blue-200" :
                    payout.status === "completed" ? "bg-green-100 text-green-600 border-green-200" : ""
                  }>
                    {payout.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{payout.requested}</TableCell>
                <TableCell>
                  {payout.status === "pending" && (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700" onClick={() => { setSelectedPayout(payout); setPayoutAction("approve"); setShowPayoutAction(true); }}>
                        <Check size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => { setSelectedPayout(payout); setPayoutAction("reject"); setShowPayoutAction(true); }}>
                        <X size={16} />
                      </Button>
                    </div>
                  )}
                  {payout.status === "approved" && (
                    <Button variant="ghost" size="sm" onClick={() => { setSelectedPayout(payout); setShowPayoutDetails(true); }}>
                      <Eye size={16} />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const handleReportAction = (reportId: number, newStatus: string) => {
    setReportsList(prev => prev.map(r => r.id === reportId ? { ...r, status: newStatus } : r));
  };

  const renderReports = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Content Moderation</h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-orange-100 text-orange-600 border-orange-200">
            {reportsList.filter(r => r.status === "pending").length} Pending
          </Badge>
        </div>
      </div>

      <Card className="border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Reported Item</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportsList.map((report) => (
              <TableRow key={report.id}>
                <TableCell>
                  <Badge variant="outline">{report.type}</Badge>
                </TableCell>
                <TableCell className="font-medium text-foreground">{report.reportedItem}</TableCell>
                <TableCell className="text-muted-foreground">{report.reason}</TableCell>
                <TableCell className="text-muted-foreground">{report.reporter}</TableCell>
                <TableCell>
                  <Badge variant={
                    report.status === "pending" ? "outline" :
                    report.status === "reviewed" ? "default" : "secondary"
                  } className={
                    report.status === "pending" ? "bg-orange-100 text-orange-600 border-orange-200" :
                    report.status === "reviewed" ? "bg-blue-100 text-blue-600 border-blue-200" :
                    "bg-green-100 text-green-600 border-green-200"
                  }>
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {report.status === "pending" && (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => { setSelectedReport(report); setShowReportDetails(true); }}>
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-green-600" onClick={() => { setSelectedReport(report); setReportAction("resolve"); setShowReportAction(true); }}>
                        <Check size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive" onClick={() => { setSelectedReport(report); setReportAction("dismiss"); setShowReportAction(true); }}>
                        <X size={16} />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Analytics Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {analyticsData.map((item, index) => (
          <Card key={index} className="p-5 border-border bg-card">
            <p className="text-sm text-muted-foreground">{item.metric}</p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-2xl font-bold text-foreground">{item.value}</p>
              <div className={`flex items-center gap-1 text-sm ${item.trend === "up" ? "text-green-500" : "text-destructive"}`}>
                <TrendingUp size={14} className={item.trend === "down" ? "rotate-180" : ""} />
                {item.change}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-5 border-border bg-card">
        <h3 className="font-semibold text-foreground mb-4">Revenue Trends</h3>
        <div className="h-48 flex items-center justify-center text-muted-foreground">
          <p>Chart placeholder - Revenue data visualization</p>
        </div>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "users": return renderUsers();
      case "payouts": return renderPayouts();
      case "content": return renderReports();
      case "transactions": return renderAnalytics();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">My Time</h2>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
        >
          <LogOut size={18} />
          Sign Out
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">
              {menuItems.find(m => m.id === activeTab)?.label || "Dashboard Overview"}
            </h1>
            <p className="text-muted-foreground">Welcome back, Admin</p>
          </div>

          {renderContent()}
        </div>
      </main>

      <UserDetailsDialog user={selectedUser} open={showUserDetails} onOpenChange={setShowUserDetails} />
      <BanUserDialog user={selectedUser} open={showBanDialog} onOpenChange={setShowBanDialog} onBanUser={handleBanUser} />
      <ReportDetailsDialog report={selectedReport} open={showReportDetails} onOpenChange={setShowReportDetails} />
      <ReportActionDialog report={selectedReport} action={reportAction} open={showReportAction} onOpenChange={setShowReportAction} onAction={handleReportAction} />
      <PayoutDetailsDialog payout={selectedPayout} open={showPayoutDetails} onOpenChange={setShowPayoutDetails} />
      <PayoutActionDialog payout={selectedPayout} action={payoutAction} open={showPayoutAction} onOpenChange={setShowPayoutAction} onAction={handlePayoutAction} />
    </div>
  );
};

export default AdminDashboard;
