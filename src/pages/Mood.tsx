
import React, { useState, useEffect } from 'react';
import { ArrowLeft, UserCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MoodSlider from '@/components/MoodSlider';
import MoodCalendar from '@/components/MoodCalendar';
import { saveMoodEntry, getMoodEntries, getTodaysMoodEntry, MoodEntry } from '@/utils/moodStorage';
import { toast } from 'sonner';

const Mood = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [todayMood, setTodayMood] = useState<{value: number, comment: string} | null>(null);
  
  useEffect(() => {
    // Load all mood entries
    const entries = getMoodEntries();
    setMoodEntries(entries);
    
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
    const entry = saveMoodEntry(value, label, comment);
    toast.success("Mood saved successfully!");
    setTodayMood({ value, comment });
    
    // Update the entries list
    setMoodEntries([...moodEntries.filter(e => 
      new Date(e.date).toDateString() !== new Date().toDateString()
    ), entry]);
  };
  
  // Convert mood value (0-100) to MoodType for calendar display
  const valuesToMoodType = (value: number) => {
    if (value >= 75) return 'rad';
    if (value >= 50) return 'good';
    if (value >= 25) return 'meh';
    if (value > 0) return 'bad';
    return 'awful';
  };
  
  // Convert entries to calendar format
  const calendarData = moodEntries.map(entry => ({
    date: new Date(entry.date),
    mood: valuesToMoodType(entry.value)
  }));
  
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex items-center">
          <button
            className="mr-4 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold">Mood Tracker</h1>
            <p className="text-gray-600 dark:text-gray-400">How are you feeling today?</p>
          </div>
        </div>
        <Link to="/profile">
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <UserCircle className="text-gray-600 dark:text-gray-400" size={22} />
          </div>
        </Link>
      </div>
      
      <div className="mb-6">
        <MoodSlider 
          onSave={handleMoodSave} 
          initialValue={todayMood?.value || 75}
          initialComment={todayMood?.comment || ''}
        />
      </div>
      
      <MoodCalendar 
        moodData={calendarData}
        onSelectDate={setSelectedDate}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Mood;
