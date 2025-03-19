
import React, { useState } from 'react';
import { Calendar, TrendingUp, ArrowLeft, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import MoodSelector from '@/components/MoodSelector';

interface MoodEntry {
  date: string;
  time: string;
  mood: string;
  note?: string;
}

const Mood = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [note, setNote] = useState('');
  
  const saveMoodEntry = () => {
    if (currentMood) {
      const now = new Date();
      const newEntry: MoodEntry = {
        date: now.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        time: now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        mood: getMoodEmoji(currentMood),
        note: note.trim() || undefined
      };
      
      setMoodEntries([newEntry, ...moodEntries]);
      setCurrentMood(null);
      setNote('');
      
      toast({
        title: "Mood Tracked",
        description: "Your mood has been recorded for today",
        duration: 1500,
      });
    } else {
      toast({
        title: "Select a Mood",
        description: "Please select how you're feeling first",
        variant: "destructive",
        duration: 1500,
      });
    }
  };
  
  const getMoodEmoji = (mood: string): string => {
    switch (mood) {
      case 'veryhappy': return '😊';
      case 'happy': return '🙂';
      case 'neutral': return '😐';
      case 'sad': return '🙁';
      case 'angry': return '😠';
      default: return '😐';
    }
  };
  
  const handleMoodSelect = (mood: string) => {
    setCurrentMood(mood);
  };

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button 
            className="mr-2 bg-transparent"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={22} className="text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-2xl font-semibold">Mood Tracking</h1>
        </div>
        <button 
          className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full"
          onClick={() => toast({
            title: "Calendar View",
            description: "This would show a calendar view of your moods",
            duration: 1500,
          })}
        >
          <Calendar size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
        <h2 className="text-lg font-medium mb-4">How are you feeling?</h2>
        
        <MoodSelector 
          onMoodSelect={handleMoodSelect}
          initialMood={currentMood as any}
        />
        
        <textarea
          placeholder="Add a note about your mood (optional)"
          className="w-full p-3 mt-4 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
        />
        
        <button 
          className="w-full bg-icon-purple text-white py-3 rounded-lg mt-4 font-medium"
          onClick={saveMoodEntry}
        >
          Track My Mood
        </button>
      </div>
      
      {moodEntries.length > 0 ? (
        <div>
          <h3 className="text-lg font-medium mb-3">Mood History</h3>
          <div className="space-y-3 animate-fade-in">
            {moodEntries.map((entry, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm flex items-start">
                <div className="text-3xl mr-4">{entry.mood}</div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{entry.date}</span>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Clock size={12} className="mr-1" />
                      {entry.time}
                    </div>
                  </div>
                  {entry.note && (
                    <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">
                      {entry.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[30vh] text-center text-gray-500">
          <TrendingUp size={36} className="mb-3 text-gray-300 dark:text-gray-600" />
          <p className="text-sm">No mood data yet. Start tracking to see your patterns.</p>
        </div>
      )}
    </div>
  );
};

export default Mood;
