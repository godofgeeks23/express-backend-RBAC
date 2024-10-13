const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const db = require("../config/config").get(process.env.NODE_ENV);
require("dotenv").config();

/* Connecting to the database before all tests. */
beforeAll(async () => {
  mongoose.set("strictQuery", true); // to suppress warning
  await mongoose.connect(db.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

/* Closing database connection after all tests. */
afterAll(async () => {
  await mongoose.connection.close();
});

let bearer_token = "";

describe("POST /api/login", () => {
  it("should successfully login with user", async () => {
    const res = await request(app).post("/api/login").send({
      email: "",
      password: "",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.isAuth).toBe(true);
    expect(res.body.email).toBe("");
    expect(res.body.bearer_token).not.toBeNull();
  });
});

describe("GET /api/logout", () => {
  it("should successfully logout", async () => {
    const res = await request(app)
      .get("/api/logout")
      .set("Authorization", `Bearer ${bearer_token}`);
    expect(res.statusCode).toBe(200);
  });
});
