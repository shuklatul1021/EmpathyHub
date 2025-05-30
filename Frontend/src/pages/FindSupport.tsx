import React, { useState } from 'react';
import UserCard from '../components/UserCard';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { mockUsers } from '../data/mockData';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Users 
} from 'lucide-react';

const FindSupport: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Collect all unique tags from users
  const allTags = Array.from(
    new Set(mockUsers.flatMap(user => user.tags))
  );
  
  // Filter users based on search term and selected tags
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = 
      selectedTags.length === 0 || 
      selectedTags.some(tag => user.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  // Other users (excluding the first one which we use as current user)
  const supportUsers = filteredUsers.slice(1);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Find Peer Support</h1>
        <p className="mt-2 text-gray-600">
          Connect with others who understand what you're going through
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card className="animate-fade-in">
            <h2 className="flex items-center text-lg font-semibold mb-4">
              <Filter className="mr-2 h-5 w-5 text-gray-500" />
              Filters
            </h2>
            
            <div className="mb-4">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name or description"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:border-primary focus:ring-primary"
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by experience</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`
                      rounded-full px-3 py-1 text-sm font-medium transition-colors
                      ${selectedTags.includes(tag) 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                    `}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </Card>
          
          <Card className="animate-fade-in">
            <h2 className="flex items-center text-lg font-semibold mb-3">
              <Users className="mr-2 h-5 w-5 text-primary" />
              AI Matching
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Our AI can find the perfect peer support match based on your experiences and needs
            </p>
            <Button 
              leftIcon={<UserPlus className="h-4 w-4" />}
              fullWidth
            >
              Find My Best Match
            </Button>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {supportUsers.length > 0 ? (
              supportUsers.map((user, index) => (
                <div key={user.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <UserCard 
                    user={user} 
                    isMatch={index === 0} 
                    matchScore={index === 0 ? 92 : undefined}
                    onConnect={() => {}} 
                  />
                </div>
              ))
            ) : (
              <Card className="animate-fade-in py-8 text-center">
                <p className="text-gray-500">No matches found. Try adjusting your filters.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindSupport;