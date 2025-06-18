"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware/middleware");
const import_1 = require("../config/import");
const MesagesRouter = (0, express_1.default)();
MesagesRouter.get("/getchatuser", middleware_1.UserAuth, async (req, res) => {
    try {
        const userId = req.userId;
        const connections = await import_1.prismaclient.connectionRequest.findMany({
            where: {
                OR: [
                    { senderId: userId, status: "ACCEPTED" },
                    { receiverId: userId, status: "ACCEPTED" },
                ],
            },
            include: {
                sender: true,
                receiver: true,
            },
        });
        const connectedUsers = connections.map((conn) => {
            if (conn.senderId === userId)
                return conn.receiver;
            else
                return conn.sender;
        });
        const uniqueUsers = Array.from(new Map(connectedUsers.map(user => [user.id, user])).values());
        res.status(200).json({
            users: uniqueUsers,
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
MesagesRouter.get('/:receiverId', middleware_1.UserAuth, async (req, res) => {
    const currentUserId = req.userId;
    const { receiverId } = req.params;
    try {
        // Step 1: Try to find a thread that includes BOTH participants
        let thread = await import_1.prismaclient.messageThread.findFirst({
            where: {
                participants: {
                    some: { id: currentUserId },
                },
                AND: {
                    participants: {
                        some: { id: receiverId },
                    },
                },
            },
        });
        // Step 2: If not found, create a new thread
        if (!thread) {
            thread = await import_1.prismaclient.messageThread.create({
                data: {
                    participants: {
                        connect: [
                            { id: currentUserId },
                            { id: receiverId },
                        ],
                    },
                },
            });
        }
        // Step 3: Fetch all messages in this thread (if any)
        const messages = await import_1.prismaclient.message.findMany({
            where: {
                threadId: thread.id,
            },
            orderBy: {
                timestamp: 'asc',
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        firstname: true,
                        latname: true,
                        email: true,
                    },
                },
            },
        });
        res.status(200).json({ messages, threadId: thread.id });
    }
    catch (err) {
        console.error('Error getting/creating thread:', err);
        res.status(500).json({ message: 'Server error while retrieving messages' });
    }
});
exports.default = MesagesRouter;
