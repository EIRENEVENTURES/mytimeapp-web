import { useState } from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [fadeOut, setFadeOut] = useState(false);

  const handleNext = () => {
    setFadeOut(true);
    setTimeout(onComplete, 500);
  };

  return (
    <div 
      className={`fixed inset-0 bg-primary flex flex-col items-center justify-center z-50 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center animate-scale-in">
        <div className="w-24 h-24 bg-primary-foreground rounded-full flex items-center justify-center mb-6 shadow-lg">
          <Clock className="w-14 h-14 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-primary-foreground mb-2">MyTime</h1>
        <p className="text-primary-foreground/80 text-sm">Connect. Thrive.</p>
      </div>
      <div className="absolute bottom-12">
        <Button 
          onClick={handleNext}
          variant="secondary"
          className="px-8 py-2 text-lg"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SplashScreen;
