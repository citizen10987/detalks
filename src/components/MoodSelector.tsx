
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type Mood = 'veryhappy' | 'happy' | 'neutral' | 'sad' | 'angry';

interface MoodSelectorProps {
  onMoodSelect?: (mood: Mood) => void;
  initialMood?: Mood | null;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ 
  onMoodSelect,
  initialMood = null
}) => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(initialMood);

  const moods: { type: Mood; emoji: string }[] = [
    { type: 'veryhappy', emoji: '😊' },
    { type: 'happy', emoji: '🙂' },
    { type: 'neutral', emoji: '😐' },
    { type: 'sad', emoji: '🙁' },
    { type: 'angry', emoji: '😠' }
  ];

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    if (onMoodSelect) {
      onMoodSelect(mood);
    }
  };

  return (
    <div className="flex justify-between mb-6 animate-fade-in">
      {moods.map(mood => (
        <button
          key={mood.type}
          className={cn(
            "mood-emoji transition-all duration-200",
            selectedMood === mood.type && "selected"
          )}
          onClick={() => handleMoodSelect(mood.type)}
        >
          <span className="text-2xl">{mood.emoji}</span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
