import { Button } from "@/components/ui/button";
import { Pause, CreditCard, Play, PhoneOff } from "lucide-react";

type PauseReason = "user_paused" | "credits_exhausted";

interface PausedSessionOverlayProps {
  isVisible: boolean;
  reason: PauseReason;
  sessionType: "chat" | "voice_call" | "video_call";
  sessionTime?: string;
  sessionCost?: string;
  onResume?: () => void;
  onEndSession?: () => void;
  onAddCredits?: () => void;
}

const PausedSessionOverlay = ({
  isVisible,
  reason,
  sessionType,
  sessionTime,
  sessionCost,
  onResume,
  onEndSession,
  onAddCredits,
}: PausedSessionOverlayProps) => {
  if (!isVisible) return null;

  const sessionLabel =
    sessionType === "chat"
      ? "Chat"
      : sessionType === "voice_call"
      ? "Voice Call"
      : "Video Call";

  const isCreditsExhausted = reason === "credits_exhausted";

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="mx-6 w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isCreditsExhausted
                ? "bg-destructive/10 text-destructive"
                : "bg-primary/10 text-primary"
            }`}
          >
            {isCreditsExhausted ? (
              <CreditCard size={32} />
            ) : (
              <Pause size={32} />
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-center text-foreground mb-1">
          {sessionLabel} Paused
        </h2>

        {/* Reason */}
        <p className="text-sm text-muted-foreground text-center mb-4">
          {isCreditsExhausted
            ? "Your credits have been exhausted. Please add more credits to continue this session."
            : "You have paused this paid session. No credits are being charged while paused."}
        </p>

        {/* Session Stats */}
        {(sessionTime || sessionCost) && (
          <div className="flex items-center justify-center gap-6 mb-6 p-3 rounded-lg bg-muted">
            {sessionTime && (
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="font-mono text-sm font-semibold text-foreground">
                  {sessionTime}
                </p>
              </div>
            )}
            {sessionCost && (
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Credits Used</p>
                <p className="font-mono text-sm font-semibold text-foreground">
                  {sessionCost}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Info */}
        {sessionType !== "chat" && (
          <p className="text-xs text-muted-foreground text-center mb-4">
            {isCreditsExhausted
              ? "Add credits to resume. Resuming will redial the other user."
              : "Resuming will redial the other user to continue the session."}
          </p>
        )}
        {sessionType === "chat" && (
          <p className="text-xs text-muted-foreground text-center mb-4">
            {isCreditsExhausted
              ? "Add credits to resume. The chat interface is blocked while paused."
              : "The chat interface is blocked while paused. Resume to unblock."}
          </p>
        )}

        {/* Actions */}
        <div className="space-y-2">
          {isCreditsExhausted && (
            <Button
              onClick={onAddCredits}
              className="w-full bg-primary hover:bg-primary/90"
            >
              <CreditCard size={16} className="mr-2" />
              Add Credits
            </Button>
          )}
          <Button
            onClick={onResume}
            className={`w-full ${isCreditsExhausted ? '' : 'bg-primary hover:bg-primary/90'}`}
            variant={isCreditsExhausted ? "outline" : "default"}
            disabled={isCreditsExhausted}
          >
            <Play size={16} className="mr-2" />
            Resume {sessionLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PausedSessionOverlay;
