import { Request, Response, Router } from 'express';
import config from '../config';
import { resizeImage } from '../utils/resizeImage';
import { fileExist } from '../utils/fileExist';
import { generateFileName } from '../utils/generateFileName';

export const ImagesController: Router = Router();

ImagesController.get('/', (req: Request, res: Response) => {
  res.status(200).send('Give image name as param');
});

ImagesController.get('/:imageName', async (req: Request, res: Response) => {
  const { imageName } = req.params;

  const path = `${config.IMAGES_FOLDER}/${imageName}`;
  const coreFileExists = fileExist(path);

  if (coreFileExists) {
    const width = Number(req.query.w) || null;
    const height = Number(req.query.h) || null;

    if (width || height) {
      const imageNameWithoutExtension = imageName.split('.')[0];
      const resizedImageName = generateFileName(imageNameWithoutExtension, width, height);
      const resizedImagePath = `${config.IMAGES_FOLDER}/${resizedImageName}`;

      if (!fileExist(resizedImagePath)) {
        await resizeImage(imageNameWithoutExtension, width, height);
      } 
      
      return res.status(200).sendFile(resizedImagePath);
    } else {
      return res.status(200).sendFile(path);
    }
  } else {
    return res.status(404).send('Image failed to process or base file does not exists');
  }
});
