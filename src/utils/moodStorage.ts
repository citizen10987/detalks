export interface MoodEntry {
  date: string;
  value: number;
  label: string;
  comment: string;
}

/**
 * Save a mood entry for the current day
 */
export const saveMoodEntry = (value: number, label: string, comment: string = '') => {
  try {
    // Get existing entries from local storage
    const storedEntries = localStorage.getItem('moodEntries');
    const entries: Record<string, MoodEntry> = storedEntries ? JSON.parse(storedEntries) : {};
    
    // Format today's date as a string key
    const today = new Date();
    const dateKey = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Save today's entry
    entries[dateKey] = {
      date: dateKey,
      value,
      label,
      comment
    };
    
    // Save back to localStorage
    localStorage.setItem('moodEntries', JSON.stringify(entries));
    return true;
  } catch (error) {
    console.error('Error saving mood entry:', error);
    return false;
  }
};

/**
 * Get today's mood entry if it exists
 */
export const getTodaysMoodEntry = (): MoodEntry | null => {
  try {
    // Get existing entries from local storage
    const storedEntries = localStorage.getItem('moodEntries');
    if (!storedEntries) return null;
    
    const entries: Record<string, MoodEntry> = JSON.parse(storedEntries);
    
    // Format today's date as a string key
    const today = new Date();
    const dateKey = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Return today's entry if it exists
    return entries[dateKey] || null;
  } catch (error) {
    console.error('Error retrieving mood entry:', error);
    return null;
  }
};

/**
 * Get all mood entries
 */
export const getAllMoodEntries = (): MoodEntry[] => {
  try {
    // Get existing entries from local storage
    const storedEntries = localStorage.getItem('moodEntries');
    if (!storedEntries) return [];
    
    const entries: Record<string, MoodEntry> = JSON.parse(storedEntries);
    
    // Convert object to array
    return Object.values(entries);
  } catch (error) {
    console.error('Error retrieving all mood entries:', error);
    return [];
  }
};

/**
 * Get a specific day's mood entry
 */
export const getMoodEntryByDate = (date: Date): MoodEntry | null => {
  try {
    // Get existing entries from local storage
    const storedEntries = localStorage.getItem('moodEntries');
    if (!storedEntries) return null;
    
    const entries: Record<string, MoodEntry> = JSON.parse(storedEntries);
    
    // Format the date as a string key
    const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Return the entry for the specified date if it exists
    return entries[dateKey] || null;
  } catch (error) {
    console.error('Error retrieving mood entry for date:', error);
    return null;
  }
};
