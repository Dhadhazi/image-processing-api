import sharp from "sharp";
import config from "./config";

function generateFileName(
  imageName: string,
  width: number | null,
  height: number | null
) {
  let name = imageName;
  if (width) name += `-w${width}`;
  if (height) name += `-h${height}`;
  return `${name}.jpg`;
}

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
