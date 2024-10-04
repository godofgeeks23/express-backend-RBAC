const request = require("supertest");
const app = require("../app");

describe("GET /", () => {
  it("Should respond with code 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });
});
