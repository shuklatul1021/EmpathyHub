import { User, MoodEntry, MessageThread, Resource, ForumPost, ForumComment, Badge } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Recovering from anxiety, passionate about helping others with similar experiences.',
    tags: ['anxiety', 'meditation', 'art-therapy'],
    privacySettings: {
      showEmail: false,
      showActivity: true,
      allowDirectMessages: true,
      shareJournals: false,
    },
    supportScore: 87,
    badges: [
      {
        id: 'b1',
        name: 'Compassionate Listener',
        description: 'Provided support to 10+ people',
        icon: 'heart-handshake',
        dateEarned: new Date('2023-06-15'),
      },
      {
        id: 'b2',
        name: 'Consistent Support',
        description: 'Maintained a 30-day login streak',
        icon: 'calendar-check',
        dateEarned: new Date('2023-07-20'),
      },
    ],
  },
  {
    id: '2',
    name: 'Maya Patel',
    email: 'maya@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Depression survivor helping others find light in dark times.',
    tags: ['depression', 'mindfulness', 'peer-support'],
    privacySettings: {
      showEmail: false,
      showActivity: true,
      allowDirectMessages: true,
      shareJournals: true,
    },
    supportScore: 92,
    badges: [
      {
        id: 'b3',
        name: 'Empathy Expert',
        description: 'Received 20+ gratitude notes',
        icon: 'award',
        dateEarned: new Date('2023-05-10'),
      },
    ],
  },
  {
    id: '3',
    name: 'Jordan Lee',
    email: 'jordan@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Dealing with work stress and burnout. Finding balance through mindfulness.',
    tags: ['stress', 'burnout', 'work-life-balance'],
    privacySettings: {
      showEmail: false,
      showActivity: false,
      allowDirectMessages: true,
      shareJournals: false,
    },
    supportScore: 65,
    badges: [
      {
        id: 'b4',
        name: 'Newcomer',
        description: 'Completed profile and community guidelines',
        icon: 'user-check',
        dateEarned: new Date('2023-09-05'),
      },
    ],
  },
  {
    id: '4',
    name: 'Sam Chen',
    email: 'sam@example.com',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Mental health advocate and mindfulness practitioner.',
    tags: ['mindfulness', 'advocacy', 'wellness'],
    privacySettings: {
      showEmail: false,
      showActivity: true,
      allowDirectMessages: true,
      shareJournals: true,
    },
    supportScore: 95,
    badges: [
      {
        id: 'b5',
        name: 'Community Leader',
        description: 'Led 5+ support groups',
        icon: 'users',
        dateEarned: new Date('2023-08-12'),
      },
    ],
  },
];

// Mock Mood Entries
export const mockMoodEntries: MoodEntry[] = [
  {
    id: 'm1',
    userId: '1',
    mood: 'good',
    notes: 'Meditation helped reduce my anxiety today. Feeling more centered.',
    timestamp: new Date('2023-09-20T09:30:00'),
    tags: ['meditation', 'progress'],
  },
  {
    id: 'm2',
    userId: '1',
    mood: 'neutral',
    notes: 'Average day. Had some stress at work but managed to use breathing techniques.',
    timestamp: new Date('2023-09-19T18:45:00'),
    tags: ['work-stress', 'coping'],
  },
  {
    id: 'm3',
    userId: '1',
    mood: 'bad',
    notes: 'Difficult day with anxiety. Feeling overwhelmed by work deadlines.',
    timestamp: new Date('2023-09-18T22:15:00'),
    tags: ['anxiety', 'work-stress'],
  },
];

// Mock Message Threads
export const mockMessageThreads: MessageThread[] = [
  {
    id: 't1',
    participants: ['1', '2'],
    messages: [
      {
        id: 'msg1',
        threadId: 't1',
        senderId: '2',
        content: 'Hi Alex, I noticed you\'ve been making progress with meditation. Would you be open to sharing some tips that helped you?',
        timestamp: new Date('2023-09-20T14:30:00'),
        isRead: true,
      },
      {
        id: 'msg2',
        threadId: 't1',
        senderId: '1',
        content: 'Hey Maya! Absolutely. Starting with just 5 minutes a day and using guided meditations really helped me build the habit. Happy to share specific resources that worked for me.',
        timestamp: new Date('2023-09-20T14:45:00'),
        isRead: true,
      },
      {
        id: 'msg3',
        threadId: 't1',
        senderId: '2',
        content: 'That would be really helpful. I\'ve been struggling to make it a consistent practice. Thank you!',
        timestamp: new Date('2023-09-20T15:00:00'),
        isRead: true,
      },
    ],
    createdAt: new Date('2023-09-20T14:30:00'),
    updatedAt: new Date('2023-09-20T15:00:00'),
  },
];

