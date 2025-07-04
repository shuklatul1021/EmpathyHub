import React, { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import Card from '../components/ui/Card';
import { Search, Users as UsersIcon } from 'lucide-react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AllUser } from '../State/ComponetState';
import { BACKEND_URL } from '../config';

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const allUser = useRecoilValue(AllUser);
  const SetallUser = useSetRecoilState(AllUser);
  const [newisLoading , setnewisLoading ] = useState(true);
  
  const getAllUser = async()=>{
    const Res = await fetch(`${BACKEND_URL}/api/v1/user/alluser`, {
      method : "GET",
      headers : {
        token : localStorage.getItem('token') || '',
        "Content-Type" : "application/type"
      }
    })
    const json = await Res.json();
    if(Res.ok){
      setnewisLoading(false);
      SetallUser(json.users)
    }else(
      alert("Error While Fething")
    )
  }

  useEffect(()=>{
    getAllUser();
  },[])

  if (newisLoading) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="mb-6">
          <Card className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded"></div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-16 bg-gray-200 rounded mb-3"></div>
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-6 w-16 bg-gray-200 rounded-full"></div>
                    ))}
                  </div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Community Members</h1>
        <p className="mt-2 text-gray-600">
          Connect with other members of our supportive community
        </p>
      </div>

      <div className="mb-6">
        <Card className="animate-fade-in">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:border-primary focus:ring-primary"
            />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {allUser.length > 0 ? (
          allUser.map((user, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <UserCard 
                user={user}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <Card className="animate-fade-in py-8 text-center">
              <p className="text-gray-500">No users found. Try adjusting your search.</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;