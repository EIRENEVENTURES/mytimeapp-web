import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  ArrowLeft, 
  Settings, 
  Sun, 
  Moon, 
  KeyRound, 
  LogOut,
  Edit3,
  Save,
  X,
  Camera,
  Plus,
  Trash2,
  Link as LinkIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useTheme } from "./ThemeProvider";

interface ProfileData {
  fullName: string;
  email: string;
  username: string;
  phoneNumber: string;
  dateOfBirth: string;
  city: string;
  country: string;
  bio: string;
  chatCreditPerSecond: number;
  callCreditPerSecond: number;
  
  specialty: string;
  links: string[];
}

const ProfileScreen = ({ 
  onBack, 
  onLogout,
  onResetPassword
}: { 
  onBack: () => void;
  onLogout: () => void;
  onResetPassword: () => void;
}) => {
  const { toast } = useToast();
  const { profile, updateProfilePicture, updateName } = useUserProfile();
  const { theme, setTheme } = useTheme();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('userProfileData');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      fullName: profile.name,
      email: "",
      username: "",
      phoneNumber: "",
      dateOfBirth: "",
      city: "",
      country: "",
      bio: "",
      chatCreditPerSecond: 5,
      callCreditPerSecond: 8,
      
      specialty: "",
      links: []
    };
  });
  
  const [editData, setEditData] = useState<ProfileData>(profileData);
  const [newLink, setNewLink] = useState("");

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please choose an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateProfilePicture(result);
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been updated successfully"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateName(editData.fullName);
    setProfileData(editData);
    localStorage.setItem('userProfileData', JSON.stringify(editData));
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully"
    });
  };

  const handleCancel = () => {
    setEditData(profileData);
    setNewLink("");
    setIsEditing(false);
  };

  const handleAddLink = () => {
    if (newLink.trim()) {
      setEditData(prev => ({
        ...prev,
        links: [...prev.links, newLink.trim()]
      }));
      setNewLink("");
    }
  };

  const handleRemoveLink = (index: number) => {
    setEditData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="mobile-container px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-background border">
            <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer">
              {theme === "dark" ? (
                <>
                  <Sun size={16} className="mr-2" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon size={16} className="mr-2" />
                  Dark Mode
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onResetPassword} className="cursor-pointer">
              <KeyRound size={16} className="mr-2" />
              Reset Password
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.location.href = '/delete_account'} className="cursor-pointer text-destructive">
              <Trash2 size={16} className="mr-2" />
              Delete Account
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-destructive">
              <LogOut size={16} className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Profile Picture & Name */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <Avatar className="w-24 h-24 border-4 border-primary/20">
            <AvatarImage src={profile.profilePicture} alt={profile.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-2xl">
              {profile.initials}
            </AvatarFallback>
          </Avatar>
          
          {isEditing && (
            <label htmlFor="profile-picture-upload" className="absolute -bottom-2 -right-2 cursor-pointer">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-background hover:bg-primary/90 transition-colors">
                <Camera size={14} className="text-primary-foreground" />
              </div>
              <Input
                id="profile-picture-upload"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
        
        <h2 className="text-xl font-semibold">{profileData.fullName || profile.name}</h2>
      </div>

      {/* Profile Details */}
      <div className="space-y-4">
        {/* Full Name */}
        <Card className="p-4">
          <Label className="text-sm font-medium text-muted-foreground mb-2 block">Full Name</Label>
          {isEditing ? (
            <Input
              value={editData.fullName}
              onChange={(e) => setEditData(prev => ({ ...prev, fullName: e.target.value }))}
              placeholder="Your full name"
            />
          ) : (
            <p className="text-sm">{profileData.fullName || "Not specified"}</p>
          )}
        </Card>

        {/* Email */}
        <Card className="p-4">
          <Label className="text-sm font-medium text-muted-foreground mb-2 block">Email</Label>
          {isEditing ? (
            <Input
              type="email"
              value={editData.email}
              onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your.email@example.com"
            />
          ) : (
            <p className="text-sm">{profileData.email || "Not specified"}</p>
          )}
        </Card>

        {/* Username */}
        <Card className="p-4">
          <Label className="text-sm font-medium text-muted-foreground mb-2 block">Username</Label>
          {isEditing ? (
            <Input
              value={editData.username}
              onChange={(e) => setEditData(prev => ({ ...prev, username: e.target.value }))}
              placeholder="@yourusername"
            />
          ) : (
            <p className="text-sm">{profileData.username || "Not specified"}</p>
          )}
        </Card>

        {/* Phone Number */}
        <Card className="p-4">
          <Label className="text-sm font-medium text-muted-foreground mb-2 block">Phone Number</Label>
          {isEditing ? (
            <Input
              type="tel"
              value={editData.phoneNumber}
              onChange={(e) => setEditData(prev => ({ ...prev, phoneNumber: e.target.value }))}
              placeholder="+1 (555) 123-4567"
            />
          ) : (
            <p className="text-sm">{profileData.phoneNumber || "Not specified"}</p>
          )}
        </Card>

        {/* Date of Birth */}
        <Card className="p-4">
          <Label className="text-sm font-medium text-muted-foreground mb-2 block">Date of Birth</Label>
          {isEditing ? (
            <Input
              type="date"
              value={editData.dateOfBirth}
              onChange={(e) => setEditData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
            />
          ) : (
            <p className="text-sm">
              {profileData.dateOfBirth 
                ? new Date(profileData.dateOfBirth).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })
                : "Not specified"}
            </p>
          )}
        </Card>

        {/* City */}
        <Card className="p-4">
          <Label className="text-sm font-medium text-muted-foreground mb-2 block">City</Label>
          {isEditing ? (
            <Input
              value={editData.city}
              onChange={(e) => setEditData(prev => ({ ...prev, city: e.target.value }))}
              placeholder="Your city"
            />
          ) : (
            <p className="text-sm">{profileData.city || "Not specified"}</p>
          )}
        </Card>

        {/* Country */}
        <Card className="p-4">
          <Label className="text-sm font-medium text-muted-foreground mb-2 block">Country</Label>
          {isEditing ? (
            <Input
              value={editData.country}
              onChange={(e) => setEditData(prev => ({ ...prev, country: e.target.value }))}
              placeholder="Your country"
            />
          ) : (
            <p className="text-sm">{profileData.country || "Not specified"}</p>
          )}
        </Card>

        {/* Bio */}
        <Card className="p-4">
          <Label className="text-sm font-medium text-muted-foreground mb-2 block">Bio</Label>
          {isEditing ? (
            <Textarea
              value={editData.bio}
              onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself..."
              className="min-h-[80px]"
            />
          ) : (
            <p className="text-sm">{profileData.bio || "No bio added yet"}</p>
          )}
        </Card>

        {/* Specialty */}
        <Card className="p-4">
          <Label className="text-sm font-medium text-muted-foreground mb-2 block">
            Specialty (Profession, Discipline, Interest)
          </Label>
          {isEditing ? (
            <Input
              value={editData.specialty}
              onChange={(e) => setEditData(prev => ({ ...prev, specialty: e.target.value }))}
              placeholder="e.g., Software Engineer, Artist, Coach..."
            />
          ) : (
            <p className="text-sm">{profileData.specialty || "Not specified"}</p>
          )}
        </Card>

        {/* Links */}
        <Card className="p-4">
          <Label className="text-sm font-medium text-muted-foreground mb-2 block">Links</Label>
          
          {isEditing ? (
            <div className="space-y-3">
              {editData.links.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                  <LinkIcon size={16} className="text-muted-foreground flex-shrink-0" />
                  <span className="text-sm flex-1 truncate">{link}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleRemoveLink(index)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Input
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  placeholder="Add a link (website, social media...)"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddLink()}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleAddLink}
                  disabled={!newLink.trim()}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {profileData.links.length > 0 ? (
                profileData.links.map((link, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <LinkIcon size={16} className="text-muted-foreground" />
                    <a 
                      href={link.startsWith('http') ? link : `https://${link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline truncate"
                    >
                      {link}
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No links added yet</p>
              )}
            </div>
          )}
        </Card>

        {/* Rates Section */}
        <div className="mt-2 mb-1">
          <h3 className="text-lg font-semibold">Rates</h3>
          <p className="text-xs text-muted-foreground mt-1">Rates are applied to in-app services and do not represent monetary value.</p>
        </div>

        {/* Chat Credit Per Second */}
        <Card className="p-4">
          <Label className="text-sm font-medium text-muted-foreground mb-2 block">
            Chat & Messaging (Credits/sec)
          </Label>
          {isEditing ? (
            <Input
              type="number"
              min="0"
              step="1"
              value={editData.chatCreditPerSecond}
              onChange={(e) => setEditData(prev => ({ ...prev, chatCreditPerSecond: parseInt(e.target.value) || 0 }))}
              placeholder="Credits earned per second for chats"
            />
          ) : (
            <p className="text-sm text-chat-green font-medium">{profileData.chatCreditPerSecond} credits/sec</p>
          )}
        </Card>

        {/* Call Credit Per Second */}
        <Card className="p-4">
          <Label className="text-sm font-medium text-muted-foreground mb-2 block">
            Voice & Video Calls (Credits/sec)
          </Label>
          {isEditing ? (
            <Input
              type="number"
              min="0"
              step="1"
              value={editData.callCreditPerSecond}
              onChange={(e) => setEditData(prev => ({ ...prev, callCreditPerSecond: parseInt(e.target.value) || 0 }))}
              placeholder="Credits earned per second for calls"
            />
          ) : (
            <p className="text-sm text-calls-orange font-medium">{profileData.callCreditPerSecond} credits/sec</p>
          )}
        </Card>



      </div>

      {/* Action Buttons */}
      <div className="mt-6">
        {isEditing ? (
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={handleCancel}>
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleSave}>
              <Save size={16} className="mr-2" />
              Save
            </Button>
          </div>
        ) : (
          <Button className="w-full" onClick={() => setIsEditing(true)}>
            <Edit3 size={16} className="mr-2" />
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
