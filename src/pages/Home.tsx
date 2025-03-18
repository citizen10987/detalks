
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Moon, Cloud, BookOpen, MessageSquare, Wind, Heart, UserCircle, Calendar 
} from 'lucide-react';
import MoodSelector from '@/components/MoodSelector';
import WellnessCard from '@/components/WellnessCard';

const Home = () => {
  const [activeTab, setActiveTab] = useState<'self-guided' | 'professional'>('self-guided');
  
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, Sarah</h1>
          <p className="text-gray-600">How are you feeling today?</p>
        </div>
        <Link to="/profile">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <UserCircle className="text-gray-500" size={20} />
          </div>
        </Link>
      </div>
      
      <MoodSelector />
      
      <div className="flex mb-6 space-x-4">
        <button
          className={`flex-1 py-3 px-4 rounded-xl transition-all ${
            activeTab === 'self-guided'
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-800'
          }`}
          onClick={() => setActiveTab('self-guided')}
        >
          Self-Guided
        </button>
        <button
          className={`flex-1 py-3 px-4 rounded-xl transition-all ${
            activeTab === 'professional'
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-800'
          }`}
          onClick={() => setActiveTab('professional')}
        >
          Professional
        </button>
      </div>
      
      {activeTab === 'self-guided' ? (
        <div className="space-y-3 animate-fade-in">
          <WellnessCard
            icon={Moon}
            title="Track Your Mood"
            backgroundColor="bg-mood-purple"
            badge="Daily"
          />
          <WellnessCard
            icon={Cloud}
            title="Calming Room"
            backgroundColor="bg-mood-peach"
          />
          <WellnessCard
            icon={BookOpen}
            title="Journal Entry"
            backgroundColor="bg-mood-green"
            badge="New"
          />
          <WellnessCard
            icon={MessageSquare}
            title="Talk to AI"
            backgroundColor="bg-mood-pink"
          />
          <WellnessCard
            icon={Wind}
            title="Breathing Exercise"
            backgroundColor="bg-mood-peach"
          />
          <WellnessCard
            icon={Heart}
            title="Habit Tracker"
            backgroundColor="bg-white"
            badge="Plant Trees"
          />
        </div>
      ) : (
        <div className="space-y-3 animate-fade-in">
          <WellnessCard
            icon={UserCircle}
            title="Therapist Directory"
            backgroundColor="bg-mood-purple"
          />
          <WellnessCard
            icon={Calendar}
            title="Book Appointment"
            backgroundColor="bg-mood-peach"
          />
          <WellnessCard
            icon={MessageSquare}
            title="Secure Chat"
            backgroundColor="bg-mood-green"
            badge="Private"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
