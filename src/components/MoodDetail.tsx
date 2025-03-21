
import React from 'react';
import { Clock, Edit2, X } from 'lucide-react';
import { format } from 'date-fns';
import { MoodType } from './MoodSelector';

interface MoodDetailProps {
  mood: MoodType;
  date: Date;
  note: string;
  onEdit: () => void;
  onClose: () => void;
}

const MoodDetail: React.FC<MoodDetailProps> = ({
  mood,
  date,
  note,
  onEdit,
  onClose
}) => {
  const getMoodEmoji = (mood: MoodType): string => {
    switch (mood) {
      case 'rad': return '😊';
      case 'good': return '🙂';
      case 'meh': return '😐';
      case 'bad': return '🙁';
      case 'awful': return '😠';
      default: return '😐';
    }
  };
  
  const getMoodLabel = (mood: MoodType): string => {
    return mood.charAt(0).toUpperCase() + mood.slice(1);
  };
  
  const getMoodColor = (mood: MoodType): string => {
    switch (mood) {
      case 'rad': return 'bg-emerald-500';
      case 'good': return 'bg-green-500';
      case 'meh': return 'bg-yellow-400';
      case 'bad': return 'bg-red-400';
      case 'awful': return 'bg-red-600';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-md w-full p-5 border border-gray-800 shadow-xl animate-scale-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">Mood Detail</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <div className={`${getMoodColor(mood)} w-14 h-14 rounded-full flex items-center justify-center text-2xl`}>
            {getMoodEmoji(mood)}
          </div>
          
          <div>
            <div className="text-xl font-medium text-white">{getMoodLabel(mood)}</div>
            <div className="flex items-center text-gray-400 text-sm">
              <Clock size={14} className="mr-1" />
              {format(date, 'EEEE, MMMM d, yyyy • h:mm a')}
            </div>
          </div>
        </div>
        
        {note && (
          <div className="bg-gray-800/60 rounded-lg p-3 my-4 text-gray-200">
            {note}
          </div>
        )}
        
        <button 
          onClick={onEdit}
          className="flex items-center justify-center gap-2 w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg mt-4 transition-colors"
        >
          <Edit2 size={16} />
          <span>Edit Entry</span>
        </button>
      </div>
    </div>
  );
};

export default MoodDetail;
