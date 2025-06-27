"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware/middleware");
const import_1 = require("../config/import");
const CommunityRouter = (0, express_1.default)();
CommunityRouter.post("/addcommunitypost", middleware_1.UserAuth, async (req, res) => {
    try {
        const UserId = req.userId;
        const { title, content, tags } = req.body;
        const CreateForumPost = await import_1.prismaclient.forumPost.create({
            data: {
                title: title,
                content: content,
                authorId: UserId
            }
        });
        if (!CreateForumPost) {
            res.status(403).json({
                messgae: "Error While Creating Post"
            });
            return;
        }
        const AddingTag = await import_1.prismaclient.tag.create({
            data: {
                name: tags,
                posts: {
                    connect: {
                        id: CreateForumPost.id
                    }
                }
            },
        });
        if (!AddingTag) {
            res.status(403).json({
                message: "Error While Adding The Tags"
            });
        }
        res.status(200).json({
            message: "Post and Tag Created Successfully",
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
CommunityRouter.get("/getcommunitypost", middleware_1.UserAuth, async (req, res) => {
    try {
        const GetCommmunityPost = await import_1.prismaclient.forumPost.findMany({ include: { tags: true, author: true, comments: true } });
        if (!GetCommmunityPost) {
            res.status(403).json({
                message: "Error While Getting"
            });
            return;
        }
        res.status(200).json({
            CoommutnityPost: GetCommmunityPost
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
CommunityRouter.post("/communitypostcomment/:postId", middleware_1.UserAuth, async (req, res) => {
    try {
        const PostId = req.params.postId;
        const UserId = req.userId;
        const { content } = req.body;
        const CreateComment = await import_1.prismaclient.forumComment.create({
            data: {
                content: content,
                postId: PostId,
                authorId: UserId
            }
        });
        if (!CreateComment) {
            res.status(403).json({
                message: "Error While Posting Comment"
            });
            return;
        }
        res.status(200).json({
            message: "Comment Posted"
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
CommunityRouter.get("/getpostcomment/:postId", middleware_1.UserAuth, async (req, res) => {
    try {
        const PostId = req.params.postId;
        const GetComments = await import_1.prismaclient.forumComment.findMany({ where: { postId: PostId }, include: { author: true } });
        if (!GetComments) {
            res.status(403).json({
                message: "Error While Getching Data"
            });
            return;
        }
        res.status(200).json({
            comments: GetComments
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Intrnal Server Error"
        });
    }
});
exports.default = CommunityRouter;
