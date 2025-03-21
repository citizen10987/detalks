
export interface MoodEntry {
  date: Date;
  value: number;
  label: string;
  comment: string;
}

const MOOD_STORAGE_KEY = 'mood_entries';

export const saveMoodEntry = (value: number, label: string, comment: string): MoodEntry => {
  const entry: MoodEntry = {
    date: new Date(),
    value,
    label,
    comment
  };
  
  // Get existing entries
  const existingEntries = getMoodEntries();
  
  // Check if we already have an entry for today
  const today = new Date().toDateString();
  
  // Filter out today's entry if it exists
  const filteredEntries = existingEntries.filter(
    entry => new Date(entry.date).toDateString() !== today
  );
  
  // Add the new entry
  const updatedEntries = [...filteredEntries, entry];
  
  // Save back to storage
  localStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(updatedEntries));
  
  return entry;
};

export const getMoodEntries = (): MoodEntry[] => {
  const entriesJson = localStorage.getItem(MOOD_STORAGE_KEY);
  if (!entriesJson) return [];
  
  try {
    const entries = JSON.parse(entriesJson);
    return entries.map((entry: any) => ({
      ...entry,
      date: new Date(entry.date)
    }));
  } catch (error) {
    console.error('Error parsing mood entries:', error);
    return [];
  }
};

export const getMoodEntryForDate = (date: Date): MoodEntry | null => {
  const entries = getMoodEntries();
  const dateString = date.toDateString();
  
  const entry = entries.find(
    e => new Date(e.date).toDateString() === dateString
  );
  
  return entry || null;
};

export const getTodaysMoodEntry = (): MoodEntry | null => {
  return getMoodEntryForDate(new Date());
};
