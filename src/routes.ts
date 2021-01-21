import { Application, Router } from "express";
import { ImagesController } from "./controllers/ImagesController.ts";
import { IndexController } from "./controllers/IndexController";
import { UploadController } from "./controllers/UploadController";

const _routes: [string, Router][] = [
  ["/", IndexController],
  ["/upload", UploadController],
  ["/images", ImagesController],
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};
