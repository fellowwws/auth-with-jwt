const request = require("supertest");

const app = require("../src/app");

describe("POST /signup", () => {
  it("Signs up a new user", (done) => {
    request(app)
      .post("/auth/signup")
      .send({ email: "johndoe@test.com", password: "password" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("POST /signup", () => {
  it("Says email already exists", (done) => {
    request(app)
      .post("/auth/signup")
      .send({ email: "johndoe@test.com", password: "password" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, { error: "Email already exists" }, done);
  });
});
