
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Moon, Cloud, BookOpen, MessageSquare, Wind, Heart, UserCircle, 
  Calendar, TreeDeciduous, Bell
} from 'lucide-react';
import MoodSelector from '@/components/MoodSelector';
import MoodSlider from '@/components/MoodSlider';
import WellnessCard from '@/components/WellnessCard';
import { saveMoodEntry, getTodaysMoodEntry } from '@/utils/moodStorage';
import { toast } from 'sonner';
import { EmotionSelector } from '@/components/EmotionSelector';

const Home = () => {
  const [activeTab, setActiveTab] = useState<'self-guided' | 'professional'>('self-guided');
  const [showTraditionalMood, setShowTraditionalMood] = useState(false);
  const [todayMood, setTodayMood] = useState<{value: number, comment: string, emotions?: string[]} | null>(null);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if we have today's mood entry
    const entry = getTodaysMoodEntry();
    if (entry) {
      setTodayMood({
        value: entry.value,
        comment: entry.comment,
        emotions: entry.emotions
      });
      
      if (entry.emotions) {
        setSelectedEmotions(entry.emotions);
      }
    }
  }, []);
  
  const handleMoodSave = (value: number, label: string, comment: string) => {
    saveMoodEntry(value, label, comment, selectedEmotions);
    toast.success("Mood saved successfully!");
    setTodayMood({ value, comment, emotions: selectedEmotions });
  };
  
  return (
    <div className="page-container">
      <div className="welcome-image-container mb-6 -mx-4 overflow-hidden rounded-b-3xl">
        <img 
          src="/lovable-uploads/dda6774c-f893-477e-960b-4a0435b7e4f6.png" 
          alt="Peaceful night view" 
          className="w-full h-auto object-cover animate-fade-in" 
        />
      </div>
      
      <div className="greeting-container bg-gray-400/20 dark:bg-gray-700/30 backdrop-blur-sm rounded-xl p-5 mb-6 relative overflow-hidden">
        <div className="absolute top-3 right-3">
          <Bell size={20} className="text-white/70" />
        </div>
        <div className="flex items-center space-x-4 mb-2">
          <div className="w-12 h-12 rounded-full bg-soft-blue/70 flex items-center justify-center">
            <UserCircle className="text-white" size={30} />
          </div>
          <div className="text-white/90">
            <p className="text-sm font-medium">Hello, Sarah</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mt-3">how are you today?</h2>
      </div>
      
      {showTraditionalMood ? (
        <MoodSelector />
      ) : (
        <div className="mb-6">
          <MoodSlider 
            onSave={handleMoodSave} 
            initialValue={todayMood?.value || 75}
            initialComment={todayMood?.comment || ''}
          />
          
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select emotions you're feeling:
            </p>
            <EmotionSelector 
              selectedEmotions={selectedEmotions} 
              onChange={setSelectedEmotions} 
            />
          </div>
        </div>
      )}
      
      <div className="flex mb-6 space-x-4">
        <button
          className={`flex-1 py-3 px-4 rounded-xl transition-all ${
            activeTab === 'self-guided'
              ? 'bg-black text-white dark:bg-gray-700'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
          }`}
          onClick={() => setActiveTab('self-guided')}
        >
          Self-Guided
        </button>
        <button
          className={`flex-1 py-3 px-4 rounded-xl transition-all ${
            activeTab === 'professional'
              ? 'bg-black text-white dark:bg-gray-700'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
          }`}
          onClick={() => setActiveTab('professional')}
        >
          Professional
        </button>
      </div>
      
      {activeTab === 'self-guided' ? (
        <div className="grid grid-cols-2 gap-3 animate-fade-in">
          <WellnessCard
            icon={Moon}
            title="Track Mood"
            backgroundColor="bg-soft-purple dark:bg-indigo-900/60"
            to="/mood"
          />
          <WellnessCard
            icon={TreeDeciduous}
            title="Habits"
            backgroundColor="bg-soft-green dark:bg-green-900/60"
            to="/habits"
          />
          <WellnessCard
            icon={Cloud}
            title="Calming Room"
            backgroundColor="bg-soft-peach dark:bg-amber-900/60"
            to="/calming-room"
          />
          <WellnessCard
            icon={BookOpen}
            title="Journal"
            backgroundColor="bg-soft-blue dark:bg-blue-900/60"
            to="/journal"
          />
          <WellnessCard
            icon={MessageSquare}
            title="AI Chat"
            backgroundColor="bg-soft-pink dark:bg-pink-900/60"
            to="/ai-chat"
          />
          <WellnessCard
            icon={Wind}
            title="Breathing"
            backgroundColor="bg-soft-yellow dark:bg-yellow-900/60"
            to="/breathing"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 animate-fade-in">
          <WellnessCard
            icon={UserCircle}
            title="Therapists"
            backgroundColor="bg-soft-purple dark:bg-indigo-900/60"
            to="/therapists"
          />
          <WellnessCard
            icon={Calendar}
            title="Appointments"
            backgroundColor="bg-soft-peach dark:bg-amber-900/60"
            to="/appointment"
          />
          <WellnessCard
            icon={MessageSquare}
            title="Secure Chat"
            backgroundColor="bg-soft-green dark:bg-green-900/60"
            to="/secure-chat"
          />
          <WellnessCard
            icon={BookOpen}
            title="Resources"
            backgroundColor="bg-soft-blue dark:bg-blue-900/60"
            to="/resources"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
