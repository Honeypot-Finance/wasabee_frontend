import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnnouncementBarProps {
  slogans: React.ReactNode[];
  interval: number;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  slogans,
  interval,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slogans.length);
    }, interval);

    setTimer(timer);

    return () => clearInterval(timer);
  }, [slogans, interval]);

  const handleClose = () => {
    setIsVisible(false);
    if (timer) {
      clearInterval(timer);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="w-full bg-[#F7931A]/40 relative"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="flex relative items-center justify-center gap-x-4 px-4 py-2 sm:p-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-xs sm:text-base">
                {slogans[currentIndex]}
              </div>
              <button
                onClick={handleClose}
                className="absolute text-[#523914] hover:text-[#F7931A]/[37] text-2xl pt-1.5 right-2"
              >
                &times;
              </button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBar;
