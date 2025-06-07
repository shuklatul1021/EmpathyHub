import React, { useState } from 'react';
import ForumPost from '../components/ForumPost';
import PostModal from '../components/PostModal';
import PostDetailModal from '../components/PostDetailModal';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { mockForumPosts, mockUsers, mockForumComments } from '../data/mockData';
import { ForumPost as ForumPostType, ForumComment } from '../types';
import { Search, Filter, MessagesSquare, TrendingUp, Clock, Heart, Plus } from 'lucide-react';

type SortOption = 'trending' | 'recent' | 'popular';

const Community: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('trending');
  const [isLoading, setIsLoading] = useState(true);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPostType | null>(null);
  const [posts, setPosts] = useState<ForumPostType[]>(mockForumPosts);
  const [comments, setComments] = useState<ForumComment[]>(mockForumComments);
  
  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Collect all unique tags from forum posts
  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  );
  
  // Filter posts based on search term and selected tags
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = 
      selectedTags.length === 0 || 
      selectedTags.some(tag => post.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });
  
  // Sort posts based on sort option
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'trending') {
      // Sort by a combination of recency and popularity
      const aScore = a.likes * 2 + a.commentCount + (new Date(a.updatedAt).getTime() / 86400000);
      const bScore = b.likes * 2 + b.commentCount + (new Date(b.updatedAt).getTime() / 86400000);
      return bScore - aScore;
    } else if (sortBy === 'recent') {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    } else {
      // Popular - sort by likes
      return b.likes - a.likes;
    }
  });
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  // Find authors for each post
  const getAuthorForPost = (authorId: string) => {
    return mockUsers.find(user => user.id === authorId) || mockUsers[0];
  };

  // Handle creating new post
  const handleCreatePost = (postData: { title: string; content: string; tags: string[] }) => {
    const newPost: ForumPostType = {
      id: `p${Date.now()}`,
      authorId: mockUsers[0].id, // Current user
      title: postData.title,
      content: postData.content,
      tags: postData.tags,
      likes: 0,
      commentCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setPosts(prev => [newPost, ...prev]);
  };

  // Handle post detail view
  const handlePostClick = (post: ForumPostType) => {
    setSelectedPost(post);
    setIsDetailModalOpen(true);
  };

  // Handle adding comment
  const handleAddComment = (content: string, parentId?: string) => {
    if (!selectedPost) return;
    
    const newComment: ForumComment = {
      id: `c${Date.now()}`,
      postId: selectedPost.id,
      authorId: mockUsers[0].id, // Current user
      content,
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setComments(prev => [...prev, newComment]);
    
    // Update comment count on post
    setPosts(prev => prev.map(post => 
      post.id === selectedPost.id 
        ? { ...post, commentCount: post.commentCount + 1 }
        : post
    ));
  };

  // Get comments for selected post
  const getPostComments = (postId: string) => {
    return comments.filter(comment => comment.postId === postId);
  };

  const sortOptions: { value: SortOption; label: string; icon: React.ReactNode }[] = [
    { value: 'trending', label: 'Trending', icon: <TrendingUp className="h-4 w-4" /> },
    { value: 'recent', label: 'Recent', icon: <Clock className="h-4 w-4" /> },
    { value: 'popular', label: 'Popular', icon: <Heart className="h-4 w-4" /> },
  ];

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="md:col-span-1 space-y-6">
            <Card className="animate-pulse">
              <div className="h-6 w-24 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-2 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-6 w-16 bg-gray-200 rounded-full"></div>
                ))}
              </div>
            </Card>
            
            <Card className="animate-pulse">
              <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
              <div className="space-y-2 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </Card>
          </div>
          
          <div className="md:col-span-3 space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded mb-3"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                    </div>
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
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
        <p className="mt-2 text-gray-600">
          Connect with others, share experiences, and find support in our community
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
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:border-primary focus:ring-primary"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By</h3>
              <div className="space-y-2">
                {sortOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`
                      flex items-center w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors
                      ${sortBy === option.value 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-gray-700 hover:bg-gray-100'}
                    `}
                  >
                    <span className="mr-2">{option.icon}</span>
                    {option.label}
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
          
          <Card className="animate-fade-in">
            <h2 className="flex items-center text-lg font-semibold mb-3">
              <MessagesSquare className="mr-2 h-5 w-5 text-primary" />
              Community Guidelines
            </h2>
            <ul className="text-sm text-gray-600 space-y-2 mb-4">
              <li>• Be respectful and kind to others</li>
              <li>• Maintain privacy - don't share personal details</li>
              <li>• Offer support, not medical advice</li>
              <li>• Report harmful content to moderators</li>
              <li>• Focus on constructive, helpful discussions</li>
            </ul>
            <Button 
              leftIcon={<Plus className="h-4 w-4" />}
              fullWidth
              onClick={() => setIsPostModalOpen(true)}
            >
              Create New Post
            </Button>
          </Card>
        </div>
        
        <div className="md:col-span-3 space-y-6">
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post, index) => (
              <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ForumPost 
                  post={post}
                  author={getAuthorForPost(post.authorId)}
                  onLike={() => {
                    setPosts(prev => prev.map(p => 
                      p.id === post.id ? { ...p, likes: p.likes + 1 } : p
                    ));
                  }}
                  onComment={() => handlePostClick(post)}
                />
              </div>
            ))
          ) : (
            <Card className="animate-fade-in py-8 text-center">
              <p className="text-gray-500">No discussions found. Try adjusting your filters or create a new post!</p>
            </Card>
          )}
        </div>
      </div>

      {/* Post Creation Modal */}
      <PostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSubmit={handleCreatePost}
      />

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedPost(null);
          }}
          post={selectedPost}
          author={getAuthorForPost(selectedPost.authorId)}
          comments={getPostComments(selectedPost.id)}
          commentAuthors={mockUsers}
          onLike={() => {
            setPosts(prev => prev.map(p => 
              p.id === selectedPost.id ? { ...p, likes: p.likes + 1 } : p
            ));
          }}
          onComment={handleAddComment}
          onLikeComment={(commentId) => {
            setComments(prev => prev.map(c => 
              c.id === commentId ? { ...c, likes: c.likes + 1 } : c
            ));
          }}
        />
      )}
    </div>
  );
};

export default Community;