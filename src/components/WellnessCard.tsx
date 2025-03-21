
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WellnessCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  backgroundColor?: string;
  badge?: string;
  onClick?: () => void;
  className?: string;
  to?: string;
  value?: string;
  unit?: string;
}

const WellnessCard: React.FC<WellnessCardProps> = ({
  icon: Icon,
  title,
  description,
  backgroundColor = 'bg-mood-purple dark:bg-indigo-900/60',
  badge,
  onClick,
  className,
  to,
  value,
  unit,
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
        "relative wellness-card cursor-pointer transition-all duration-300 transform hover:scale-[1.02] p-5 rounded-2xl shadow-sm",
        backgroundColor,
        className
      )}
      onClick={handleClick}
    >
      {value ? (
        // Minimalist tile design with value (for metrics)
        <div className="flex flex-col h-full">
          <div className="mb-1 text-gray-800 dark:text-gray-200">
            <Icon size={22} />
          </div>
          <div className="mt-auto">
            <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{value}</div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</span>
              {unit && <span className="text-xs text-gray-600 dark:text-gray-400">{unit}</span>}
            </div>
          </div>
        </div>
      ) : (
        // Standard card for features
        <div className="flex items-center">
          <div className="mr-4 text-gray-800 dark:text-gray-200">
            <Icon size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-800 dark:text-gray-100">{title}</span>
            {description && (
              <span className="text-sm text-gray-600 dark:text-gray-300">{description}</span>
            )}
          </div>
          
          {badge && (
            <div className="absolute right-4 text-xs font-medium bg-white/40 dark:bg-gray-700/50 px-2 py-0.5 rounded-full text-gray-700 dark:text-gray-300">
              {badge}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WellnessCard;
