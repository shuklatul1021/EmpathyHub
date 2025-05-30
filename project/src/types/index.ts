export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  tags: string[];
  privacySettings: PrivacySettings;
  supportScore: number;
  badges: Badge[];
};

export type PrivacySettings = {
  showEmail: boolean;
  showActivity: boolean;
  allowDirectMessages: boolean;
  shareJournals: boolean;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  dateEarned: Date;
};

export type MoodEntry = {
  id: string;
  userId: string;
  mood: 'veryBad' | 'bad' | 'neutral' | 'good' | 'veryGood';
  notes: string;
  timestamp: Date;
  tags: string[];
};

export type MessageThread = {
  id: string;
  participants: string[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
};

export type Message = {
  id: string;
  threadId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
  imageUrl: string;
  type: 'article' | 'video' | 'exercise' | 'tool';
};

export type ForumPost = {
  id: string;
  authorId: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ForumComment = {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
};