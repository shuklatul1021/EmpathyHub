import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { mockUsers, mockMoodEntries } from '../data/mockData';
import { Award, Calendar, MessageCircle, Heart, TrendingUp } from 'lucide-react';
import { BACKEND_URL } from '../config';

const UserDetail: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const user = mockUsers.find(u => u.id === id) || mockUsers[0];
  const userMoodEntries = mockMoodEntries.filter(entry => entry.userId === user.id);
  const [userdetails , setUserdetails ] = useState({});
  const [isLoading ,setisLoading ]= useState(true);

  const json = location.pathname.split("/");

  const getUserDetails = async()=>{
    const Res = await fetch(`${BACKEND_URL}/api/v1/user/getuserdetails/${json[2]}` , {
      method : "GET",
      headers : {
        token : localStorage.getItem('token') || '',
        "Content-Type" : "application/json"
      }
    })
    if(Res.ok){
      const json = await Res.json();
      setUserdetails(json.user);
      setisLoading(false);
    }
  }

  useState(()=>{
    getUserDetails();
  },[])

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Profile Card Skeleton */}
          <div className="md:col-span-1">
            <Card className="animate-pulse">
              <div className="text-center">
                <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-6 w-32 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="h-16 bg-gray-200 rounded mb-4"></div>
                
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-6 w-16 bg-gray-200 rounded-full"></div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-around text-center">
                    <div>
                      <div className="h-8 w-12 bg-gray-200 rounded mx-auto mb-1"></div>
                      <div className="h-4 w-20 bg-gray-200 rounded mx-auto"></div>
                    </div>
                    <div>
                      <div className="h-8 w-8 bg-gray-200 rounded mx-auto mb-1"></div>
                      <div className="h-4 w-12 bg-gray-200 rounded mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Badges Skeleton */}
            <Card className="mt-6 animate-pulse">
              <div className="h-6 w-24 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-start">
                    <div className="h-10 w-10 bg-gray-200 rounded-lg mr-3"></div>
                    <div className="flex-1">
                      <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 w-48 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Activity and Stats Skeleton */}
          <div className="md:col-span-2 space-y-6">
            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="flex items-center animate-pulse">
                  <div className="h-12 w-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                    <div className="h-6 w-8 bg-gray-200 rounded"></div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Recent Activity Skeleton */}
            <Card className="animate-pulse">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="h-4 w-24 bg-gray-200 rounded"></div>
                          <div className="h-3 w-20 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-12 bg-gray-200 rounded mb-2"></div>
                        <div className="flex gap-2">
                          {[1, 2].map((j) => (
                            <div key={j} className="h-5 w-16 bg-gray-200 rounded-full"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <div className="md:col-span-1">
          <Card className="animate-fade-in">
            <div className="text-center">
              <Avatar 
                src={userdetails.avatar} 
                alt={userdetails.username}
                size="xl" 
                status="online"
                className="mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold mb-2">{userdetails.firstname} {userdetails.latname} </h1>
              <p className="text-gray-600 mb-4">{userdetails.bio}</p>
              
              {userdetails.tags && userdetails.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4 ml-16">
                  {userdetails.tags.flatMap((e) => {
                    try {
                      // Try parsing as JSON array
                      return JSON.parse(e.name);
                    } catch {
                      // Fallback: treat as comma-separated string
                      return e.name.split(',').map(str => str.trim());
                    }
                  }).map((tag, index) => (
                    <Badge key={index} variant="primary" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-around text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{user.supportScore}</p>
                    <p className="text-sm text-gray-600">Support Score</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent">{user.badges.length}</p>
                    <p className="text-sm text-gray-600">Badges</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Badges */}
          <Card className="mt-6 animate-fade-in">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Award className="h-5 w-5 text-primary mr-2" />
              Badges
            </h2>
            <div className="space-y-4">
              {user.badges.map(badge => (
                <div key={badge.id} className="flex items-start">
                  <div className="p-2 bg-primary/10 rounded-lg mr-3">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{badge.name}</h3>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Earned {new Date(badge.dateEarned).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Activity and Stats */}
        <div className="md:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="flex items-center animate-fade-in">
              <div className="mr-4 rounded-full bg-primary/10 p-3">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Conversations</p>
                <p className="text-2xl font-semibold">24</p>
              </div>
            </Card>
            
            <Card className="flex items-center animate-fade-in">
              <div className="mr-4 rounded-full bg-accent/10 p-3">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-gray-500">People Helped</p>
                <p className="text-2xl font-semibold">12</p>
              </div>
            </Card>
            
            <Card className="flex items-center animate-fade-in">
              <div className="mr-4 rounded-full bg-success/10 p-3">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Growth Score</p>
                <p className="text-2xl font-semibold">92</p>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="animate-fade-in">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 text-primary mr-2" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {userMoodEntries.map(entry => (
                <div key={entry.id} className="flex items-start border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium">Mood Entry</p>
                      <span className="text-sm text-gray-500">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{entry.notes}</p>
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map(tag => (
                        <Badge key={tag} variant="gray" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;