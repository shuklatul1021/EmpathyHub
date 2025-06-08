import Router from "express"
import multer from 'multer';
import streamifier from 'streamifier';
import { prismaclient } from "../config/import";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary"
import { UserAuth } from "../middleware/middleware";
const MediaRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: "dwrrfy5wd", // your cloud name
  api_key: "254794527933653",
  api_secret: "Mhz0iFUWKyv510C1U6rDXuE1mgQ",
});

MediaRouter.post('/upload', UserAuth , upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    const userId = req.userId;
    console.log(req.file);
    console.log(req.userId);

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Function to upload to Cloudinary using stream
    const streamUpload = (): Promise<UploadApiResponse> =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'user_uploads' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result as UploadApiResponse); // Type cast to fix TS error
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });

    const result = await streamUpload();

    // Update user profile with uploaded image URL
    await prismaclient.user.update({
      where: { id: userId },
      data: {
        avatar: result.secure_url,
      },
    });

    res.status(200).json({
      message: 'Image uploaded and user updated successfully',
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default MediaRouter;