
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface WellnessCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  backgroundColor?: string;
  to?: string;
  iconColor?: string;
  onClick?: () => void;
}

const WellnessCard = ({ 
  icon: Icon, 
  title, 
  description, 
  backgroundColor = "bg-soft-purple dark:bg-indigo-900/60",
  iconColor,
  to, 
  onClick 
}: WellnessCardProps) => {
  const content = (
    <div className={`flex flex-col items-center justify-center p-5 rounded-2xl ${backgroundColor} w-full h-full`}>
      <div className="bg-white/30 dark:bg-white/10 rounded-full p-3 mb-2">
        <Icon 
          size={24} 
          style={{ color: iconColor }} 
          className="text-gray-800 dark:text-gray-100" 
        />
      </div>
      <h3 className="font-medium text-center text-gray-800 dark:text-gray-100">{title}</h3>
      {description && <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-transform">
        {content}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick} 
      className="w-full rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-transform"
    >
      {content}
    </button>
  );
};

export default WellnessCard;
