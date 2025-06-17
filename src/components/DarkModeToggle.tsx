import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle dark mode"
    >
      <motion.div
        className="relative w-6 h-6"
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{ 
            opacity: isDarkMode ? 0 : 1,
            scale: isDarkMode ? 0.5 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          <Sun className="w-5 h-5 text-yellow-500" />
        </motion.div>
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{ 
            opacity: isDarkMode ? 1 : 0,
            scale: isDarkMode ? 1 : 0.5
          }}
          transition={{ duration: 0.2 }}
        >
          <Moon className="w-5 h-5 text-blue-400" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;