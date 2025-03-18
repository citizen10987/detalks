
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Breathing = () => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [counter, setCounter] = useState(4);
  const [isActive, setIsActive] = useState(true);
  
  useEffect(() => {
    if (!isActive) return;
    
    const timer = setInterval(() => {
      if (counter > 1) {
        setCounter(prev => prev - 1);
      } else {
        setCounter(phase === 'inhale' ? 4 : phase === 'hold' ? 2 : 4);
        setPhase(prev => 
          prev === 'inhale' ? 'hold' : 
          prev === 'hold' ? 'exhale' : 'inhale'
        );
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [counter, phase, isActive]);

  const getInstructions = () => {
    switch(phase) {
      case 'inhale': return 'Breathe in slowly';
      case 'hold': return 'Hold your breath';
      case 'exhale': return 'Breathe out slowly';
    }
  };
  
  return (
    <div className="page-container bg-gray-50">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-semibold">Breathing Exercise</h1>
      </div>
      
      <div className="flex flex-col items-center justify-center mt-16">
        <div className="text-center mb-6">
          <p className="text-gray-600">{getInstructions()}</p>
        </div>
        
        <div 
          className={`w-64 h-64 rounded-full flex items-center justify-center text-white text-2xl transition-all duration-1000 ${
            phase === 'inhale' ? 'bg-blue-400 scale-90' : 
            phase === 'hold' ? 'bg-purple-400 scale-100' : 'bg-teal-400 scale-110'
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl font-light mb-2">{counter}</span>
            <span className="text-lg capitalize">{phase}</span>
          </div>
        </div>
        
        <button 
          className="mt-16 bg-icon-purple text-white px-8 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all"
          onClick={() => setIsActive(prev => !prev)}
        >
          {isActive ? 'Pause' : 'Resume'}
        </button>
        
        <div className="mt-12 text-center text-gray-500">
          <h3 className="font-medium mb-2">Benefits</h3>
          <p className="text-sm">
            Deep breathing helps reduce stress, lower blood pressure, 
            and promote feelings of calm and relaxation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Breathing;
