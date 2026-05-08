import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

const LoginScreen = ({ onLogin, onNavigateToSignUp }: { onLogin: () => void; onNavigateToSignUp: () => void }) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    onLogin();
  };

  return (
    <div className="mobile-container flex flex-col justify-center px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-streams-purple bg-clip-text text-transparent mb-3">
          My Time
        </h1>
        <p className="text-muted-foreground text-lg">
          Connect. Thrive.
        </p>
      </div>

      <Card className="feature-card mb-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Username or Email or Phone Number</label>
            <Input
              type="text"
              placeholder="Enter your username, email, or phone number"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="bg-input border-border"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border-border pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button 
            onClick={handleLogin}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl"
          >
            Sign In
          </Button>
        </div>
      </Card>

      <div className="text-center">
        <p className="text-muted-foreground">
          Don't have an account?{" "}
          <span 
            className="text-primary cursor-pointer hover:underline"
            onClick={onNavigateToSignUp}
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;