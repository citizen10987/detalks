
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart, Trophy, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const tabs = [
    {
      name: 'Home',
      path: '/',
      icon: Home
    },
    {
      name: 'Stats',
      path: '/stats',
      icon: BarChart
    },
    {
      name: 'Leaderboard',
      path: '/leaderboard',
      icon: Trophy
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: User
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-2 px-4 z-10">
      <div className="flex justify-between items-center">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          const Icon = tab.icon;
          
          return (
            <Link 
              key={tab.path} 
              to={tab.path} 
              className={cn("tab-button flex flex-col items-center", isActive && "active")}
            >
              <Icon size={20} className={cn("mb-1", isActive ? "text-icon-purple" : "text-gray-500 dark:text-gray-400")} />
              <span className={cn("text-xs", isActive ? "text-icon-purple" : "text-gray-500 dark:text-gray-400")}>
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
