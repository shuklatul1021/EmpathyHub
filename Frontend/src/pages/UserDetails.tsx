import React from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import { mockUsers, mockMoodEntries } from '../data/mockData';
import { Award, Calendar, MessageCircle, Heart, TrendingUp } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { UserDetails } from '../State/ComponetState';

const UserDetail: React.FC = () => {
  const { id } = useParams();
  const user = mockUsers.find(u => u.id === id) || mockUsers[0];
  const userMoodEntries = mockMoodEntries.filter(entry => entry.userId === user.id);
  const Userdetails = useRecoilValue(UserDetails)
  const Usertag = JSON.parse(Userdetails.tags[0].name);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <div className="md:col-span-1">
          <Card className="animate-fade-in">
            <div className="text-center">
              <Avatar 
                src={Userdetails.avatar} 
                alt={Userdetails.username}
                size="xl" 
                status="online"
                className="mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold mb-2">{Userdetails.firstname} {Userdetails.latname} </h1>
              <p className="text-gray-600 mb-4">{Userdetails.bio}</p>
              
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {Usertag.map((tag , index ) => (
                  <Badge key={index} variant="primary" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              
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