import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { 
  Calendar,
  Edit3,
  Lock,
  Eye,
  Trash2,
  Plus,
  Search
} from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: Date;
  mood: string;
  tags: string[];
  isPrivate: boolean;
}

const mockEntries: JournalEntry[] = [
  {
    id: '1',
    title: 'Finding Peace in Meditation',
    content: 'Today I tried a new meditation technique that really helped with my anxiety...',
    date: new Date('2024-02-20'),
    mood: 'calm',
    tags: ['meditation', 'anxiety', 'self-care'],
    isPrivate: true,
  },
  {
    id: '2',
    title: 'Breakthrough in Therapy',
    content: 'Had a really productive therapy session today. We discussed...',
    date: new Date('2024-02-18'),
    mood: 'hopeful',
    tags: ['therapy', 'progress', 'reflection'],
    isPrivate: true,
  },
];

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags
  const allTags = Array.from(
    new Set(entries.flatMap(entry => entry.tags))
  );

  // Filter entries based on search and tags
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = 
      searchTerm === '' || 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = 
      selectedTags.length === 0 || 
      selectedTags.some(tag => entry.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Journal</h1>
        <p className="mt-2 text-gray-600">
          Document your journey and track your progress
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* New Entry Button */}
        <Button
          size="lg"
          leftIcon={<Plus className="h-5 w-5" />}
          className="w-full sm:w-auto"
        >
          New Journal Entry
        </Button>

        {/* Search and Filters */}
        <Card className="animate-fade-in">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search journal entries..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:border-primary focus:ring-primary"
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by tags</h3>
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
          </div>
        </Card>

        {/* Journal Entries */}
        {filteredEntries.map(entry => (
          <Card key={entry.id} className="animate-fade-in">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-1">{entry.title}</h2>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(entry.date)}
                  {entry.isPrivate && (
                    <span className="flex items-center ml-3">
                      <Lock className="h-4 w-4 mr-1" />
                      Private
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-primary rounded-lg hover:bg-gray-100">
                  <Edit3 className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-error rounded-lg hover:bg-gray-100">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{entry.content}</p>

            <div className="flex flex-wrap gap-2">
              {entry.tags.map(tag => (
                <Badge key={tag} variant="gray" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Journal;