
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Moon, Cloud, BookOpen, MessageSquare, Wind, Heart, UserCircle, 
  Calendar, TreeDeciduous, Activity, Flame, Bed, Weight
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
        <>
          <div className="grid grid-cols-2 gap-3 mb-4 animate-fade-in">
            <WellnessCard
              icon={Heart}
              title="Heart Rate"
              backgroundColor="bg-soft-green dark:bg-green-900/40"
              to="/stats"
              value="72"
              unit="bpm"
            />
            <WellnessCard
              icon={Flame}
              title="Calories"
              backgroundColor="bg-soft-yellow dark:bg-yellow-900/40"
              to="/stats"
              value="200"
              unit="kcal"
            />
            <WellnessCard
              icon={Bed}
              title="Sleep"
              backgroundColor="bg-soft-pink dark:bg-pink-900/40"
              to="/stats"
              value="8h 20m"
              unit="Last night"
            />
            <WellnessCard
              icon={Weight}
              title="Weight"
              backgroundColor="bg-soft-blue dark:bg-blue-900/40"
              to="/stats"
              value="80"
              unit="kg"
            />
          </div>
          
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 my-3">Wellness Activities</h3>
          
          <div className="space-y-3 animate-fade-in">
            <WellnessCard
              icon={Moon}
              title="Track Your Mood"
              backgroundColor="bg-mood-purple"
              badge="Daily"
              to="/mood"
            />
            <WellnessCard
              icon={TreeDeciduous}
              title="Habit Tracker"
              backgroundColor="bg-mood-green"
              badge="Plant Trees"
              to="/habits"
            />
            <WellnessCard
              icon={Cloud}
              title="Calming Room"
              backgroundColor="bg-mood-peach"
              to="/calming-room"
            />
            <WellnessCard
              icon={BookOpen}
              title="Journal Entry"
              backgroundColor="bg-mood-green"
              badge="New"
              to="/journal"
            />
            <WellnessCard
              icon={MessageSquare}
              title="Talk to AI"
              backgroundColor="bg-mood-pink"
              to="/ai-chat"
            />
            <WellnessCard
              icon={Wind}
              title="Breathing Exercise"
              backgroundColor="bg-mood-peach"
              to="/breathing"
            />
          </div>
        </>
      ) : (
        <div className="space-y-3 animate-fade-in">
          <WellnessCard
            icon={UserCircle}
            title="Therapist Directory"
            backgroundColor="bg-mood-purple"
            to="/therapists"
          />
          <WellnessCard
            icon={Calendar}
            title="Book Appointment"
            backgroundColor="bg-mood-peach"
            to="/appointment"
          />
          <WellnessCard
            icon={MessageSquare}
            title="Secure Chat"
            backgroundColor="bg-mood-green"
            badge="Private"
            to="/secure-chat"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
