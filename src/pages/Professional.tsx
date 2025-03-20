
import React from 'react';
import { ArrowLeft, UserCircle, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import MoodSelector from '@/components/MoodSelector';
import WellnessCard from '@/components/WellnessCard';

const Professional = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">Professional Support</h1>
            <p className="text-gray-600 dark:text-gray-400">Connect with licensed experts</p>
          </div>
        </div>
        <Link to="/profile">
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <UserCircle className="text-gray-500 dark:text-gray-400" size={20} />
          </div>
        </Link>
      </div>
      
      <MoodSelector />
      
      <div className="flex mb-6 space-x-4">
        <Link
          to="/"
          className="flex-1 py-3 px-4 rounded-xl transition-all bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 text-center"
        >
          Self-Guided
        </Link>
        <button
          className="flex-1 py-3 px-4 rounded-xl transition-all bg-black dark:bg-gray-700 text-white"
        >
          Professional
        </button>
      </div>
      
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
    </div>
  );
};

export default Professional;
