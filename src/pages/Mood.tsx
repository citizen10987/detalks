
import React, { useState, useEffect } from 'react';
import { Calendar, ArrowLeft, Calendar as CalendarIcon, TrendingUp, Edit2 } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import MoodSelector, { MoodType } from '@/components/MoodSelector';
import MoodCalendar, { DayMood } from '@/components/MoodCalendar';
import MoodAnalytics, { DailyMoodData } from '@/components/MoodAnalytics';
import MoodDetail from '@/components/MoodDetail';

interface MoodEntry {
  id: string;
  date: Date;
  mood: MoodType;
  note: string;
}

const Mood: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState('');
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  // Generate sample data for demonstration
  useEffect(() => {
    const sampleMoods: MoodType[] = ['rad', 'good', 'meh', 'bad', 'awful'];
    const sampleData: MoodEntry[] = [];
    
    // Generate entries for the past 10 days
    for (let i = 9; i >= 0; i--) {
      if (Math.random() > 0.3) { // 70% chance to have an entry
        const date = subDays(new Date(), i);
        sampleData.push({
          id: `entry-${i}`,
          date,
          mood: sampleMoods[Math.floor(Math.random() * sampleMoods.length)],
          note: i % 3 === 0 ? "This is a sample mood note for the day." : ""
        });
      }
    }
    
    setMoodEntries(sampleData);
  }, []);
  
  const saveMoodEntry = () => {
    if (currentMood) {
      const now = new Date();
      const newEntry: MoodEntry = {
        id: `entry-${Date.now()}`,
        date: now,
        mood: currentMood,
        note: note.trim()
      };
      
      setMoodEntries([newEntry, ...moodEntries]);
      setCurrentMood(null);
      setNote('');
      
      toast({
        title: "Mood Tracked",
        description: "Your mood has been recorded",
        duration: 1500,
      });
    } else {
      toast({
        title: "Select a Mood",
        description: "Please select how you're feeling first",
        variant: "destructive",
        duration: 1500,
      });
    }
  };
  
  const handleSelectDate = (date: Date) => {
    const entry = moodEntries.find(entry => 
      entry.date.getDate() === date.getDate() &&
      entry.date.getMonth() === date.getMonth() &&
      entry.date.getFullYear() === date.getFullYear()
    );
    
    if (entry) {
      setSelectedEntry(entry);
      setShowDetail(true);
    } else {
      setSelectedDate(date);
      // Could show a "no entry" message or create flow
    }
  };
  
  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedEntry(null);
  };
  
  const handleEditEntry = () => {
    if (selectedEntry) {
      setCurrentMood(selectedEntry.mood);
      setNote(selectedEntry.note);
      setEditMode(true);
      setShowDetail(false);
    }
  };
  
  const updateEntry = () => {
    if (currentMood && selectedEntry && editMode) {
      const updatedEntries = moodEntries.map(entry => 
        entry.id === selectedEntry.id 
          ? { ...entry, mood: currentMood, note: note }
          : entry
      );
      
      setMoodEntries(updatedEntries);
      setCurrentMood(null);
      setNote('');
      setEditMode(false);
      
      toast({
        title: "Mood Updated",
        description: "Your mood entry has been updated",
        duration: 1500,
      });
    }
  };
  
  // Format mood data for calendar
  const calendarMoodData: DayMood[] = moodEntries.map(entry => ({
    date: entry.date,
    mood: entry.mood
  }));
  
  // Generate analytics data
  const getDailyMoodsData = (): DailyMoodData[] => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
    return days.map((day, index) => {
      const date = subDays(new Date(), 4 - index);
      const entry = moodEntries.find(entry => 
        entry.date.getDate() === date.getDate() &&
        entry.date.getMonth() === date.getMonth()
      );
      
      const moodToValue = (mood: MoodType): number => {
        switch(mood) {
          case 'rad': return 5;
          case 'good': return 4;
          case 'meh': return 3;
          case 'bad': return 2;
          case 'awful': return 1;
        }
      };
      
      return {
        day,
        shortDay: day.substring(0, 1),
        mood: entry?.mood || 'meh',
        value: entry ? moodToValue(entry.mood) : 3
      };
    });
  };
  
  // Calculate mood stability (simplified algorithm)
  const calculateStabilityScore = (): number => {
    if (moodEntries.length < 3) return 75; // Default
    
    // More consistent moods = higher stability score
    const moodValues = moodEntries.slice(0, 7).map(entry => {
      switch(entry.mood) {
        case 'rad': return 5;
        case 'good': return 4;
        case 'meh': return 3;
        case 'bad': return 2;
        case 'awful': return 1;
      }
    });
    
    // Calculate variance - lower variance = higher stability
    const avg = moodValues.reduce((sum, val) => sum + val, 0) / moodValues.length;
    const variance = moodValues.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / moodValues.length;
    
    // Convert to a 0-100 score (lower variance = higher score)
    const score = 100 - (variance * 10);
    return Math.min(Math.max(Math.round(score), 0), 100); // Clamp between 0-100
  };

  return (
    <div className="page-container bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button 
            className="mr-2 bg-transparent"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={22} className="text-gray-400" />
          </button>
          <h1 className="text-2xl font-semibold">Mood Tracker</h1>
        </div>
        <button 
          className="bg-gray-800 p-2 rounded-full"
          onClick={() => toast({
            title: "Calendar View",
            description: "Expanded calendar view would open here",
            duration: 1500,
          })}
        >
          <CalendarIcon size={20} className="text-gray-400" />
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Mood Entry Section */}
        <MoodSelector 
          onMoodSelect={setCurrentMood}
          initialMood={currentMood}
          onNoteChange={setNote}
          initialNote={note}
        />
        
        {/* Action Button */}
        <button 
          className="w-full bg-icon-purple text-white py-3 rounded-lg font-medium"
          onClick={editMode ? updateEntry : saveMoodEntry}
        >
          {editMode ? 'Update Mood Entry' : 'Track My Mood'}
        </button>
        
        {/* Calendar Section */}
        <MoodCalendar 
          moodData={calendarMoodData}
          onSelectDate={handleSelectDate}
          selectedDate={selectedDate || undefined}
        />
        
        {/* Analytics Section */}
        <MoodAnalytics 
          dailyMoods={getDailyMoodsData()}
          stabilityScore={calculateStabilityScore()}
        />
      </div>
      
      {/* Mood Entry Detail */}
      {showDetail && selectedEntry && (
        <MoodDetail 
          mood={selectedEntry.mood}
          date={selectedEntry.date}
          note={selectedEntry.note}
          onEdit={handleEditEntry}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default Mood;
