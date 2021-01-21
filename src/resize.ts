import sharp from "sharp";
import path from "path";

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
) {
  const uploadsFolder = __dirname + "/uploads/";
  const resizedImageName = generateFileName(imageName, width, height);

  await sharp(uploadsFolder + imageName + ".jpg")
    .resize(width, height)
    .jpeg({ quality: 50 })
    .toFile(path.resolve(uploadsFolder, resizedImageName));

  return resizedImageName;
}
