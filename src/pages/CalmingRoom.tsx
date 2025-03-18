
import React from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const CalmingRoom = () => {
  return (
    <div className="page-container">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-semibold">Calming Room</h1>
      </div>
      
      <div className="bg-mood-peach rounded-lg h-48 mb-6 flex items-center justify-center">
        <div className="w-16 h-16 bg-blue-400 rounded-md flex items-center justify-center">
          <img 
            src="/public/lovable-uploads/1cf20a21-18e3-4b87-9278-30bd5ec13ff4.png" 
            alt="Mountains" 
            className="w-12 h-12" 
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <SoundItem title="Ocean Waves" duration="5:30" />
        <SoundItem title="Forest Sounds" duration="4:45" />
        <SoundItem title="Gentle Rain" duration="6:15" />
        <SoundItem title="Soft Piano" duration="3:50" />
      </div>
      
      <div className="fixed bottom-20 left-0 right-0 flex justify-center space-x-4 py-4">
        <button className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 20L9 12L19 4V20Z" fill="black"/>
          </svg>
        </button>
        <button className="w-16 h-16 bg-mood-peach rounded-full flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5V19L19 12L8 5Z" fill="white"/>
          </svg>
        </button>
        <button className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 4L15 12L5 20V4Z" fill="black"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

const SoundItem = ({ title, duration }: { title: string; duration: string }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
      <div>
        <h3 className="font-medium">{title}</h3>
        <span className="text-sm text-gray-500">{duration}</span>
      </div>
      <button className="w-10 h-10 bg-mood-purple bg-opacity-20 rounded-full flex items-center justify-center">
        <Play size={18} className="text-mood-purple ml-0.5" />
      </button>
    </div>
  );
};

export default CalmingRoom;
