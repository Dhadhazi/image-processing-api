import express from "express";
import sharp from "sharp";
import multer from "multer";
import path from "path";
import fs from "fs";
import bodyparser from "body-parser";

const app = express();
const PORT = 8000;

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.status(200).send("Image Processing API"));

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, ".", "uploads"),
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  const { filename: image } = req.file;

  await sharp(__dirname + "/uploads/" + image)
    .resize(100)
    .jpeg({ quality: 50 })
    .toFile(path.resolve(req.file.destination, "resized", image));
  fs.unlinkSync(req.file.path);

  return res.send("SUCCESS!");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
