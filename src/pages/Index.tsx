import { useState } from 'react';
import MyTimeApp from "@/components/MyTimeApp";
import SplashScreen from "@/components/SplashScreen";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <MyTimeApp />
    </>
  );
};

export default Index;
