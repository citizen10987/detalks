
import React, { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Habit {
  id: number;
  name: string;
  streak: number;
}

const Habits = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: 'Meditate', streak: 5 },
    { id: 2, name: 'Exercise', streak: 3 },
    { id: 3, name: 'Journal', streak: 7 },
  ]);
  const [newHabit, setNewHabit] = useState('');
  const treeCount = 15;
  
  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, { id: Date.now(), name: newHabit, streak: 0 }]);
      setNewHabit('');
    }
  };
  
  const removeHabit = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };
  
  return (
    <div className="page-container">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-semibold">Habit Tracker</h1>
      </div>
      
      <div className="space-y-3 mb-6">
        {habits.map(habit => (
          <div key={habit.id} className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium">{habit.name}</h3>
              <p className="text-sm text-gray-500">Streak: {habit.streak} days</p>
            </div>
            <button 
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              onClick={() => removeHabit(habit.id)}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex mb-6">
        <input 
          type="text" 
          className="flex-1 border border-gray-300 rounded-l-lg p-2" 
          placeholder="Add new habit"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button 
          className="bg-mood-peach text-white px-4 py-2 rounded-r-lg"
          onClick={addHabit}
        >
          Add
        </button>
      </div>
      
      <div className="text-center mb-4">
        <p className="font-medium">Trees Planted: {treeCount}</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: treeCount }).map((_, i) => (
          <span key={i} role="img" aria-label="tree" className="text-2xl">🌲</span>
        ))}
      </div>
    </div>
  );
};

export default Habits;
