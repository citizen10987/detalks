
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
  
  return (
    <div className="page-container">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-semibold">Breathing Exercise</h1>
      </div>
      
      <div className="flex flex-col items-center justify-center mt-20">
        <div 
          className={`w-64 h-64 rounded-full bg-mood-purple flex items-center justify-center text-white text-2xl transition-all duration-1000 ${
            phase === 'inhale' ? 'scale-90' : 
            phase === 'hold' ? 'scale-100' : 'scale-110'
          }`}
        >
          {phase}
        </div>
        
        <div className="mt-8 text-xl font-semibold">
          {counter}
        </div>
        
        <button 
          className="mt-12 bg-mood-purple text-white px-6 py-2 rounded-full"
          onClick={() => setIsActive(prev => !prev)}
        >
          {isActive ? 'Pause' : 'Resume'}
        </button>
      </div>
    </div>
  );
};

export default Breathing;
