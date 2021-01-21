import express from "express";
import multer from "multer";
import fs from "fs";
import bodyparser from "body-parser";
import { resizeImage } from "./resize";
import config from "./config";
import { fileExist } from "./utils/fileExist";

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
    // Get the resized image full name
    // Check if resized image exists
    //  If exists send back the link
    // If does not exists, create it and send back the anme
  }

  const path = `${config.IMAGES_FOLDER}/${imageName}`;

  if (fileExist(path)) {
    return res.status(200).sendFile(path);
  } else {
    return res
      .status(404)
      .send("Image failed to process or base file does not exists");
  }
});

app.listen(config.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${config.PORT}`
  );
});
