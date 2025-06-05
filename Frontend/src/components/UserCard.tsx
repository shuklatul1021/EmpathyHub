import React from 'react';
import { User } from '../types';
import Card from './ui/Card';
import Avatar from './ui/Avatar';
import Badge from './ui/Badge';
import { Award, Users } from 'lucide-react';
import { UserDetails } from '../State/ComponetState';
import { useRecoilValue } from 'recoil';

interface UserCardProps {
  user: User;
  isMatch?: boolean;
  matchScore?: number;
  onConnect?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  isMatch = false,
  matchScore,
  onConnect 
}) => {
  const Userdetails = useRecoilValue(UserDetails)
  const Usertag = JSON.parse(Userdetails.tags[0].name);
  return (
    <Card className={`
      ${isMatch ? 'border-2 border-primary/30' : ''}
      transition-all duration-300 hover:shadow-md
    `}>
      {isMatch && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
          AI Suggested Match
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <Avatar src={user.avatar} alt={user.name} size="lg" status="online" />
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold"><div>{user.firstname} {user.latname}</div></h3>
            {matchScore && (
              <Badge variant="primary" className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                <span>{matchScore}% Match</span>
              </Badge>
            )}
          </div>
          
          <p className="text-gray-600 mt-1 mb-3">{user.bio}</p>
          
          <div className="flex flex-wrap gap-1.5 mb-4">
            {Usertag.map((tag) => (
              <Badge key={tag} variant="gray" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
          
          {user && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                <Award className="h-4 w-4 text-primary" />
                <span>Badges</span>
              </h4>
              {/* <div className="flex flex-wrap gap-2">
                {user.badges.map((badge) => (
                  <Badge key={badge.id} variant="secondary" className="flex items-center gap-1">
                    {badge.name}
                  </Badge>
                ))}
              </div> */}
            </div>
          )}
          
          {onConnect && (
            <button 
              onClick={onConnect}
              className="mt-2 text-sm font-medium text-primary hover:text-primary-dark hover:underline"
            >
              Connect with {user.firstname} {user.latname} →
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UserCard;