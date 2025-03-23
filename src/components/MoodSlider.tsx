
import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle } from 'lucide-react';
import { MoodType } from './MoodSelector';

interface MoodSliderProps {
  onSave?: (mood: number, label: string, comment: string) => void;
  initialValue?: number;
  initialComment?: string;
}

// Mood labels mapped to slider values
const moodLabels = [
  { value: 0, label: "Sad", color: "bg-blue-100 dark:bg-blue-900/40" },
  { value: 25, label: "Meh", color: "bg-indigo-100 dark:bg-indigo-900/40" },
  { value: 50, label: "Okay", color: "bg-purple-100 dark:bg-purple-900/40" },
  { value: 75, label: "Good", color: "bg-pink-100 dark:bg-pink-900/40" },
  { value: 100, label: "Great", color: "bg-rose-100 dark:bg-rose-900/40" }
];

const MoodSlider: React.FC<MoodSliderProps> = ({ 
  onSave, 
  initialValue = 75, 
  initialComment = '' 
}) => {
  const [sliderValue, setSliderValue] = useState(initialValue);
  const [comment, setComment] = useState(initialComment);
  const [showCommentInput, setShowCommentInput] = useState(false);
  
  // Find the closest mood label based on slider value
  const getCurrentMood = () => {
    return moodLabels.reduce((prev, curr) => {
      return Math.abs(curr.value - sliderValue) < Math.abs(prev.value - sliderValue) ? curr : prev;
    });
  };
  
  const currentMood = getCurrentMood();
  
  const handleSave = () => {
    if (onSave) {
      onSave(sliderValue, currentMood.label, comment);
    }
  };

  return (
    <div className={`p-4 rounded-2xl ${currentMood.color} transition-colors duration-300 shadow-sm`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-center text-lg font-medium">{currentMood.label}</h2>
        <div className="text-2xl">
          {sliderValue <= 25 ? "😔" : 
           sliderValue <= 50 ? "😐" : 
           sliderValue <= 75 ? "🙂" : "😊"}
        </div>
      </div>
      
      {/* Smaller face that changes based on mood */}
      <div className="flex justify-center mb-3">
        <div className="w-16 h-16 bg-white/80 dark:bg-gray-800/50 rounded-full flex items-center justify-center shadow-sm">
          <div className="relative">
            {/* Eyes */}
            <div className="flex gap-5 mb-1">
              {sliderValue >= 50 ? (
                // Happy/Neutral eyes (simple dots)
                <>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-800 dark:bg-gray-200"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-800 dark:bg-gray-200"></div>
                </>
              ) : (
                // Sad eyes (dots with eyebrows)
                <>
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-800 dark:bg-gray-200"></div>
                    <div className="absolute -top-1.5 -left-0.5 w-3 h-0.5 bg-gray-800 dark:bg-gray-200 transform rotate-45"></div>
                  </div>
                  <div className="relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-800 dark:bg-gray-200"></div>
                    <div className="absolute -top-1.5 -right-0.5 w-3 h-0.5 bg-gray-800 dark:bg-gray-200 transform -rotate-45"></div>
                  </div>
                </>
              )}
            </div>
            
            {/* Mouth */}
            <div className="flex justify-center mt-2">
              {sliderValue >= 75 ? (
                // Happy mouth (smile)
                <div className="w-5 h-2.5 border-b-2 border-gray-800 dark:border-gray-200 rounded-b-full"></div>
              ) : sliderValue >= 25 ? (
                // Neutral mouth (straight line)
                <div className="w-5 h-0 border-b-2 border-gray-800 dark:border-gray-200"></div>
              ) : (
                // Sad mouth (frown)
                <div className="w-5 h-2.5 border-t-2 border-gray-800 dark:border-gray-200 rounded-t-full"></div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Slider */}
      <div className="mb-3 px-2">
        <Slider
          value={[sliderValue]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => setSliderValue(value[0])}
          className="mb-2"
        />
      </div>
      
      {/* Comment section */}
      {showCommentInput ? (
        <div className="mb-3">
          <Input
            type="text"
            placeholder="How are you feeling?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-white/70 dark:bg-gray-800/30 border-0 text-sm"
          />
        </div>
      ) : (
        <button 
          onClick={() => setShowCommentInput(true)}
          className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 mb-3 opacity-70 hover:opacity-100 transition-opacity"
        >
          <MessageCircle size={14} />
          <span>Add a note</span>
        </button>
      )}
      
      {/* Done button */}
      <Button
        className="w-full bg-black/80 dark:bg-white/90 text-white dark:text-black hover:bg-black dark:hover:bg-white text-sm py-1 h-8"
        onClick={handleSave}
      >
        Save
      </Button>
    </div>
  );
};

export default MoodSlider;
