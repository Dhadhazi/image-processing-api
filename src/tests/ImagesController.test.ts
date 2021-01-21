import request from "supertest";
import { app } from "../app";
import config from "../config";
import { fileExist } from "../utils/fileExist";
import sizeOf from "image-size";

describe("GET /images route", () => {
  it("Should return status code 200", async () => {
    const result = await request(app).get("/images").send();

    expect(result.status).toBe(200);
  });
});

describe("GET /images/doesnotexist route", () => {
  it("Should return status code 404 and message", async () => {
    const result = await request(app).get("/images/doesnotexist").send();
    expect(result.status).toBe(404);
    expect(result.text).toBe(
      "Image failed to process or base file does not exists"
    );
  });
});

describe("These are the image generation tests", () => {
  // Generate random, to randomize the test image
  const RandomWidth = Math.floor(Math.random() * 300) + 50;

  describe("GET /images/test-w[RANDOM].jpg BEFORE it should exist", () => {
    it("Tests if image does not exists before generating it", async () => {
      const beforeGenerating = fileExist(
        `${config.IMAGES_FOLDER}/test-w${RandomWidth}.jpg`
      );
      expect(beforeGenerating).toBe(false);
    });
  });

  describe("GET /images/test.jpg?w=[RANDOM] to GENERATE the image", () => {
    it("Should return 200", async () => {
      const result = await request(app)
        .get(`/images/test.jpg?w=${RandomWidth}`)
        .send();

      expect(result.status).toBe(200);
    });
  });

  describe("GET /images/test-w[RANDOM].jpg exists AFTER generating", () => {
    it("Should return true", async () => {
      const afterGenerating = fileExist(
        `${config.IMAGES_FOLDER}/test-w${RandomWidth}.jpg`
      );
      expect(afterGenerating).toBe(true);
    });
  });

  describe("GET /images/test-w[RANDOM].jpg - Compare SIZE for the requested width", () => {
    it("Should return true", async () => {
      try {
        const dimensions = await sizeOf(
          `${config.IMAGES_FOLDER}/test-w${RandomWidth}.jpg`
        );
        expect(dimensions.width).toBe(RandomWidth);
      } catch (err) {
        console.error(err);
      }
    });
  });
});
