
import React, { useState } from 'react';
import { ArrowLeft, Trophy, Medal, Star, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LeaderboardEntry {
  id: number;
  name: string;
  streak: number;
  habitCount: number;
  trees: number;
  avatar?: string;
  isCurrentUser?: boolean;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'streak' | 'trees' | 'habits'>('streak');
  
  // Sample leaderboard data
  const leaderboardData: LeaderboardEntry[] = [
    { id: 1, name: 'Emma Johnson', streak: 32, habitCount: 18, trees: 9, avatar: '👩‍💼' },
    { id: 2, name: 'Michael Chen', streak: 28, habitCount: 21, trees: 8, avatar: '👨‍💻' },
    { id: 3, name: 'Sarah', streak: 26, habitCount: 19, trees: 7, isCurrentUser: true, avatar: '👩‍🎨' },
    { id: 4, name: 'David Kim', streak: 24, habitCount: 15, trees: 6, avatar: '🧑‍🏫' },
    { id: 5, name: 'Jessica Patel', streak: 22, habitCount: 17, trees: 7, avatar: '👩‍⚕️' },
    { id: 6, name: 'Marcus Wilson', streak: 20, habitCount: 14, trees: 5, avatar: '👨‍🍳' },
    { id: 7, name: 'Olivia Garcia', streak: 18, habitCount: 16, trees: 5, avatar: '👩‍🔬' },
    { id: 8, name: 'James Taylor', streak: 16, habitCount: 12, trees: 4, avatar: '👨‍🚀' },
    { id: 9, name: 'Sophia Rodriguez', streak: 14, habitCount: 13, trees: 4, avatar: '👩‍🎤' },
    { id: 10, name: 'Ethan Brown', streak: 12, habitCount: 10, trees: 3, avatar: '🧑‍🎨' },
  ];
  
  // Filter and sort data based on selected filter
  const getSortedData = () => {
    return [...leaderboardData].sort((a, b) => {
      if (filter === 'streak') return b.streak - a.streak;
      if (filter === 'trees') return b.trees - a.trees;
      return b.habitCount - a.habitCount;
    });
  };
  
  const sortedData = getSortedData();
  
  // Get correct label based on filter
  const getFilterLabel = () => {
    if (filter === 'streak') return 'Streak';
    if (filter === 'trees') return 'Trees';
    return 'Habits';
  };

  return (
    <div className="page-container pb-20">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button 
            className="mr-2 bg-transparent"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={22} className="text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-2xl font-semibold">Leaderboard</h1>
        </div>
        <div className="relative">
          <button 
            className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full flex items-center space-x-1"
            onClick={() => {}}
          >
            <Filter size={18} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
      
      <div className="flex space-x-2 mb-6">
        <button
          className={`flex-1 py-2 px-4 rounded-xl transition-all ${
            filter === 'streak'
              ? 'bg-black text-white dark:bg-gray-700'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
          }`}
          onClick={() => setFilter('streak')}
        >
          Streaks
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-xl transition-all ${
            filter === 'trees'
              ? 'bg-black text-white dark:bg-gray-700'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
          }`}
          onClick={() => setFilter('trees')}
        >
          Trees
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-xl transition-all ${
            filter === 'habits'
              ? 'bg-black text-white dark:bg-gray-700'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
          }`}
          onClick={() => setFilter('habits')}
        >
          Habits
        </button>
      </div>
      
      {/* Top 3 Winners Podium */}
      <div className="flex justify-around items-end mb-8 mt-4">
        {sortedData.slice(0, 3).map((user, index) => {
          // Determine which position they are in
          const position = index + 1;
          
          // Style based on position
          const podiumHeight = position === 1 ? 'h-32' : position === 2 ? 'h-24' : 'h-16';
          const avatarSize = position === 1 ? 'text-4xl' : 'text-3xl';
          const medalIcon = position === 1 ? 
            <Trophy size={24} className="text-yellow-500" /> : 
            position === 2 ? 
              <Medal size={20} className="text-gray-400" /> : 
              <Medal size={18} className="text-amber-700" />;
          
          return (
            <div key={user.id} className="flex flex-col items-center">
              <div className={`${avatarSize} mb-2 relative`}>
                <span>{user.avatar}</span>
                <div className="absolute -top-2 -right-2">
                  {medalIcon}
                </div>
              </div>
              <p className={`text-sm font-medium ${user.isCurrentUser ? 'text-icon-purple font-bold' : ''}`}>
                {user.name}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {filter === 'streak' ? `${user.streak} days` : 
                 filter === 'trees' ? `${user.trees} 🌳` : 
                 `${user.habitCount} habits`}
              </p>
              <div className={`${podiumHeight} w-20 bg-gradient-to-t from-mood-purple to-mood-pink rounded-t-lg mt-2 flex items-center justify-center text-white font-bold text-xl`}>
                {position}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Rest of Leaderboard */}
      <div className="space-y-3 animate-fade-in">
        {sortedData.slice(3).map((user, index) => (
          <div 
            key={user.id} 
            className={`bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm flex items-center ${
              user.isCurrentUser ? 'border-2 border-icon-purple' : ''
            }`}
          >
            <div className="w-8 text-center font-medium text-gray-500">
              {index + 4}
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl mr-3">
              {user.avatar}
            </div>
            <div className="flex-1">
              <p className={`font-medium ${user.isCurrentUser ? 'text-icon-purple' : ''}`}>
                {user.name} {user.isCurrentUser && '(You)'}
              </p>
            </div>
            <div className="flex items-center gap-1 font-medium">
              {filter === 'streak' ? (
                <>
                  <Calendar size={16} className="text-icon-purple" />
                  <span>{user.streak} days</span>
                </>
              ) : filter === 'trees' ? (
                <>
                  <span className="mr-1">🌳</span>
                  <span>{user.trees}</span>
                </>
              ) : (
                <>
                  <Star size={16} className="text-icon-purple" />
                  <span>{user.habitCount}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
