import React, { useState } from 'react';
import ResourceCard from '../components/ResourceCard';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { mockResources } from '../data/mockData';
import { Search, Filter, BookOpen, Film, Dumbbell, PenTool as Tool } from 'lucide-react';

type ResourceType = 'article' | 'video' | 'exercise' | 'tool';

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<ResourceType[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Collect all unique tags from resources
  const allTags = Array.from(
    new Set(mockResources.flatMap(resource => resource.tags))
  );
  
  // Resource types with icons
  const resourceTypes: { type: ResourceType; label: string; icon: React.ReactNode }[] = [
    { type: 'article', label: 'Articles', icon: <BookOpen className="h-4 w-4" /> },
    { type: 'video', label: 'Videos', icon: <Film className="h-4 w-4" /> },
    { type: 'exercise', label: 'Exercises', icon: <Dumbbell className="h-4 w-4" /> },
    { type: 'tool', label: 'Tools', icon: <Tool className="h-4 w-4" /> }
  ];
  
  // Filter resources based on search term, selected types, and selected tags
  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = 
      searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = 
      selectedTypes.length === 0 || 
      selectedTypes.includes(resource.type);
    
    const matchesTags = 
      selectedTags.length === 0 || 
      selectedTags.some(tag => resource.tags.includes(tag));
    
    return matchesSearch && matchesType && matchesTags;
  });
  
  const toggleType = (type: ResourceType) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mental Health Resources</h1>
        <p className="mt-2 text-gray-600">
          Discover articles, tools, and exercises to support your mental wellbeing
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
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
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:border-primary focus:ring-primary"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Resource Type</h3>
              <div className="space-y-2">
                {resourceTypes.map(({ type, label, icon }) => (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className={`
                      flex items-center w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors
                      ${selectedTypes.includes(type) 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-gray-700 hover:bg-gray-100'}
                    `}
                  >
                    <span className="mr-2">{icon}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`
                      rounded-full px-2.5 py-1 text-xs font-medium transition-colors
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
        </div>
        
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource, index) => (
                <div key={resource.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ResourceCard resource={resource} />
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <Card className="animate-fade-in py-8 text-center">
                  <p className="text-gray-500">No resources found. Try adjusting your filters.</p>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;