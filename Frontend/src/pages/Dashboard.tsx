import React from 'react';
import Card from '../components/ui/Card';
import MoodTracker from '../components/MoodTracker';
import ResourceCard from '../components/ResourceCard';
import ForumPost from '../components/ForumPost';
import { 
  mockUsers, 
  mockMoodEntries, 
  mockResources, 
  mockForumPosts 
} from '../data/mockData';
import { MessageCircle, TrendingUp, Award, UserPlus } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { IsLoading, UserDetails, UserMoodEntry } from '../State/ComponetState';

const Dashboard: React.FC = () => {
  // Get other users for recommended connections
  const otherUsers = mockUsers.slice(1);
  const Data = useRecoilValue(UserDetails);
  const UserMood = useRecoilValue(UserMoodEntry);
  const isLoading = useRecoilValue(IsLoading);
  
  // Get latest resources
  const latestResources = mockResources.slice(0, 2);
  
  // Get top forum post
  const topForumPost = mockForumPosts[0];
  const postAuthor = mockUsers.find(user => user.id === topForumPost.authorId) || mockUsers[0];

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl animate-pulse">
        {/* Stats Cards Skeleton */}
        <div className="mb-8">
          <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-96 bg-gray-200 rounded"></div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </Card>
              ))}
            </div>

            {/* Mood Tracker Skeleton */}
            <Card>
              <div className="h-64 bg-gray-200 rounded"></div>
            </Card>

            {/* Forum Post Skeleton */}
            <Card>
              <div className="h-48 bg-gray-200 rounded"></div>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Recommended Connection Skeleton */}
            <Card>
              <div className="h-40 bg-gray-200 rounded"></div>
            </Card>

            {/* Resources Skeleton */}
            <Card>
              <div className="space-y-4">
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </Card>

            {/* Quick Actions Skeleton */}
            <Card>
              <div className="space-y-2">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {Data.firstname} {Data.latname}</h1>
          <p className="mt-2 text-gray-600">
            Track your mood, connect with peers, and discover helpful resources.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Card className="flex items-center animate-fade-in">
                <div className="mr-4 rounded-full bg-primary/10 p-3">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Conversations</p>
                  <p className="text-2xl font-semibold">{UserMood.length}</p>
                </div>
              </Card>
              
              <Card className="flex items-center animate-fade-in">
                <div className="mr-4 rounded-full bg-success/10 p-3">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mood Trend</p>
                  <p className="text-2xl font-semibold">Improving</p>
                </div>
              </Card>
              
              <Card className="flex items-center animate-fade-in">
                <div className="mr-4 rounded-full bg-accent/10 p-3">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Support Score</p>
                  <p className="text-2xl font-semibold">87</p>
                </div>
              </Card>
            </div>

            {/* Mood Tracker */}
            <div className="animate-fade-in">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Mood Tracker</h2>
              <MoodTracker entries={mockMoodEntries} />
            </div>

            {/* Popular Discussion */}
            <div className="animate-fade-in">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Popular Discussion</h2>
              <ForumPost 
                post={topForumPost} 
                author={postAuthor} 
              />
            </div>
          </div>

          <div className="space-y-6">
            {/* AI Matched Peer */}
            <div className="animate-fade-in">
              <h2 className="mb-4 flex items-center text-xl font-semibold text-gray-900">
                <UserPlus className="mr-2 h-5 w-5 text-primary" />
                Recommended Connection
              </h2>
              {/* <UserCard 
                user={otherUsers[0]} 
                isMatch={true} 
                matchScore={92} 
                onConnect={() => {}} 
              /> */}
            </div>

            {/* Featured Resources */}
            <div className="animate-fade-in">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Featured Resources</h2>
              <div className="space-y-4">
                {latestResources.map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <Card className="animate-fade-in">
              <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
              <div className="space-y-2">
                <button className="flex w-full items-center rounded-lg px-4 py-2 text-left transition-colors hover:bg-gray-50">
                  <div className="mr-3 rounded-full bg-primary/10 p-2">
                    <UserPlus className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Find a peer supporter</span>
                </button>
                
                <button className="flex w-full items-center rounded-lg px-4 py-2 text-left transition-colors hover:bg-gray-50">
                  <div className="mr-3 rounded-full bg-accent/10 p-2">
                    <MessageCircle className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-sm">Join a group session</span>
                </button>
                
                <button className="flex w-full items-center rounded-lg px-4 py-2 text-left transition-colors hover:bg-gray-50">
                  <div className="mr-3 rounded-full bg-secondary/10 p-2">
                    <Award className="h-4 w-4 text-secondary" />
                  </div>
                  <span className="text-sm">View your achievements</span>
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;