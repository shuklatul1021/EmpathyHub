import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { mockUsers } from '../data/mockData';
import { 
  UserPlus, 
  Check, 
  X, 
  Clock,
  Users,
  MessageCircle
} from 'lucide-react';
import { BACKEND_URL } from '../config';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { UserRequest } from '../State/ComponetState';

interface ConnectionRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  matchScore?: number;
}

const mockConnectionRequests: ConnectionRequest[] = [
  {
    id: '1',
    fromUserId: '2',
    toUserId: '1',
    message: 'Hi! I noticed we have similar experiences with anxiety and meditation. Would love to connect and share our journeys.',
    status: 'pending',
    createdAt: new Date('2024-02-20T10:30:00'),
    matchScore: 92,
  },
  {
    id: '2',
    fromUserId: '3',
    toUserId: '1',
    message: 'I saw your post about work stress and burnout. I\'ve been through something similar and would like to offer support.',
    status: 'pending',
    createdAt: new Date('2024-02-19T15:45:00'),
    matchScore: 78,
  },
  {
    id: '3',
    fromUserId: '2',
    toUserId: '1',
    message: 'Your mindfulness journey resonates with me. Let\'s support each other!',
    status: 'accepted',
    createdAt: new Date('2024-02-18T09:15:00'),
    matchScore: 85,
  },
];

const ConnectionRequests: React.FC = () => {
  const [requests, setRequests] = useState<ConnectionRequest[]>(mockConnectionRequests);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
  const [isLoading, setIsLoading] = useState(true);

  const GetAllRequest = useRecoilValue(UserRequest);
  const SetAllRequestUser = useSetRecoilState(UserRequest)
  console.log(GetAllRequest);

  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => {
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'accepted' as const }
          : req
      )
    );
  };

  const handleReject = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'rejected' as const }
          : req
      )
    );
  };

    const filteredRequests = GetAllRequest.filter(req => 
    filter === 'all' || req.status === filter
  );


  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: ConnectionRequest['status']) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'accepted': return 'success';
      case 'rejected': return 'error';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: ConnectionRequest['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'accepted': return <Check className="h-4 w-4" />;
      case 'rejected': return <X className="h-4 w-4" />;
      default: return null;
    }
  };
  const GetUserDetails = async()=>{
    try{
      const Res = await fetch(`${BACKEND_URL}/api/v1/user/allrequest`, {
        method : "GET",
        headers : {
          token : localStorage.getItem('token') || '',
          "Content-Type" : "application/json"
        }
      })
      const json = await Res.json();
      if(Res.ok){
        SetAllRequestUser(json.request);
        setIsLoading(false);
      }else{
        console.log("Error While Fecthing")
        setIsLoading(false);
      }
    }catch(e){
      console.log(e);
      alert("Internal Server Error")
    }
  }

  useState(()=>{
    GetUserDetails();
  },[])

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Filter Tabs Skeleton */}
        <div className="flex space-x-1 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>

        {/* Connection Requests Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-6 w-32 bg-gray-200 rounded"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-10 w-20 bg-gray-200 rounded"></div>
                    <div className="h-10 w-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Connection Requests</h1>
        <p className="mt-2 text-gray-600">
          Manage your incoming and outgoing connection requests
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6">
        {[
          { key: 'all', label: 'All', count: requests.length },
          { key: 'pending', label: 'Pending', count: GetAllRequest.filter(r => r.status === 'PENDING').length },
          { key: 'accepted', label: 'Accepted', count: GetAllRequest.filter(r => r.status === 'ACCEPTED').length },
          { key: 'rejected', label: 'Rejected', count: GetAllRequest.filter(r => r.status === 'REJECTED').length },
        ].map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setFilter(key as any)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${filter === key 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Connection Requests */}
      <div className="space-y-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request, index) => {
            return (
              <Card key={request.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start gap-4">
                  <Avatar 
                    src={request.avatar} 
                    alt={request.firstname}
                    size="lg" 
                    status="online" 
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{request.sender.firstname} {request.sender.latname}</h3>
                        {request.matchScore && (
                          <Badge variant="primary" className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            <span>{request.matchScore}% Match</span>
                          </Badge>
                        )}
                      </div>
                      <Badge 
                        variant={getStatusColor(request.status)}
                        className="flex items-center gap-1"
                      >
                        {getStatusIcon(request.status)}
                        <span className="capitalize">{request.status}</span>
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-3">
                      {formatDate(request.createdAt)}
                    </p>
                    
                    <p className="text-gray-700 mb-4">{request.message}</p>
                    
                    {request.sender.tags && request.sender.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {request.sender.tags.flatMap((e) => {
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
                    
                    {(request.status) === 'PENDING' && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleAccept(request.id)}
                          leftIcon={<Check className="h-4 w-4" />}
                          variant="primary"
                          size="sm"
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={() => handleReject(request.id)}
                          leftIcon={<X className="h-4 w-4" />}
                          variant="outline"
                          size="sm"
                        >
                          Decline
                        </Button>
                        <Button
                          leftIcon={<MessageCircle className="h-4 w-4" />}
                          variant="ghost"
                          size="sm"
                        >
                          Message
                        </Button>
                      </div>
                    )}
                    
                    {request.status === 'ACCEPTED' && (
                      <div className="flex gap-2">
                        <Button
                          leftIcon={<MessageCircle className="h-4 w-4" />}
                          variant="primary"
                          size="sm"
                        >
                          Start Conversation
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <Card className="animate-fade-in py-8 text-center">
            <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No connection requests</h3>
            <p className="text-gray-500">
              {filter === 'pending' 
                ? "You don't have any pending connection requests."
                : `No ${filter} connection requests found.`}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ConnectionRequests;