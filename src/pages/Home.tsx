import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Moon, Cloud, BookOpen, MessageSquare, Wind, Heart, UserCircle, 
  Calendar, TreeDeciduous
} from 'lucide-react';
import MoodSelector from '@/components/MoodSelector';
import MoodSlider from '@/components/MoodSlider';
import WellnessCard from '@/components/WellnessCard';
import CalendarModal from '@/components/CalendarModal';
import { saveMoodEntry, getTodaysMoodEntry } from '@/utils/moodStorage';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const Home = () => {
  const [activeTab, setActiveTab] = useState<'self-guided' | 'professional'>('self-guided');
  const [showTraditionalMood, setShowTraditionalMood] = useState(false);
  const [todayMood, setTodayMood] = useState<{value: number, comment: string} | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
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
      <div className="bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/60 dark:to-amber-950 mb-6 -mx-4 px-4 py-5 rounded-b-[2rem] shadow-sm transition-colors duration-300">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-9 w-9 border-2 border-amber-200/50 dark:border-amber-700/50 shadow-sm">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback className="bg-gradient-to-br from-amber-400 to-amber-500 text-white">
                S
              </AvatarFallback>
            </Avatar>
            <span className="text-amber-800 dark:text-amber-100 font-medium">{format(new Date(), 'EEEE, MMM dd')}</span>
          </div>
          <div className="relative">
            <button 
              className="p-2 rounded-full bg-white/20 dark:bg-white/5 backdrop-blur-sm hover:bg-white/30 transition-colors"
              onClick={() => setShowCalendar(true)}
            >
              <Calendar className="text-amber-800 dark:text-amber-100" size={18} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-5 mt-4">
          <div className="relative">
            <div className="bg-gradient-to-br from-amber-200/70 to-amber-300/70 dark:from-amber-800/40 dark:to-amber-700/40 w-16 h-16 rounded-full flex items-center justify-center text-amber-800 dark:text-amber-100 text-xl font-bold backdrop-blur-sm shadow-inner">
              {todayMood ? Math.round(todayMood.value) : 88}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white dark:bg-amber-800 rounded-full p-1 shadow-sm">
              <span className="text-amber-500 dark:text-amber-300 text-sm">
                {todayMood && todayMood.value >= 80 ? "✨" : 
                 todayMood && todayMood.value >= 60 ? "🙂" : 
                 todayMood && todayMood.value >= 40 ? "😐" : "😔"}
              </span>
            </div>
          </div>
          <div>
            <h2 className="text-amber-800 dark:text-amber-100 font-medium text-lg mb-1">
              Welcome back, Sarah
            </h2>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-amber-700/10 text-amber-700 dark:text-amber-300 border-amber-600/20 text-xs px-2 py-0.5">
                Anxious
              </Badge>
              <Badge variant="outline" className="bg-amber-700/10 text-amber-700 dark:text-amber-300 border-amber-600/20 text-xs px-2 py-0.5">
                Plus Member
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">How are you feeling right now?</h3>
        {showTraditionalMood ? (
          <MoodSelector />
        ) : (
          <div className="mb-5">
            <MoodSlider 
              onSave={handleMoodSave} 
              initialValue={todayMood?.value || 75}
              initialComment={todayMood?.comment || ''}
            />
          </div>
        )}
      </div>
      
      <div className="flex mb-6 space-x-4">
        <button
          className={`flex-1 py-2.5 px-4 rounded-xl transition-all text-sm font-medium ${
            activeTab === 'self-guided'
              ? 'bg-black text-white dark:bg-gray-800'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300'
          }`}
          onClick={() => setActiveTab('self-guided')}
        >
          Self-Guided
        </button>
        <button
          className={`flex-1 py-2.5 px-4 rounded-xl transition-all text-sm font-medium ${
            activeTab === 'professional'
              ? 'bg-black text-white dark:bg-gray-800'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300'
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
      
      <CalendarModal isOpen={showCalendar} onClose={() => setShowCalendar(false)} />
    </div>
  );
};

export default Home;
