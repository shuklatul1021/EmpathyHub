import React, { useEffect, useState } from 'react';
import { ForumPost as ForumPostType, User, ForumComment } from '../types';
import Avatar from './ui/Avatar';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { 
  X, 
  Heart, 
  MessageCircle, 
  Clock, 
  Send,
  ThumbsUp,
  Reply
} from 'lucide-react';
import { BACKEND_URL } from '../config';

interface Tag{
  name : string,
}
interface Post{
  id : string,
  title : string,
  content : string,
  createdAt : Date,
}
interface Auther{
  firstname : string,
  latname : string,
  avatar : string,
}
interface Comment{
  content : string,
  createdAt : string,
  authorId : string
}

interface PostDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
  author: Auther;
  tag : Tag[]
  comments: Comment[];
  commentAuthors: User[];
  onLike: () => void;
  onComment: (content: string, parentId?: string) => void;
  onLikeComment: (commentId: string) => void;
}



const PostDetailModal: React.FC<PostDetailModalProps> = ({
  isOpen,
  onClose,
  post,
  author,
  tag,
  comments,
  commentAuthors,
  onLike,
  onComment,
  onLikeComment,
}) => {
  const [newComment, setNewComment] = useState('');
  const [allcomments , setallcomments ] = useState([]);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const handleLike = () => {
    setLiked(!liked);
    onLike();
  };

  const handleCommentLike = (commentId: string) => {
    const newLikedComments = new Set(likedComments);
    if (newLikedComments.has(commentId)) {
      newLikedComments.delete(commentId);
    } else {
      newLikedComments.add(commentId);
    }
    setLikedComments(newLikedComments);
    onLikeComment(commentId);
  };

   const getPostComment = async()=>{
    const Res = await fetch(`${BACKEND_URL}/api/v1/community/getpostcomment/${post.id}` , {
      method : "GET",
      headers : {
        token : localStorage.getItem('token') || ''
      }
    })
    const JSON = await Res.json();
    if(Res.ok){
      setallcomments(JSON.comments)
    }else{
      alert("Error")
    }
  }

  useEffect(()=>{
    getPostComment();
  },[])

  const handleSubmitComment = async() => {
    if (newComment.trim()) {
      onComment(newComment.trim(), replyTo || undefined);
      setNewComment('');
      setReplyTo(null);
      
    }
    const Res = await fetch(`${BACKEND_URL}/api/v1/community/communitypostcomment/${post.id}`, {
      method : "POST",
      headers : {
        token : localStorage.getItem('token') || '',
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        content : newComment
      })
    })
    if(Res.ok){
      alert("Commented Succsessfully")
    }else{
      alert("Error While Posting Comment")
    }
  };

  const getCommentAuthor = (authorId: string) => {
    return commentAuthors.find(user => user.id === authorId) || commentAuthors[0];
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Discussion</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            {/* Post Content */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start space-x-4">
                <Avatar src={author.avatar} alt={author.firstname} status="online" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="font-medium">{author.firstname} {author.latname}</span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tag.map((tag, index) => {
                      const parsedTags = JSON.parse(tag.name);
                      return parsedTags.map((t, i) => (
                        <Badge key={`${index}-${i}`} variant="gray" size="sm">
                          {t}
                        </Badge>
                      ));
                    })}
                  </div>
      
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleLike}
                      className={`flex items-center text-sm ${
                        liked ? 'text-accent font-medium' : 'text-gray-500 hover:text-accent'
                      }`}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${liked ? 'fill-accent' : ''}`} />
                      {/* <span>{liked ? post.likes + 1 : post.likes}</span> */}
                    </button>
                    
                    <span className="flex items-center text-sm text-gray-500">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span>{comments.length} Comments</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="p-6">
              <h4 className="text-lg font-semibold mb-4">
                Comments {comments.length}
              </h4>

              {/* Comment Input */}
              <div className="mb-6">
                {replyTo && (
                  <div className="mb-2 p-2 bg-gray-50 rounded-lg text-sm">
                    <span className="text-gray-600">Replying to comment</span>
                    <button
                      onClick={() => setReplyTo(null)}
                      className="ml-2 text-primary hover:text-primary-dark"
                    >
                      Cancel
                    </button>
                  </div>
                )}
                <div className="flex gap-3">
                  <Avatar src={author.avatar} alt={author.firstname} size="sm" />
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                    />
                    <div className="flex justify-end mt-2">
                      <Button
                        onClick={handleSubmitComment}
                        disabled={!newComment.trim()}
                        size="sm"
                        leftIcon={<Send className="h-4 w-4" />}
                      >
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {allcomments ? (
                  allcomments.map((comment) => {
                    const isLiked = likedComments.has(comment.id);
                    
                    return (
                      <div key={comment.id} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                        <Avatar src={comment.author.avatar} alt={comment.author.firstname} size="sm" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{comment.author.firstname} {comment.author.latname}</span>
                            <span className="text-xs text-gray-500">
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm mb-2">{comment.content}</p>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => handleCommentLike(comment.id)}
                              className={`flex items-center text-xs ${
                                isLiked ? 'text-accent font-medium' : 'text-gray-500 hover:text-accent'
                              }`}
                            >
                              <ThumbsUp className={`h-3 w-3 mr-1 ${isLiked ? 'fill-accent' : ''}`} />
                              <span>{isLiked ? comment.likes + 1 : comment.likes}</span>
                            </button>
                            <button
                              onClick={() => setReplyTo(comment.id)}
                              className="flex items-center text-xs text-gray-500 hover:text-primary"
                            >
                              <Reply className="h-3 w-3 mr-1" />
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p>No comments yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;