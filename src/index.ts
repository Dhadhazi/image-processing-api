import express from "express";
import sharp from "sharp";
import multer from "multer";
import path from "path";
import fs from "fs";
import bodyparser from "body-parser";
import { resizeImage } from "./resize";

const app = express();
const PORT = 8000;

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/uploads", (req, res) => res.status(200).send("Image Processing API"));

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, ".", "uploads"),
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

  resizeImage(imageName, width, height);

  return res.send("SUCCESS!");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
