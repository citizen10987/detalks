
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Moon, Cloud, BookOpen, MessageSquare, Wind, Heart, UserCircle, 
  Calendar, TreeDeciduous
} from 'lucide-react';
import MoodSelector from '@/components/MoodSelector';
import WellnessCard from '@/components/WellnessCard';

const Home = () => {
  const [activeTab, setActiveTab] = useState<'self-guided' | 'professional'>('self-guided');
  const navigate = useNavigate();
  
  return (
    <div className="page-container">
      <div className="welcome-image-container mb-6 -mx-4 overflow-hidden rounded-b-3xl">
        <img 
          src="/lovable-uploads/dda6774c-f893-477e-960b-4a0435b7e4f6.png" 
          alt="Peaceful night view" 
          className="w-full h-auto object-cover animate-fade-in" 
        />
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
      
      <MoodSelector />
      
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
