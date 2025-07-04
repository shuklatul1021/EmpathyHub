import React, { useState } from 'react';
import Card from './ui/Card';
import Avatar from './ui/Avatar';
import Badge from './ui/Badge';
import { Heart, MessageCircle, Clock } from 'lucide-react';

interface Tag{
  name : string;
}
interface Post{
  title : string;
  content : string;
  createdAt : Date;
}
interface Auther{
  firstname : string;
  latname : string;
  avatar : string;
}

interface ForumPostProps {
  post: Post;
  author: Auther;
  tags : Tag[]
  onLike?: () => void;
  onComment?: () => void;
}

const ForumPost: React.FC<ForumPostProps> = ({
  post,
  author,
  tags,
  onLike,
  onComment,
}) => {
  const [liked, setLiked] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleLike = () => {
    setLiked(!liked);
    if (onLike) onLike();
  };

  return (
    <Card className="animate-fade-in cursor-pointer hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <Avatar src={author.avatar} alt={author.firstname} status="online" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1 hover:text-primary transition-colors">{post.title}</h3>
          
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <span className="font-medium">{author.firstname} {author.latname}</span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {formatDate(post.createdAt)}
            </span>
          </div>
          
          <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
          
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag, index) => {
            const parsedTags = JSON.parse(tag.name);
            return parsedTags.map((t, i) => (
              <Badge key={`${index}-${i}`} variant="gray" size="sm">
                {t}
              </Badge>
            ));
          })}
        </div>
                  
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex space-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
                className={`flex items-center text-sm transition-colors ${
                  liked ? 'text-accent font-medium' : 'text-gray-500 hover:text-accent'
                }`}
              >
                <Heart className={`h-4 w-4 mr-1 ${liked ? 'fill-accent' : ''}`} />
                {/* <span>{liked ? post.likes + 1 : post.likes}</span> */}
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onComment) onComment();
                }}
                className="flex items-center text-sm text-gray-500 hover:text-primary transition-colors"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                <span>{post.comments.length} Comments</span>
              </button>
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (onComment) onComment();
              }}
              className="text-sm font-medium text-primary hover:text-primary-dark hover:underline transition-colors"
            >
              Join Discussion →
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ForumPost;