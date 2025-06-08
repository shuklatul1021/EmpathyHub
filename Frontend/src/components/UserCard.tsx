import React, { useEffect, useState } from 'react';
import { User } from '../types';
import Card from './ui/Card';
import Avatar from './ui/Avatar';
import Badge from './ui/Badge';
import { Award, Users } from 'lucide-react';
import { BACKEND_URL } from '../config';
import { Link } from 'react-router';

interface UserCardProps {
  user: User;
  isMatch?: boolean;
  matchScore?: number;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  isMatch = false,
  matchScore 
}) => {
  const [isSended ,  setisSended ] = useState("")
  const onConnect = async()=>{
    const URL = `${BACKEND_URL}/api/v1/user/sendconnectionrequest/${user.id}`
    console.log(URL);
    try{
      const Res = await fetch( URL, {
        method : "POST",
        headers : {
          token : localStorage.getItem('token') || '',
          "Content-Type" : "application/json"
        }
      })
      if(Res.ok){
        alert("Request Send");
      }else{
        alert("Error While Sending");
      }
    }catch(e){
      console.log(e);
      alert("Internal Server")
    }
  }
  const getStatus = async()=>{
    try{
      const Res = await fetch(`${BACKEND_URL}/api/v1/user/isconnected/${user.id}` , {
        method : "GET",
        headers : {
          token : localStorage.getItem('token') || '',
          "Content-Type" : "application/json"
        }
      });
      const json = await Res.json();
      if(Res.ok){
        if(json.message === "PENDING"){
          setisSended("Pending")
        }else if(json.message === "ACCEPTED"){
          setisSended("Message")
        }else if(json.message === "ReqenstNotSend"){
          setisSended(`Connect with ${user.firstname} ${user.latname} →`)
        }
      }else{
        console.log("error While getting Status")
      }
    }catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    getStatus();
  },[])

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
        <Link to={`/user/${user.id}`}><Avatar src={user.avatar} alt={user.name} size="lg" status="online" /></Link>
        
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
          
              {user.tags && user.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {user.tags.flatMap((e) => {
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
          
            <button 
              onClick={onConnect}
              className="mt-2 text-sm font-medium text-primary hover:text-primary-dark hover:underline"
            >
              {isSended}
            </button>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;