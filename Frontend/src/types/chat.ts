export interface ChatMessage {
  type: 'message';
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
}

export interface WebSocketMessage {
  type: 'message' | 'userList' | 'friendList';
  senderId?: string;
  senderName?: string;
  content?: string;
  timestamp?: string;
  users?: Array<{ userId: string; username: string }>;
  friends?: string[];
  recipientId?: string;
} 