/* eslint-disable @typescript-eslint/no-var-requires */
const request = require("supertest");
const express = require("express");

const app = express();

describe("Always true", () => {
  it("Will be true", () => {
    expect(true).toBe(true);
  });
});

describe("Nothing on main route", () => {
  it("responds with code 404", (done) => {
    request(app).get("/").expect(404, done);
  });
});

describe("GET /images route", () => {
  it("responds with code 200", (done) => {
    request(app).get("/images").expect(200, done);
  });
});
