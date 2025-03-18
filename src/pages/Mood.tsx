
import React from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Mood = () => {
  const { toast } = useToast();
  
  const handleTrackMood = () => {
    toast({
      title: "Mood Tracking",
      description: "This would open the mood tracking screen",
      duration: 1500,
    });
  };

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Mood Tracking</h1>
        <button 
          className="bg-gray-100 p-2 rounded-full"
          onClick={() => toast({
            title: "Calendar View",
            description: "This would show a calendar view of your moods",
            duration: 1500,
          })}
        >
          <Calendar size={20} className="text-gray-600" />
        </button>
      </div>
      
      <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-500">
        <TrendingUp size={48} className="mb-4 text-gray-300" />
        <h2 className="text-xl font-medium mb-2">Track Your Mood</h2>
        <p className="mb-4">Monitor how you're feeling throughout the days</p>
        <button 
          className="bg-icon-purple text-white py-2 px-6 rounded-full"
          onClick={handleTrackMood}
        >
          Track Today
        </button>
      </div>
    </div>
  );
};

export default Mood;
