
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

export type MoodType = 'rad' | 'good' | 'meh' | 'bad' | 'awful';

interface MoodSelectorProps {
  onMoodSelect?: (mood: MoodType) => void;
  initialMood?: MoodType | null;
  onNoteChange?: (note: string) => void;
  initialNote?: string;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ 
  onMoodSelect,
  initialMood = null,
  onNoteChange,
  initialNote = '',
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(initialMood);
  const [note, setNote] = useState(initialNote);

  const moods: { type: MoodType; emoji: string; label: string; color: string }[] = [
    { type: 'rad', emoji: '😊', label: 'rad', color: 'bg-emerald-500' },
    { type: 'good', emoji: '🙂', label: 'good', color: 'bg-green-500' },
    { type: 'meh', emoji: '😐', label: 'meh', color: 'bg-yellow-400' },
    { type: 'bad', emoji: '🙁', label: 'bad', color: 'bg-red-400' },
    { type: 'awful', emoji: '😠', label: 'awful', color: 'bg-red-600' }
  ];

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    if (onMoodSelect) {
      onMoodSelect(mood);
    }
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    if (onNoteChange) {
      onNoteChange(e.target.value);
    }
  };

  return (
    <div className="bg-gray-900/80 p-5 rounded-xl backdrop-blur-sm border border-gray-800">
      <h2 className="text-lg font-medium mb-4 text-gray-200">How's it going?</h2>
      
      <div className="flex justify-between mb-6 animate-fade-in">
        {moods.map(mood => (
          <div key={mood.type} className="flex flex-col items-center gap-2">
            <button
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                mood.color,
                selectedMood === mood.type && "ring-2 ring-white ring-offset-2 ring-offset-gray-900",
                "transition-all duration-200"
              )}
              onClick={() => handleMoodSelect(mood.type)}
            >
              <span className="text-xl">{mood.emoji}</span>
            </button>
            <span className="text-xs text-gray-300">{mood.label}</span>
          </div>
        ))}
      </div>
      
      <Textarea
        placeholder="Write about your feelings..."
        className="bg-white/10 border-gray-700 text-gray-200 placeholder:text-gray-400 mt-4 rounded-full px-4"
        value={note}
        onChange={handleNoteChange}
      />
    </div>
  );
};

export default MoodSelector;
