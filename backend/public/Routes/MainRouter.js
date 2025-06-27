"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware/middleware");
const import_1 = require("../config/import");
const cloudinary_1 = require("cloudinary");
const MainRouter = (0, express_1.default)();
MainRouter.post("/postmoodentry", middleware_1.UserAuth, async (req, res) => {
    const UserId = req.userId;
    try {
        const { mood, notes, tages } = req.body;
        const UserPost = await import_1.prismaclient.moodEntry.create({
            data: {
                mood: mood,
                notes: notes,
                userId: UserId
            }
        });
        if (!UserPost) {
            res.status(403).json({
                message: "Error While Creating"
            });
        }
        res.status(200).json({
            message: "Posted Succsessfully"
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
MainRouter.get("/alluserpost", middleware_1.UserAuth, async (req, res) => {
    try {
        const UserId = req.userId;
        const AllPost = await import_1.prismaclient.moodEntry.findMany({ where: { userId: UserId }, orderBy: { createdAt: "desc" } });
        if (!AllPost) {
            res.status(403).json({
                message: "Error While Getting Data"
            });
        }
        res.status(200).json({
            posts: AllPost
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server"
        });
    }
});
MainRouter.post("/addusertag", middleware_1.UserAuth, async (req, res) => {
    try {
        const { tag } = req.body;
        const userId = req.userId;
        const Tag = await import_1.prismaclient.tag.upsert({
            where: { name: tag },
            update: {},
            create: { name: tag }
        });
        await import_1.prismaclient.user.update({
            where: { id: userId },
            data: {
                tags: {
                    connect: { id: Tag.id }
                }
            }
        });
        res.status(200).json({ message: "Tag added to user" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
MainRouter.post("/addposttag/:postId", middleware_1.UserAuth, async (req, res) => {
    try {
        const { tag } = req.body;
        const postid = req.params.postId;
        const Tag = await import_1.prismaclient.tag.upsert({
            where: { name: tag },
            update: {},
            create: { name: tag }
        });
        await import_1.prismaclient.user.update({
            where: { id: postid },
            data: {
                tags: {
                    connect: { id: Tag.id }
                }
            }
        });
        res.status(200).json({ message: "Tag added to Post" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
MainRouter.post("/addposttag/:moodEntryId ", middleware_1.UserAuth, async (req, res) => {
    try {
        const { tag } = req.body;
        const moodEntryId = req.params.moodEntryId;
        const Tag = await import_1.prismaclient.tag.upsert({
            where: { name: tag },
            update: {},
            create: { name: tag }
        });
        await import_1.prismaclient.user.update({
            where: { id: moodEntryId },
            data: {
                tags: {
                    connect: { id: Tag.id }
                }
            }
        });
        res.status(200).json({ message: "Tag added to Mood Entry" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
MainRouter.post("/addposttag/:resourceId  ", middleware_1.UserAuth, async (req, res) => {
    try {
        const { tag } = req.body;
        const resourceId = req.params.resourceId;
        const Tag = await import_1.prismaclient.tag.upsert({
            where: { name: tag },
            update: {},
            create: { name: tag }
        });
        await import_1.prismaclient.user.update({
            where: { id: resourceId },
            data: {
                tags: {
                    connect: { id: Tag.id }
                }
            }
        });
        res.status(200).json({ message: "Tag added to resource Entry" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
MainRouter.post('/upload', middleware_1.UserAuth, async (req, res) => {
    cloudinary_1.v2.config({
        cloud_name: "EmpathyHub"
    });
});
exports.default = MainRouter;
