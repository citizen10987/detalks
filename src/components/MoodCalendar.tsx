
import React, { useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { format, getDaysInMonth, getDay, startOfMonth } from 'date-fns';
import { cn } from '@/lib/utils';
import { MoodType } from './MoodSelector';

export interface DayMood {
  date: Date;
  mood: MoodType | null;
}

interface MoodCalendarProps {
  moodData: DayMood[];
  onSelectDate: (date: Date) => void;
  selectedDate?: Date;
}

const MoodCalendar: React.FC<MoodCalendarProps> = ({
  moodData,
  onSelectDate,
  selectedDate = new Date(),
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  const getMoodColor = (mood: MoodType | null): string => {
    switch (mood) {
      case 'rad': return 'bg-emerald-500';
      case 'good': return 'bg-green-500';
      case 'meh': return 'bg-yellow-400';
      case 'bad': return 'bg-red-400';
      case 'awful': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };
  
  const getMoodEmoji = (mood: MoodType | null): string => {
    switch (mood) {
      case 'rad': return '😊';
      case 'good': return '🙂';
      case 'meh': return '😐';
      case 'bad': return '🙁';
      case 'awful': return '😠';
      default: return '+';
    }
  };
  
  // Generate calendar grid
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const startDay = getDay(startOfMonth(currentMonth));
    const calendarDays = [];
    
    // Add previous month days
    for (let i = 0; i < startDay; i++) {
      calendarDays.push(null);
    }
    
    // Add current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dayMood = moodData.find(d => 
        d.date.getDate() === date.getDate() && 
        d.date.getMonth() === date.getMonth() && 
        d.date.getFullYear() === date.getFullYear()
      );
      
      calendarDays.push({
        date,
        mood: dayMood?.mood || null
      });
    }
    
    return (
      <div className="grid grid-cols-7 gap-1 mt-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
          <div key={idx} className="text-center text-xs text-gray-400 font-medium py-1">
            {day}
          </div>
        ))}
        
        {calendarDays.map((day, idx) => 
          day === null ? (
            <div key={idx} className="h-8"></div>
          ) : (
            <div
              key={idx}
              className={cn(
                "h-8 w-8 rounded-full text-center flex items-center justify-center text-xs cursor-pointer mx-auto",
                getMoodColor(day.mood),
                selectedDate && 
                  day.date.getDate() === selectedDate.getDate() &&
                  day.date.getMonth() === selectedDate.getMonth() &&
                  day.date.getFullYear() === selectedDate.getFullYear() &&
                  "ring-2 ring-white"
              )}
              onClick={() => onSelectDate(day.date)}
            >
              {day.mood ? getMoodEmoji(day.mood) : '+'}
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-900/80 rounded-xl p-4 backdrop-blur-sm border border-gray-800">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <h3 className="text-gray-200 font-medium">Calendar</h3>
        </div>
        <div className="text-sm text-gray-400">
          {format(currentMonth, 'MMMM yyyy')}
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-2">Tap on the day to see more</p>
      
      {renderCalendar()}
      
      <div className="flex justify-center mt-4">
        <button className="flex items-center text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded-full">
          <span>See full</span>
          <ArrowRight className="ml-1 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MoodCalendar;
