import { useState, useEffect, useCallback } from 'react';

interface WebSocketMessage {
  type: 'message' | 'userList';
  senderId?: string;
  senderName?: string;
  content?: string;
  timestamp?: string;
  users?: Array<{ userId: string; username: string }>;
}

interface UseWebSocketProps {
  userId: string;
  username: string;
  onMessage?: (message: WebSocketMessage) => void;
  onUserListUpdate?: (users: Array<{ userId: string; username: string }>) => void;
}

export const useWebSocket = ({
  userId,
  username,
  onMessage,
  onUserListUpdate,
}: UseWebSocketProps) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
      
      // Register user
      ws.send(JSON.stringify({
        type: 'register',
        userId,
        username,
      }));
    };

    ws.onmessage = (event) => {
      const message: WebSocketMessage = JSON.parse(event.data);
      
      if (message.type === 'userList' && onUserListUpdate) {
        onUserListUpdate(message.users || []);
      } else if (onMessage) {
        onMessage(message);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [userId, username, onMessage, onUserListUpdate]);

  const sendMessage = useCallback((content: string, recipientId?: string) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify({
        type: 'message',
        content,
        recipientId,
      }));
    }
  }, [socket, isConnected]);

  useEffect(() => {
    const cleanup = connect();
    return () => {
      cleanup();
    };
  }, [connect]);

  return {
    isConnected,
    sendMessage,
  };
}; 