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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const Home = () => {
  const [activeTab, setActiveTab] = useState<'self-guided' | 'professional'>('self-guided');
  const [showTraditionalMood, setShowTraditionalMood] = useState(false);
  const [todayMood, setTodayMood] = useState<{value: number, comment: string} | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if we have today's mood entry
    const entry = getTodaysMoodEntry();
    if (entry) {
      setTodayMood({
        value: entry.value,
        comment: entry.comment
      });
    }
  }, []);
  
  const handleMoodSave = (value: number, label: string, comment: string) => {
    saveMoodEntry(value, label, comment);
    toast.success("Mood saved successfully!");
    setTodayMood({ value, comment });
  };
  
  return (
    <div className="page-container">
      <div className="bg-amber-800/90 dark:bg-amber-900 mb-6 -mx-4 px-4 py-3 rounded-b-3xl">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-amber-200/30">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback className="bg-amber-700">S</AvatarFallback>
            </Avatar>
            <span className="text-amber-100">{format(new Date(), 'MMM dd, yyyy')}</span>
          </div>
          <div className="relative">
            <Bell className="text-amber-100" size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-3">
          <div className="bg-amber-700/80 w-16 h-16 rounded-full flex items-center justify-center text-amber-100 text-2xl font-bold">
            {todayMood ? Math.round(todayMood.value) : 88}
          </div>
          <div>
            <h2 className="text-amber-100 font-medium text-lg flex items-center gap-1">
              Hello, Sarah! <span className="text-yellow-400">✨</span>
            </h2>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline" className="bg-amber-700/30 text-amber-200 border-amber-600/50 text-xs px-1.5">
                ⊕ Anxious
              </Badge>
              <Badge variant="outline" className="bg-amber-700/30 text-amber-200 border-amber-600/50 text-xs px-1.5">
                ◇ plus Member
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      <div className="page-header">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, Sarah</h1>
          <p className="text-gray-600 dark:text-gray-400">How are you feeling today?</p>
        </div>
        <Link to="/profile">
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <UserCircle className="text-gray-500 dark:text-gray-400" size={20} />
          </div>
        </Link>
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
