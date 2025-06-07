import React, { useState } from 'react';
import MoodTracker from '../components/MoodTracker';
import Card from '../components/ui/Card';
import { mockMoodEntries } from '../data/mockData';
import { BarChart, TrendingUp, Calendar, Smile } from 'lucide-react';

const MoodTrackerPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="flex items-center animate-pulse">
              <div className="h-12 w-12 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Mood Tracker Component Skeleton */}
        <div className="space-y-6">
          <Card className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
            <div className="flex flex-wrap gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-20 w-20 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="h-24 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </Card>

          <Card className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Mood Tracker</h1>
        <p className="mt-2 text-gray-600">
          Track your daily mood and identify patterns to support your mental wellbeing
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        <Card className="flex items-center animate-fade-in">
          <div className="mr-4 rounded-full bg-primary/10 p-3">
            <BarChart className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Entries This Week</p>
            <p className="text-2xl font-semibold">5</p>
          </div>
        </Card>
        
        <Card className="flex items-center animate-fade-in">
          <div className="mr-4 rounded-full bg-success/10 p-3">
            <TrendingUp className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Average Mood</p>
            <p className="text-2xl font-semibold">Good</p>
          </div>
        </Card>
        
        <Card className="flex items-center animate-fade-in">
          <div className="mr-4 rounded-full bg-accent/10 p-3">
            <Calendar className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Streak</p>
            <p className="text-2xl font-semibold">12 days</p>
          </div>
        </Card>
      </div>

      {/* Mood Tracker Component */}
      <div className="animate-fade-in">
        <MoodTracker 
          entries={mockMoodEntries} 
          isLoading={false}
          onAddEntry={(entry) => {
            console.log('New mood entry:', entry);
          }}
        />
      </div>
    </div>
  );
};

export default MoodTrackerPage;