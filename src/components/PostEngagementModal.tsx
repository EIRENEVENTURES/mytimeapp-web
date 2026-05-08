import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Send, Coins, Users2, Mic, Square, Trash2, Play, Pause } from "lucide-react";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useToast } from "@/hooks/use-toast";
import { Post } from "@/types/Post";

interface EngagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
  type: 'like' | 'comment';
  currentCredits: number;
  onConfirm: (postId: string, data?: { comment?: string; voiceNote?: { url: string; duration: number } }) => void;
}

const PostEngagementModal = ({ 
  isOpen, 
  onClose, 
  post, 
  type, 
  currentCredits, 
  onConfirm 
}: EngagementModalProps) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [voiceNoteUrl, setVoiceNoteUrl] = useState<string | null>(null);
  const [voiceNoteDuration, setVoiceNoteDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { profile } = useUserProfile();
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      if (voiceNoteUrl) URL.revokeObjectURL(voiceNoteUrl);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setVoiceNoteUrl(url);
        setVoiceNoteDuration(recordingTime);
        stream.getTracks().forEach(t => t.stop());
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 120) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to record a voice note.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    setIsRecording(false);
  };

  const deleteVoiceNote = () => {
    if (voiceNoteUrl) URL.revokeObjectURL(voiceNoteUrl);
    setVoiceNoteUrl(null);
    setVoiceNoteDuration(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  const togglePlayback = () => {
    if (!voiceNoteUrl) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(voiceNoteUrl);
      audioRef.current.onended = () => setIsPlaying(false);
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const rawCost = type === 'like' ? (post.likePrice ?? 1) : (post.commentPrice ?? 2);
  const isFree = rawCost === 0;
  const cost = rawCost;
  const isResharedPost = post.isReshare;
  const splitCost = isResharedPost ? Math.ceil(cost / 2) : cost;
  const resharerSplit = isResharedPost ? Math.floor(cost / 2) : 0;
  const canAfford = isFree || currentCredits >= cost;

  const handleConfirm = async () => {
    if (!canAfford) {
      toast({
        title: "Insufficient credits",
        description: `You need ${cost} credits to ${type}. Current balance: ${currentCredits}`,
        variant: "destructive"
      });
      return;
    }

    if (type === 'comment' && !comment.trim() && !voiceNoteUrl) {
      toast({
        title: "Empty comment",
        description: "Please write a comment or record a voice note before posting",
        variant: "destructive"
      });
      return;
    }

    if (isRecording) {
      stopRecording();
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onConfirm(post.id, type === 'comment' ? {
        comment: comment.trim(),
        voiceNote: voiceNoteUrl ? { url: voiceNoteUrl, duration: voiceNoteDuration } : undefined
      } : undefined);
      
      toast({
        title: `${type === 'like' ? 'Liked!' : 'Comment posted!'}`,
        description: isFree
          ? `This post is free — no credits deducted.`
          : `${cost} credits deducted. Remaining balance: ${currentCredits - cost}`
      });
      
      setComment('');
      setVoiceNoteUrl(null);
      setVoiceNoteDuration(0);
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${type}. Please try again.`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === 'like' ? (
              <>
                <Heart size={20} className="text-red-500" />
                Like this post
              </>
            ) : (
              <>
                <MessageCircle size={20} className="text-blue-500" />
                Add a comment
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Cost Display */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Coins size={16} className="text-yellow-500" />
              <span className="text-sm font-medium">
                {isFree ? (
                  <>Cost: Free</>
                ) : (
                  <>
                    Cost: {cost} credit{cost === 1 ? '' : 's'}
                    {isResharedPost && <span className="text-xs block text-muted-foreground">
                      Split: {splitCost} to original creator + {resharerSplit} to resharer
                    </span>}
                  </>
                )}
              </span>
            </div>
            <Badge variant={canAfford ? "default" : "destructive"}>
              Balance: {currentCredits}
            </Badge>
          </div>

          {/* Split Info for reshared posts */}
          {isResharedPost && !isFree && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <Users2 size={16} className="text-blue-600" />
              <div className="text-sm">
                <div className="font-medium text-blue-700 dark:text-blue-300">Credit Split (50/50)</div>
                 <div className="text-xs text-blue-600 dark:text-blue-400">
                   {splitCost} credits to {post.originalPost?.author.name} (original creator)
                   <br />
                   {resharerSplit} credits to {post.resharedBy?.name} (resharer)
                 </div>
              </div>
            </div>
          )}

          {!canAfford && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive font-medium">
                Insufficient credits! You need {cost - currentCredits} more credits.
              </p>
            </div>
          )}

          {/* Comment Input for comment type */}
          {type === 'comment' && (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={profile.profilePicture} alt={profile.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {profile.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium mb-2">{profile.name}</p>
                  <Textarea
                    placeholder="Write your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[80px]"
                    disabled={!canAfford || isSubmitting || isRecording}
                  />

                  {/* Voice Note Controls */}
                  <div className="mt-2">
                    {!voiceNoteUrl && !isRecording && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={startRecording}
                        disabled={!canAfford || isSubmitting}
                        className="w-full"
                      >
                        <Mic size={14} className="mr-2" />
                        Record voice note
                      </Button>
                    )}

                    {isRecording && (
                      <div className="flex items-center gap-2 p-2 bg-destructive/10 border border-destructive/30 rounded-lg">
                        <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                        <span className="text-sm font-medium flex-1">Recording... {formatTime(recordingTime)}</span>
                        <Button type="button" variant="destructive" size="sm" onClick={stopRecording}>
                          <Square size={14} className="mr-1" />
                          Stop
                        </Button>
                      </div>
                    )}

                    {voiceNoteUrl && !isRecording && (
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                        <Button type="button" variant="ghost" size="sm" onClick={togglePlayback} className="px-2">
                          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                        </Button>
                        <div className="flex-1 flex items-center gap-2">
                          <Mic size={14} className="text-primary" />
                          <span className="text-xs font-medium">Voice note · {formatTime(voiceNoteDuration)}</span>
                        </div>
                        <Button type="button" variant="ghost" size="sm" onClick={deleteVoiceNote} className="px-2 text-destructive">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm} 
              className="flex-1"
              disabled={!canAfford || isSubmitting || isRecording || (type === 'comment' && !comment.trim() && !voiceNoteUrl)}
            >
              {isSubmitting ? (
                "Processing..."
              ) : (
                <>
                  {type === 'like' ? (
                    <>
                      <Heart size={16} className="mr-2" />
                      {isFree ? 'Like (Free)' : `Like (${cost} credit${cost === 1 ? '' : 's'})`}
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      {isFree ? 'Comment (Free)' : `Comment (${cost} credit${cost === 1 ? '' : 's'})`}
                    </>
                  )}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostEngagementModal;