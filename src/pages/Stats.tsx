
import React from 'react';
import { ArrowLeft, BarChart, Calendar, Award, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@/components/ProgressBar';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// Sample data for the charts
const weeklyData = [
  { day: 'Mon', habits: 3 },
  { day: 'Tue', habits: 5 },
  { day: 'Wed', habits: 4 },
  { day: 'Thu', habits: 6 },
  { day: 'Fri', habits: 2 },
  { day: 'Sat', habits: 4 },
  { day: 'Sun', habits: 5 },
];

const Stats = () => {
  const navigate = useNavigate();
  
  // Sample statistics
  const currentStreak = 6;
  const longestStreak = 12;
  const completionRate = 84;
  const treesEarned = 3;

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
          <h1 className="text-2xl font-semibold">Your Stats</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6 animate-fade-in">
        <div className="bg-gradient-to-br from-icon-purple to-icon-purple-light dark:from-icon-purple-light dark:to-icon-purple text-white dark:text-gray-900 p-4 rounded-xl shadow-sm transition-all duration-300 hover:translate-y-[-2px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Current Streak</span>
            <Calendar size={16} className="text-white/80 dark:text-gray-900/80" />
          </div>
          <p className="text-3xl font-bold">{currentStreak} days</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-400 dark:from-green-600 dark:to-green-500 text-white dark:text-gray-900 p-4 rounded-xl shadow-sm transition-all duration-300 hover:translate-y-[-2px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Longest Streak</span>
            <Award size={16} className="text-white/80 dark:text-gray-900/80" />
          </div>
          <p className="text-3xl font-bold">{longestStreak} days</p>
        </div>
        
        <div className="bg-gradient-to-br from-amber-400 to-amber-300 dark:from-amber-500 dark:to-amber-400 text-white dark:text-gray-900 p-4 rounded-xl shadow-sm transition-all duration-300 hover:translate-y-[-2px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Completion Rate</span>
            <TrendingUp size={16} className="text-white/80 dark:text-gray-900/80" />
          </div>
          <p className="text-3xl font-bold">{completionRate}%</p>
        </div>
        
        <div className="bg-gradient-to-br from-pink-400 to-pink-300 dark:from-pink-500 dark:to-pink-400 text-white dark:text-gray-900 p-4 rounded-xl shadow-sm transition-all duration-300 hover:translate-y-[-2px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Trees Earned</span>
            <span className="text-2xl">🌳</span>
          </div>
          <p className="text-3xl font-bold">{treesEarned}</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm mb-6 transition-all duration-300 hover:shadow-md animate-scale-in">
        <h2 className="text-lg font-medium mb-4 dark:text-white flex items-center">
          <BarChart size={18} className="mr-2 text-icon-purple dark:text-icon-purple-light" />
          Weekly Progress
        </h2>
        
        <div className="h-64">
          <ChartContainer 
            config={{
              habits: {
                label: "Habits Completed",
                color: "#8362F2",
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" className="dark:stroke-gray-700" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  stroke="#888"
                  className="dark:text-gray-400"
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tickCount={6}
                  stroke="#888"
                  className="dark:text-gray-400"
                />
                <Tooltip 
                  content={({active, payload}) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent 
                          active={active} 
                          payload={payload} 
                        />
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="habits" 
                  name="habits" 
                  fill="var(--color-habits, #8362F2)" 
                  radius={[4, 4, 0, 0]} 
                  className="animate-fade-in"
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-icon-purple/90 to-pink-400/90 dark:from-icon-purple/80 dark:to-pink-500/80 p-5 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
        <h2 className="text-lg font-medium text-white mb-4 flex items-center">
          <Award size={18} className="mr-2" />
          Habit Completion
        </h2>
        <div className="space-y-4">
          <ProgressBar label="Meditation" percentage={90} />
          <ProgressBar label="Reading" percentage={75} />
          <ProgressBar label="Exercise" percentage={60} />
          <ProgressBar label="Journaling" percentage={85} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
