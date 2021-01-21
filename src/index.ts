import express from "express";
import multer from "multer";
import path from "path";
// import fs from "fs";
import bodyparser from "body-parser";
import { resizeImage } from "./resize";
import config from "./config";

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

app.get("/images/:imageName", async (req, res) => {
  const { imageName } = req.params;
  console.log(imageName);
  return res.status(200).sendFile(`${config.IMAGES_FOLDER}/${imageName}`);
});

app.listen(config.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${config.PORT}`
  );
});
