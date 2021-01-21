import sharp from "sharp";
import config from "../config";
import { generateFileName } from "./generateFileName";

export async function resizeImage(
  imageName: string,
  width: number | null,
  height: number | null
): Promise<string> {
  const uploadsFolder = config.IMAGES_FOLDER + "/";
  const resizedImageName = generateFileName(imageName, width, height);
  try {
    await sharp(uploadsFolder + imageName + ".jpg")
      .resize(width, height)
      .jpeg({ quality: 50 })
      .toFile(uploadsFolder + resizedImageName);
  } catch (e) {
    console.log(e);
  }
  return resizedImageName;
}
