import { Request, Response, Router } from 'express';
import multer from 'multer';
import config from '../config';
import { resizeImage } from '../utils/resizeImage';

export const UploadController: Router = Router();

UploadController.get('/', (req: Request, res: Response): Response => res.status(200).send('Image Processing API'));

const storage = multer.diskStorage({
  destination: config.IMAGES_FOLDER,
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

UploadController.post(
  '/',
  upload.single('image'),
  async (req: Request, res: Response): Promise<Response> => {
    const { filename } = req.file;
    const imageName = filename.split('.')[0];
    const width = Number(req.query.w) || null;
    const height = Number(req.query.h) || null;

    if (width || height) resizeImage(imageName, width, height);

    return res.send('SUCCESS!');
  },
);
