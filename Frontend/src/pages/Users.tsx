import React, { useState } from 'react';
import UserCard from '../components/UserCard';
import Card from '../components/ui/Card';
import { mockUsers } from '../data/mockData';
import { Search, Users as UsersIcon } from 'lucide-react';

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = mockUsers.filter(user => 
    searchTerm === '' || 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div key={user.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <UserCard 
                user={user}
                onConnect={() => {}}
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