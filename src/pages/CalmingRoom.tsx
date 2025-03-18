
import React, { useState } from 'react';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Link } from 'react-router-dom';

const CalmingRoom = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSound, setActiveSound] = useState<number | null>(null);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const selectSound = (index: number) => {
    setActiveSound(index);
    setIsPlaying(true);
  };
  
  return (
    <div className="page-container bg-gray-50">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-semibold">Calming Room</h1>
      </div>
      
      <div className="bg-gradient-to-br from-mood-peach to-mood-pink rounded-xl h-52 mb-6 flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/lovable-uploads/1cf20a21-18e3-4b87-9278-30bd5ec13ff4.png')", opacity: 0.3 }}></div>
        <div className="z-10 text-center">
          <h2 className="text-xl font-medium mb-2">Mountain Serenity</h2>
          <p className="text-gray-700">Find peace in nature's embrace</p>
        </div>
      </div>
      
      <div className="space-y-3 mb-8">
        <SoundItem 
          title="Ocean Waves" 
          duration="5:30" 
          isActive={activeSound === 0}
          onClick={() => selectSound(0)}
        />
        <SoundItem 
          title="Forest Sounds" 
          duration="4:45" 
          isActive={activeSound === 1}
          onClick={() => selectSound(1)}
        />
        <SoundItem 
          title="Gentle Rain" 
          duration="6:15" 
          isActive={activeSound === 2}
          onClick={() => selectSound(2)}
        />
        <SoundItem 
          title="Soft Piano" 
          duration="3:50" 
          isActive={activeSound === 3}
          onClick={() => selectSound(3)}
        />
      </div>
      
      <div className="fixed bottom-20 left-0 right-0 flex justify-center space-x-4 py-4 bg-gray-50">
        <button 
          className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"
          onClick={() => setActiveSound(prev => prev !== null && prev > 0 ? prev - 1 : 3)}
        >
          <SkipBack size={20} className="text-gray-700" />
        </button>
        <button 
          className="w-16 h-16 bg-mood-peach rounded-full flex items-center justify-center shadow-md"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause size={28} className="text-white" />
          ) : (
            <Play size={28} className="text-white ml-1" />
          )}
        </button>
        <button 
          className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"
          onClick={() => setActiveSound(prev => prev !== null ? (prev + 1) % 4 : 0)}
        >
          <SkipForward size={20} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};

interface SoundItemProps {
  title: string;
  duration: string;
  isActive: boolean;
  onClick: () => void;
}

const SoundItem = ({ title, duration, isActive, onClick }: SoundItemProps) => {
  return (
    <div 
      className={`p-4 rounded-xl flex justify-between items-center transition-all ${
        isActive ? 'bg-mood-purple shadow-md' : 'bg-white border border-gray-100'
      }`}
      onClick={onClick}
    >
      <div>
        <h3 className="font-medium">{title}</h3>
        <span className={`text-sm ${isActive ? 'text-gray-600' : 'text-gray-500'}`}>{duration}</span>
      </div>
      <button className={`w-10 h-10 rounded-full flex items-center justify-center ${
        isActive ? 'bg-icon-purple' : 'bg-mood-purple bg-opacity-20'
      }`}>
        <Play size={18} className={`ml-0.5 ${isActive ? 'text-white' : 'text-icon-purple'}`} />
      </button>
    </div>
  );
};

export default CalmingRoom;
