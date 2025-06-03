"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware/middleware");
const import_1 = require("../config/import");
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
exports.default = MainRouter;
