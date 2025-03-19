
import React, { useState } from 'react';
import { BookOpen, Plus, ArrowLeft, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';

const Journal = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [entries, setEntries] = useState<{date: string, content: string, mood: string}[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const handleNewEntry = () => {
    setIsSheetOpen(true);
  };
  
  const saveEntry = () => {
    if (newEntry.trim()) {
      const today = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      
      setEntries([...entries, {
        date: today,
        content: newEntry,
        mood: '😊' // Default mood
      }]);
      
      setNewEntry('');
      setIsSheetOpen(false);
      
      toast({
        title: "Journal Entry Saved",
        description: "Your thoughts have been recorded",
        duration: 1500,
      });
    }
  };

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
          <h1 className="text-2xl font-semibold">Journal</h1>
        </div>
        <div className="flex space-x-2">
          <button 
            className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full"
            onClick={() => toast({
              title: "Calendar View",
              description: "This would show a calendar of journal entries",
              duration: 1500,
            })}
          >
            <Calendar size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          <button 
            className="bg-icon-purple text-white p-2 rounded-full"
            onClick={handleNewEntry}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      
      {entries.length > 0 ? (
        <div className="space-y-4 animate-fade-in">
          {entries.map((entry, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">{entry.date}</span>
                <span>{entry.mood}</span>
              </div>
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{entry.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-500">
          <BookOpen size={48} className="mb-4 text-gray-300 dark:text-gray-600" />
          <h2 className="text-xl font-medium mb-2">Your Journal</h2>
          <p className="mb-4">Start documenting your thoughts and feelings</p>
          <button 
            className="bg-icon-purple text-white py-2 px-6 rounded-full"
            onClick={handleNewEntry}
          >
            New Entry
          </button>
        </div>
      )}
      
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>New Journal Entry</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
            <Textarea 
              placeholder="How are you feeling today?" 
              className="min-h-[200px]" 
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
            />
            <div className="flex justify-end space-x-2 pt-4">
              <button 
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                onClick={() => setIsSheetOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-icon-purple text-white rounded-lg"
                onClick={saveEntry}
              >
                Save
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Journal;
