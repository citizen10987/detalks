
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
  { value: 0, label: "Hideous", color: "bg-pink-200" },
  { value: 25, label: "Bad", color: "bg-red-200" },
  { value: 50, label: "Meh", color: "bg-yellow-200" },
  { value: 75, label: "Good", color: "bg-green-200" },
  { value: 100, label: "Amazing", color: "bg-blue-200" }
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
    <div className={`p-6 rounded-xl ${currentMood.color} transition-colors duration-300 shadow-sm`}>
      <h2 className="text-center text-xl font-medium mb-8">{currentMood.label}</h2>
      
      <div className="flex flex-col items-center justify-center mb-8">
        {/* Eyes - change based on mood */}
        <div className="flex justify-center gap-10 mb-4">
          {sliderValue >= 50 ? (
            // Happy/Neutral eyes (circles)
            <>
              <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-black"></div>
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-black"></div>
              </div>
            </>
          ) : (
            // Sad eyes (triangles)
            <>
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="w-8 h-6 border-2 border-black" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}>
                  <div className="w-2 h-2 rounded-full bg-black mx-auto mt-1"></div>
                </div>
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="w-8 h-6 border-2 border-black" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}>
                  <div className="w-2 h-2 rounded-full bg-black mx-auto mt-1"></div>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Mouth - changes based on mood */}
        <div className="h-8 w-16 flex items-center justify-center">
          {sliderValue >= 75 ? (
            // Happy mouth (smile)
            <div className="w-16 h-8 border-b-2 border-black rounded-b-full"></div>
          ) : sliderValue >= 25 ? (
            // Neutral mouth (straight line)
            <div className="w-16 h-0 border-b-2 border-black"></div>
          ) : (
            // Sad mouth (frown)
            <div className="w-16 h-8 border-t-2 border-black rounded-t-full"></div>
          )}
        </div>
      </div>
      
      {/* Slider */}
      <div className="mb-8 px-4">
        <Slider
          value={[sliderValue]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => setSliderValue(value[0])}
          className="mb-4"
        />
        
        <div className="flex justify-between text-xs text-gray-600">
          <span>😞</span>
          <span>😐</span>
          <span>😊</span>
        </div>
      </div>
      
      {/* Comment section */}
      {showCommentInput ? (
        <div className="mb-4">
          <Input
            type="text"
            placeholder="How are you feeling?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-white/50 border-white"
          />
        </div>
      ) : (
        <button 
          onClick={() => setShowCommentInput(true)}
          className="flex items-center gap-2 text-sm text-gray-600 mb-4"
        >
          <MessageCircle size={16} />
          <span>Add a comment</span>
        </button>
      )}
      
      {/* Done button */}
      <Button
        className="w-full bg-black text-white hover:bg-gray-800"
        onClick={handleSave}
      >
        Done
      </Button>
    </div>
  );
};

export default MoodSlider;
