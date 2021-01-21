import request from "supertest";
import { app } from "../app";

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

// Test if image asked without generating it exitst

// Test if image exists after asked to generate

// Test if image not exists without generating it
