import React, { useState } from 'react';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { X, Plus, Hash } from 'lucide-react';
import { BACKEND_URL } from '../config';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: { title: string; content: string; tags: string[] }) => void;
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const suggestedTags = [
    'anxiety', 'depression', 'stress', 'meditation', 'therapy',
    'self-care', 'mindfulness', 'support', 'recovery', 'wellness'
  ];

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log(tags);
    const bodyRes = await fetch(`${BACKEND_URL}/api/v1/community/addcommunitypost` , {
      method : "POST",
      headers : {
        token  : localStorage.getItem('token') || '',
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        title : title,
        content : content,
        tags : JSON.stringify(tags.map(e => e))
      })
    })
    if(bodyRes.ok){
      alert("Post POsted");
    }else{
      alert("Error While Posting")
    }
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setNewTag('');
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      addTag(newTag.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Create New Post</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts, experiences, or ask for support..."
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              
              {/* Selected Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map(tag => (
                    <Badge
                      key={tag}
                      variant="primary"
                      className="flex items-center gap-1 cursor-pointer hover:bg-primary/80 transition-colors"
                      onClick={() => removeTag(tag)}
                    >
                      {tag}
                      <X className="h-3 w-3 hover:bg-primary-dark rounded-full" />
                    </Badge>
                  ))}
                </div>
              )}

              {/* Add New Tag */}
              <div className="flex gap-2 mb-3">
                <div className="relative flex-1">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a tag..."
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => addTag(newTag.trim())}
                  disabled={!newTag.trim() || tags.includes(newTag.trim())}
                  variant="outline"
                  leftIcon={<Plus className="h-4 w-4" />}
                >
                  Add
                </Button>
              </div>

              {/* Suggested Tags */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Suggested tags:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags
                    .filter(tag => !tags.includes(tag))
                    .map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => addTag(tag)}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={!title.trim() || !content.trim()}>
                Create Post
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostModal;