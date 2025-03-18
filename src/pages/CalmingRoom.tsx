
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const CalmingRoom = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSound, setActiveSound] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };
  
  // Apply dark mode class if state is true
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const selectSound = (index: number) => {
    setActiveSound(index);
    setIsPlaying(true);
  };
  
  return (
    <div className={`page-container transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link to="/" className={`mr-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-icon-purple transition-colors duration-200`}>
            <ArrowLeft size={20} />
          </Link>
          <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Calming Room
          </h1>
        </div>
        
        <button 
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-200 text-gray-700'} transition-all duration-300 hover:scale-105`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      
      <div className="bg-gradient-to-br from-mood-peach to-mood-pink dark:from-indigo-900 dark:to-purple-800 rounded-xl h-60 mb-6 flex items-center justify-center overflow-hidden relative transition-all duration-500 shadow-md hover:shadow-lg transform hover:scale-[1.01] cursor-pointer">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700" 
          style={{ 
            backgroundImage: "url('/lovable-uploads/cb0fdce1-007a-4a67-b43a-a28837a8e90b.png')", 
            opacity: 0.85
          }}
        ></div>
        <div className="z-10 text-center px-4 py-3 backdrop-blur-sm bg-black/10 dark:bg-black/30 rounded-lg transition-all duration-300">
          <h2 className="text-xl font-medium mb-2 text-white drop-shadow-md">Twilight Serenity</h2>
          <p className="text-white/90 drop-shadow">Find peace in nature's evening embrace</p>
        </div>
      </div>
      
      <div className="space-y-3 mb-8">
        {['Ocean Waves', 'Forest Sounds', 'Gentle Rain', 'Soft Piano'].map((title, index) => (
          <SoundItem 
            key={index}
            title={title} 
            duration={['5:30', '4:45', '6:15', '3:50'][index]}
            isActive={activeSound === index}
            darkMode={darkMode}
            onClick={() => selectSound(index)}
          />
        ))}
      </div>
      
      <div className={`fixed bottom-20 left-0 right-0 flex justify-center space-x-4 py-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <button 
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 transform hover:scale-105 ${
            darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveSound(prev => prev !== null && prev > 0 ? prev - 1 : 3)}
        >
          <SkipBack size={20} className="transition-transform" />
        </button>
        <button 
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md transition-all duration-300 transform hover:scale-105 ${
            darkMode ? 'bg-purple-700 text-white' : 'bg-mood-peach text-white'
          }`}
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause size={28} className="transition-transform" />
          ) : (
            <Play size={28} className="ml-1 transition-transform" />
          )}
        </button>
        <button 
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 transform hover:scale-105 ${
            darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveSound(prev => prev !== null ? (prev + 1) % 4 : 0)}
        >
          <SkipForward size={20} className="transition-transform" />
        </button>
      </div>
    </div>
  );
};

interface SoundItemProps {
  title: string;
  duration: string;
  isActive: boolean;
  darkMode: boolean;
  onClick: () => void;
}

const SoundItem = ({ title, duration, isActive, darkMode, onClick }: SoundItemProps) => {
  return (
    <div 
      className={`p-4 rounded-xl flex justify-between items-center transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
        isActive 
          ? darkMode 
            ? 'bg-purple-800 shadow-md' 
            : 'bg-mood-purple shadow-md' 
          : darkMode 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-100'
      }`}
      onClick={onClick}
    >
      <div>
        <h3 className={`font-medium ${darkMode ? 'text-white' : ''}`}>{title}</h3>
        <span className={`text-sm ${
          isActive 
            ? darkMode 
              ? 'text-gray-300' 
              : 'text-gray-600' 
            : darkMode 
              ? 'text-gray-400' 
              : 'text-gray-500'
        }`}>{duration}</span>
      </div>
      <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
        isActive 
          ? darkMode 
            ? 'bg-indigo-600' 
            : 'bg-icon-purple' 
          : darkMode 
            ? 'bg-purple-700 bg-opacity-40' 
            : 'bg-mood-purple bg-opacity-20'
      }`}>
        <Play size={18} className={`ml-0.5 ${
          isActive 
            ? 'text-white' 
            : darkMode 
              ? 'text-indigo-300' 
              : 'text-icon-purple'
        }`} />
      </button>
    </div>
  );
};

export default CalmingRoom;