// Mock Resources
export const mockResources: Resource[] = [
  {
    id: 'r1',
    title: 'Understanding Anxiety: A Comprehensive Guide',
    description: 'Learn about the different types of anxiety disorders, symptoms, and evidence-based coping strategies.',
    category: 'Mental Health Education',
    tags: ['anxiety', 'education', 'coping-strategies'],
    url: '/resources/understanding-anxiety',
    imageUrl: 'https://images.pexels.com/photos/3755755/pexels-photo-3755755.jpeg?auto=compress&cs=tinysrgb&w=350',
    type: 'article',
  },
  {
    id: 'r2',
    title: '5-Minute Guided Meditation for Stress Relief',
    description: 'A quick guided meditation practice that can help reduce stress and anxiety in just 5 minutes.',
    category: 'Mindfulness',
    tags: ['meditation', 'stress', 'quick-exercise'],
    url: '/resources/quick-meditation',
    imageUrl: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=350',
    type: 'exercise',
  },
  {
    id: 'r3',
    title: 'Building a Supportive Mental Health Routine',
    description: 'Practical tips for creating daily habits that support your mental wellbeing.',
    category: 'Self-Care',
    tags: ['routine', 'self-care', 'habits'],
    url: '/resources/mental-health-routine',
    imageUrl: 'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=350',
    type: 'article',
  },
  {
    id: 'r4',
    title: 'Interactive Mood Tracker Tool',
    description: 'An interactive tool to help you identify patterns in your mood and emotional triggers.',
    category: 'Tools',
    tags: ['mood-tracking', 'self-awareness', 'patterns'],
    url: '/resources/mood-tracker',
    imageUrl: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=350',
    type: 'tool',
  },
];

// Mock Forum Posts
export const mockForumPosts: ForumPost[] = [
  {
    id: 'p1',
    authorId: '2',
    title: 'How do you manage anxiety in social situations?',
    content: 'I\'ve been struggling with social anxiety lately, especially in group settings. What techniques have worked for you when dealing with social anxiety? I find myself avoiding social events and it\'s starting to affect my relationships.',
    tags: ['anxiety', 'social-situations', 'coping'],
    likes: 15,
    commentCount: 8,
    createdAt: new Date('2023-09-15T10:30:00'),
    updatedAt: new Date('2023-09-20T09:15:00'),
  },
  {
    id: 'p2',
    authorId: '3',
    title: 'Burnout recovery strategies that actually worked',
    content: 'After experiencing severe burnout last year, I\'ve been slowly recovering. I wanted to share some strategies that have genuinely helped me and see what\'s worked for others. Setting boundaries was huge for me, along with rediscovering hobbies I had abandoned.',
    tags: ['burnout', 'recovery', 'work-stress'],
    likes: 28,
    commentCount: 12,
    createdAt: new Date('2023-09-10T16:45:00'),
    updatedAt: new Date('2023-09-19T13:20:00'),
  },
  {
    id: 'p3',
    authorId: '4',
    title: 'The power of mindfulness in daily life',
    content: 'I\'ve been practicing mindfulness for about 6 months now, and the changes have been remarkable. It\'s not just about meditation - it\'s about being present in everyday moments. Would love to hear about others\' experiences with mindfulness practices.',
    tags: ['mindfulness', 'meditation', 'daily-practice'],
    likes: 22,
    commentCount: 15,
    createdAt: new Date('2023-09-12T14:20:00'),
    updatedAt: new Date('2023-09-18T11:30:00'),
  },
];

// Mock Forum Comments
export const mockForumComments: ForumComment[] = [
  {
    id: 'c1',
    postId: 'p1',
    authorId: '1',
    content: 'I completely understand this struggle. What helped me was starting small - maybe just staying for 30 minutes at social events and gradually increasing the time. Also, having a trusted friend who knows about your anxiety can be really helpful.',
    likes: 5,
    createdAt: new Date('2023-09-15T11:15:00'),
    updatedAt: new Date('2023-09-15T11:15:00'),
  },
  {
    id: 'c2',
    postId: 'p1',
    authorId: '4',
    content: 'Breathing exercises before and during social situations have been a game-changer for me. The 4-7-8 technique specifically - breathe in for 4, hold for 7, exhale for 8. It helps calm the nervous system.',
    likes: 8,
    createdAt: new Date('2023-09-15T12:30:00'),
    updatedAt: new Date('2023-09-15T12:30:00'),
  },
  {
    id: 'c3',
    postId: 'p2',
    authorId: '2',
    content: 'Thank you for sharing this. I\'m currently dealing with burnout and your point about boundaries really resonates. How did you start implementing boundaries at work without feeling guilty?',
    likes: 3,
    createdAt: new Date('2023-09-11T09:20:00'),
    updatedAt: new Date('2023-09-11T09:20:00'),
  },
  {
    id: 'c4',
    postId: 'p3',
    authorId: '1',
    content: 'Mindfulness has been transformative for my anxiety too. I love how you mentioned it\'s not just about formal meditation - those mindful moments throughout the day are so powerful.',
    likes: 6,
    createdAt: new Date('2023-09-12T15:45:00'),
    updatedAt: new Date('2023-09-12T15:45:00'),
  },
  {
    id: 'c5',
    postId: 'p3',
    authorId: '2',
    content: 'I\'ve been wanting to start a mindfulness practice but don\'t know where to begin. Any recommendations for beginners?',
    likes: 4,
    createdAt: new Date('2023-09-13T10:10:00'),
    updatedAt: new Date('2023-09-13T10:10:00'),
  },
];