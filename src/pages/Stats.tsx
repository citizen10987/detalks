
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
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-mood-purple text-white p-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Current Streak</span>
            <Calendar size={16} />
          </div>
          <p className="text-3xl font-bold">{currentStreak} days</p>
        </div>
        
        <div className="bg-mood-green text-white p-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Longest Streak</span>
            <Award size={16} />
          </div>
          <p className="text-3xl font-bold">{longestStreak} days</p>
        </div>
        
        <div className="bg-mood-peach text-white p-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Completion Rate</span>
            <TrendingUp size={16} />
          </div>
          <p className="text-3xl font-bold">{completionRate}%</p>
        </div>
        
        <div className="bg-mood-pink text-white p-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Trees Earned</span>
            <span className="text-2xl">🌳</span>
          </div>
          <p className="text-3xl font-bold">{treesEarned}</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-6">
        <h2 className="text-lg font-medium mb-4">Weekly Progress</h2>
        
        <div className="h-64">
          <ChartContainer 
            config={{
              habits: {
                label: "Habits Completed",
                color: "#9575cd",
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tickCount={6}
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
                  fill="var(--color-habits, #9575cd)" 
                  radius={[4, 4, 0, 0]} 
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-mood-purple to-mood-pink p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-medium text-white mb-4">Habit Completion</h2>
        <ProgressBar label="Meditation" percentage={90} />
        <ProgressBar label="Reading" percentage={75} />
        <ProgressBar label="Exercise" percentage={60} />
        <ProgressBar label="Journaling" percentage={85} />
      </div>
    </div>
  );
};

export default Stats;
