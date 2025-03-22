
import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, ArrowLeft, Calendar, Image, Mic, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import JournalEntryCard from '@/components/JournalEntryCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

// Simulated journal data storage
const STORAGE_KEY = 'journal_entries';

// Entry type definition
interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
  mood?: string;
  imageUrl?: string;
  audioUrl?: string;
  color?: string;
}

const Journal = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryContent, setNewEntryContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem(STORAGE_KEY);
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    } else {
      // Initialize with sample entries if none exist
      const sampleEntries = [
        {
          id: '1',
          title: 'How cool is that',
          content: 'How cool it is to be where you are now. Just to enjoy the moment and live.\nThank you!',
          date: 'yesterday',
          time: '8:35 pm',
          color: 'bg-purple-300 dark:bg-purple-800/70'
        },
        {
          id: '2',
          title: 'Just my beautiful kitty',
          content: 'Just my beautiful kitty :)',
          date: 'yesterday',
          time: '3:12 pm',
          imageUrl: '/lovable-uploads/677f0ba2-f85f-4d9c-87a3-099e89a071d4.png',
          color: 'bg-amber-200 dark:bg-amber-800/70'
        }
      ];
      setEntries(sampleEntries);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleEntries));
    }
  }, []);
  
  const handleNewEntry = () => {
    setNewEntryTitle('');
    setNewEntryContent('');
    setSelectedImage(null);
    setIsSheetOpen(true);
  };
  
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      toast({
        title: "Image Selected",
        description: "Your image has been attached to the entry",
        duration: 1500,
      });
    }
  };
  
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Audio Recorded",
        description: "Your voice note has been attached",
        duration: 1500,
      });
    } else {
      // In a real app, you would request microphone access and start recording
      setIsRecording(true);
      toast({
        title: "Recording Started",
        description: "Please speak clearly...",
        duration: 1500,
      });
    }
  };
  
  const saveEntry = () => {
    if (newEntryTitle.trim() || newEntryContent.trim()) {
      const today = new Date();
      
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        title: newEntryTitle.trim() || 'Untitled Entry',
        content: newEntryContent,
        date: format(today, 'MMMM d, yyyy'),
        time: format(today, 'h:mm a'),
        imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
        // In a real app, you would handle audio recording and storage
        audioUrl: isRecording ? '#' : undefined,
        // Assign a random color from a set of pleasant colors
        color: ['bg-purple-300 dark:bg-purple-800/70', 'bg-amber-200 dark:bg-amber-800/70', 'bg-blue-200 dark:bg-blue-800/70', 'bg-green-200 dark:bg-green-800/70', 'bg-pink-200 dark:bg-pink-800/70'][
          Math.floor(Math.random() * 5)
        ]
      };
      
      const updatedEntries = [newEntry, ...entries];
      setEntries(updatedEntries);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
      
      setNewEntryTitle('');
      setNewEntryContent('');
      setSelectedImage(null);
      setIsRecording(false);
      setIsSheetOpen(false);
      
      toast({
        title: "Journal Entry Saved",
        description: "Your thoughts have been recorded",
        duration: 1500,
      });
    } else {
      toast({
        title: "Cannot Save Empty Entry",
        description: "Please add some text to your journal entry",
        variant: "destructive",
        duration: 1500,
      });
    }
  };

  // Filter entries based on active tab
  const filteredEntries = activeTab === 'all' 
    ? entries 
    : entries.filter(entry => {
        const entryDate = new Date(entry.date);
        const today = new Date();
        
        if (activeTab === 'today') {
          return format(entryDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
        } else if (activeTab === 'week') {
          const oneWeekAgo = new Date(today);
          oneWeekAgo.setDate(today.getDate() - 7);
          return entryDate >= oneWeekAgo;
        } else if (activeTab === 'month') {
          const oneMonthAgo = new Date(today);
          oneMonthAgo.setMonth(today.getMonth() - 1);
          return entryDate >= oneMonthAgo;
        }
        return true;
      });

  // Group entries by date
  const groupedEntries: Record<string, JournalEntry[]> = {};
  filteredEntries.forEach(entry => {
    if (!groupedEntries[entry.date]) {
      groupedEntries[entry.date] = [];
    }
    groupedEntries[entry.date].push(entry);
  });

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
        <div className="animate-fade-in">
          <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="space-y-6">
            {Object.keys(groupedEntries).map(date => (
              <div key={date}>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{date}</h3>
                <div className="space-y-3">
                  {groupedEntries[date].map(entry => (
                    <JournalEntryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              </div>
            ))}
          </div>
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
        <SheetContent side="bottom" className="h-[85vh] sm:max-w-md mx-auto">
          <SheetHeader className="text-left mb-4">
            <SheetTitle>New Journal Entry</SheetTitle>
          </SheetHeader>
          
          <div className="space-y-4">
            <Input
              placeholder="Entry title"
              className="font-medium text-lg border-none p-0 focus-visible:ring-0"
              value={newEntryTitle}
              onChange={(e) => setNewEntryTitle(e.target.value)}
            />
            
            <div className="rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <Textarea 
                placeholder="What's on your mind today?" 
                className="min-h-[200px] border-none focus-visible:ring-0 bg-transparent" 
                value={newEntryContent}
                onChange={(e) => setNewEntryContent(e.target.value)}
              />
              
              {selectedImage && (
                <div className="p-3 bg-gray-100 dark:bg-gray-800">
                  <div className="relative">
                    <img 
                      src={URL.createObjectURL(selectedImage)} 
                      alt="Selected" 
                      className="w-full h-auto max-h-40 object-contain rounded-lg"
                    />
                    <button 
                      className="absolute top-1 right-1 bg-gray-800/70 text-white p-1 rounded-full"
                      onClick={() => setSelectedImage(null)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-2">
              <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Image size={20} className="text-gray-600 dark:text-gray-400" />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageSelect} 
                  className="hidden" 
                />
              </label>
              
              <button 
                className={`p-2 rounded-full transition-colors ${
                  isRecording 
                    ? "bg-red-500 text-white animate-pulse" 
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
                onClick={toggleRecording}
              >
                <Mic size={20} />
              </button>
            </div>
            
            <div className="flex justify-end gap-2 pt-4 mt-auto">
              <Button 
                variant="outline"
                onClick={() => setIsSheetOpen(false)}
                className="w-24"
              >
                Cancel
              </Button>
              <Button 
                onClick={saveEntry}
                className="w-24 bg-lime-400 hover:bg-lime-500 text-black"
              >
                Save
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Journal;
