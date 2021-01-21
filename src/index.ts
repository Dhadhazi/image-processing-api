import express from "express";
import multer from "multer";
import fs from "fs";
import bodyparser from "body-parser";
import { resizeImage } from "./resize";
import config from "./config";
import { fileExist } from "./utils/fileExist";
import { generateFileName } from "./utils/generateFileName";

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/uploads", (req, res) => res.status(200).send("Image Processing API"));

const storage = multer.diskStorage({
  destination: config.IMAGES_FOLDER,
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  const { filename } = req.file;
  const imageName = filename.split(".")[0];
  const width = Number(req.query.w) || null;
  const height = Number(req.query.h) || null;

  if (width || height) resizeImage(imageName, width, height);

  return res.send("SUCCESS!");
});

app.get("/images", (req, res) => {
  res.status(200).send("Give image name as param");
});

app.get("/images/:imageName", async (req, res) => {
  const { imageName } = req.params;
  const width = Number(req.query.w) || null;
  const height = Number(req.query.h) || null;

  if (width || height) {
    const imageNameWithoutExtension = imageName.split(".")[0];
    const resizedImageName = generateFileName(
      imageNameWithoutExtension,
      width,
      height
    );
    const resizedImagePath = `${config.IMAGES_FOLDER}/${resizedImageName}`;

    if (fileExist(resizedImagePath)) {
      return res.status(200).sendFile(resizedImagePath);
    } else {
      await resizeImage(imageNameWithoutExtension, width, height);
      return res.status(200).sendFile(resizedImagePath);
    }
  } else {
    const path = `${config.IMAGES_FOLDER}/${imageName}`;

    if (fileExist(path)) {
      return res.status(200).sendFile(path);
    } else {
      return res
        .status(404)
        .send("Image failed to process or base file does not exists");
    }
  }
});

app.listen(config.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${config.PORT}`
  );
});
