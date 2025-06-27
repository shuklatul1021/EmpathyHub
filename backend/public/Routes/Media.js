"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const streamifier_1 = __importDefault(require("streamifier"));
const import_1 = require("../config/import");
const cloudinary_1 = require("cloudinary");
const middleware_1 = require("../middleware/middleware");
const MediaRouter = (0, express_1.default)();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
cloudinary_1.v2.config({
    cloud_name: "dwrrfy5wd", // your cloud name
    api_key: "254794527933653",
    api_secret: "Mhz0iFUWKyv510C1U6rDXuE1mgQ",
});
MediaRouter.post('/upload', middleware_1.UserAuth, upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        const userId = req.userId;
        console.log(req.file);
        console.log(req.userId);
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        // Function to upload to Cloudinary using stream
        const streamUpload = () => new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({ folder: 'user_uploads' }, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result); // Type cast to fix TS error
            });
            streamifier_1.default.createReadStream(file.buffer).pipe(stream);
        });
        const result = await streamUpload();
        // Update user profile with uploaded image URL
        await import_1.prismaclient.user.update({
            where: { id: userId },
            data: {
                avatar: result.secure_url,
            },
        });
        res.status(200).json({
            message: 'Image uploaded and user updated successfully',
            imageUrl: result.secure_url,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.default = MediaRouter;
