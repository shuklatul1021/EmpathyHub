import { WebSocket, WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prismaclient = new PrismaClient();

const JWT_SECRET = 'AtulShuklaTest1021@new';
const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  userId: string;
}

interface MessagePayload {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

const users: User[] = [];
const messageQueue: MessagePayload[] = [];

const verifyUserId = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'string' || !decoded || !('id' in decoded)) return null;
    return decoded.id as string;
  } catch (err) {
    console.error('JWT verification failed:', err);
    return null;
  }
};

wss.on('connection', (ws, request) => {
  const url = request.url;
  if (!url) return;

  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token');

  if (!token) {
    ws.close();
    return;
  }

  const userId = verifyUserId(token);
  if (!userId) {
    ws.close();
    return;
  }

  const user: User = { ws, userId };
  users.push(user);
  console.log(`User ${userId} connected.`);

  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data.toString());

      if (!message.content || !message.receiverId) return;

      const payload: MessagePayload = {
        senderId: userId,
        receiverId: message.receiverId,
        content: message.content,
        timestamp: new Date().toISOString(),
      };

      // Add to queue
      messageQueue.push(payload);

      // Send to receiver in real-time
      users.forEach((u) => {
        if (u.userId === message.receiverId) {
          u.ws.send(JSON.stringify(payload));
        }
      });

      // Persist message in DB after sending
      const thread = await findOrCreateThread(userId, message.receiverId);

      await prismaclient.message.create({
        data: {
          content: payload.content,
          senderId: payload.senderId,
          threadId: thread.id,
        },
      });

      // Remove from queue after successful DB insert
      const index = messageQueue.findIndex(
        (msg) =>
          msg.senderId === payload.senderId &&
          msg.receiverId === payload.receiverId &&
          msg.timestamp === payload.timestamp
      );
      if (index !== -1) {
        messageQueue.splice(index, 1);
      }
    } catch (err) {
      console.error('Message handling/storage error:', err);
    }
  });

  ws.on('close', () => {
    const index = users.findIndex((u) => u.ws === ws);
    if (index !== -1) users.splice(index, 1);
    console.log(`User ${userId} disconnected.`);
  });
});

// Helper: Find or create a thread
async function findOrCreateThread(user1Id: string, user2Id: string) {
  let thread = await prismaclient.messageThread.findFirst({
    where: {
      participants: {
        every: {
          id: { in: [user1Id, user2Id] },
        },
      },
    },
  });

  if (!thread) {
    thread = await prismaclient.messageThread.create({
      data: {
        participants: {
          connect: [
            { id: user1Id },
            { id: user2Id },
          ],
        },
      },
    });
  }

  return thread;
}

console.log('WebSocket server started on ws://localhost:8080');
