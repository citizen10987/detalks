
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WellnessCardProps {
  icon: LucideIcon;
  title: string;
  backgroundColor?: string;
  badge?: string;
  onClick?: () => void;
  className?: string;
  to?: string;
}

const WellnessCard: React.FC<WellnessCardProps> = ({
  icon: Icon,
  title,
  backgroundColor = 'bg-mood-purple dark:bg-indigo-900',
  badge,
  onClick,
  className,
  to,
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={cn(
        "relative wellness-card cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]",
        backgroundColor,
        className
      )}
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div className="mr-4 text-icon-purple dark:text-purple-400 bg-white/50 dark:bg-white/10 p-2 rounded-lg transition-colors duration-300">
          <Icon size={20} />
        </div>
        <span className="font-medium text-gray-800 dark:text-gray-100 transition-colors duration-300">{title}</span>
      </div>
      
      {badge && (
        <div className="absolute right-4 text-xs font-medium text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-700/50 px-2 py-0.5 rounded-full transition-colors duration-300">
          {badge}
        </div>
      )}
    </div>
  );
};

export default WellnessCard;
