"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware/middleware");
const import_1 = require("../config/import");
const ResourcesRouter = (0, express_1.default)();
ResourcesRouter.post("/postresourcses", middleware_1.UserAuth, async (req, res) => {
    try {
        const {} = req.body;
        const CreateResourcses = await import_1.prismaclient.resource.create({
            data: {}
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
ResourcesRouter.get("/getresourcsespost", middleware_1.UserAuth, async (req, res) => {
});
exports.default = ResourcesRouter;
