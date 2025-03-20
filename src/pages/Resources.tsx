
import React from 'react';
import { ArrowLeft, Book, Lightbulb, Heart, Brain, ExternalLink, Download } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Resource {
  id: number;
  title: string;
  category: string;
  description: string;
  icon: any;
  link?: string;
  isPremium?: boolean;
  isDownloadable?: boolean;
}

const Resources = () => {
  const navigate = useNavigate();
  
  const resources: Resource[] = [
    {
      id: 1,
      title: "Anxiety Management Guide",
      category: "Self-Help",
      description: "A comprehensive guide on understanding anxiety triggers and effective coping mechanisms.",
      icon: Brain,
      isDownloadable: true
    },
    {
      id: 2,
      title: "Mindfulness Practice Sessions",
      category: "Meditation",
      description: "A collection of guided mindfulness sessions for daily practice.",
      icon: Lightbulb,
      link: "https://example.com/mindfulness"
    },
    {
      id: 3,
      title: "Depression Recovery Workbook",
      category: "Self-Help",
      description: "Interactive workbook with exercises to help manage depression symptoms.",
      icon: Book,
      isDownloadable: true
    },
    {
      id: 4,
      title: "Therapist Selection Guide",
      category: "Treatment",
      description: "How to find the right therapist for your specific needs and circumstances.",
      icon: Heart,
      link: "https://example.com/therapist-selection"
    },
    {
      id: 5,
      title: "Sleep Improvement Program",
      category: "Wellness",
      description: "A 4-week program to establish better sleep habits and improve sleep quality.",
      icon: Brain,
      isPremium: true
    },
    {
      id: 6,
      title: "Crisis Resources Directory",
      category: "Support",
      description: "A directory of emergency resources and hotlines for mental health crises.",
      icon: Heart,
      link: "https://example.com/crisis-resources"
    }
  ];
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Self-Help":
        return "bg-mood-purple text-icon-purple dark:bg-indigo-900/60 dark:text-indigo-300";
      case "Meditation":
        return "bg-mood-green text-green-700 dark:bg-green-900/60 dark:text-green-300";
      case "Treatment":
        return "bg-mood-blue text-blue-700 dark:bg-blue-900/60 dark:text-blue-300";
      case "Wellness":
        return "bg-mood-peach text-amber-700 dark:bg-amber-900/60 dark:text-amber-300";
      case "Support":
        return "bg-mood-pink text-pink-700 dark:bg-pink-900/60 dark:text-pink-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  const getIconColor = (category: string) => {
    switch (category) {
      case "Self-Help":
        return "text-icon-purple dark:text-indigo-300";
      case "Meditation":
        return "text-green-600 dark:text-green-400";
      case "Treatment":
        return "text-blue-600 dark:text-blue-400";
      case "Wellness":
        return "text-amber-600 dark:text-amber-400";
      case "Support":
        return "text-pink-600 dark:text-pink-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };
  
  return (
    <div className="page-container pb-16">
      <div className="flex items-center mb-6 mt-4">
        <button
          className="mr-4 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-2xl font-semibold">Mental Health Resources</h1>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Access expert-curated resources to support your mental health journey.
      </p>
      
      <div className="grid grid-cols-1 gap-4 animate-fade-in">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <Card key={resource.id} className="overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all hover:translate-y-[-2px]">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-3 ${getIconColor(resource.category)} bg-gray-100 dark:bg-gray-700`}>
                      <Icon size={20} />
                    </div>
                    <CardTitle>{resource.title}</CardTitle>
                  </div>
                  <Badge className={getCategoryColor(resource.category)}>
                    {resource.category}
                  </Badge>
                </div>
                <CardDescription className="mt-2">
                  {resource.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-2 pb-4 flex justify-between">
                {resource.isPremium && (
                  <Badge variant="outline" className="mr-2 border-amber-500 text-amber-500 dark:border-amber-400 dark:text-amber-400">
                    Premium
                  </Badge>
                )}
                
                <div className="flex gap-2 ml-auto">
                  {resource.isDownloadable && (
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Download size={14} />
                      <span>Download</span>
                    </Button>
                  )}
                  
                  {resource.link && (
                    <Button variant="default" size="sm" className="flex items-center gap-1 bg-icon-purple hover:bg-icon-purple/90 dark:bg-icon-purple-light dark:text-gray-900">
                      <span>View</span>
                      <ExternalLink size={14} />
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Resources;
