import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LoadingAnimation({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // After animation completes, hide the loading screen and notify parent
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500); // Allow fade out animation to complete
    }, 3500); // Total animation duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* LOL Logo Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 1.5 }}
          animate={{ 
            opacity: [0, 1, 1, 0.8, 0],
            scale: [1.5, 1, 1, 0.9, 2]
          }}
          transition={{ 
            duration: 3,
            times: [0, 0.2, 0.6, 0.8, 1],
            ease: "easeInOut"
          }}
          className="text-center"
        >
          <div className="text-6xl font-bold text-red-600 tracking-widest">
            LOL
          </div>
          <div className="text-sm text-gray-400 mt-1">
            GROUPS
          </div>
        </motion.div>
        
        {/* Sound wave effect */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ 
            duration: 3,
            times: [0, 0.5, 1],
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-red-600"
                initial={{ width: 50, height: 50, opacity: 0 }}
                animate={{ 
                  width: [50, 200],
                  height: [50, 200],
                  opacity: [0, 0.5, 0],
                  borderWidth: [5, 1]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.2,
                  repeat: 1,
                  repeatType: "loop"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}