
import React from 'react';
import { BookOpen, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Journal = () => {
  const { toast } = useToast();
  
  const handleNewEntry = () => {
    toast({
      title: "Journal Feature",
      description: "This would open a new journal entry screen",
      duration: 1500,
    });
  };

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Journal</h1>
        <button 
          className="bg-icon-purple text-white p-2 rounded-full"
          onClick={handleNewEntry}
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-500">
        <BookOpen size={48} className="mb-4 text-gray-300" />
        <h2 className="text-xl font-medium mb-2">Your Journal</h2>
        <p className="mb-4">Start documenting your thoughts and feelings</p>
        <button 
          className="bg-icon-purple text-white py-2 px-6 rounded-full"
          onClick={handleNewEntry}
        >
          New Entry
        </button>
      </div>
    </div>
  );
};

export default Journal;
