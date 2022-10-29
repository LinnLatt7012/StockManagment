const request = require("supertest");
const app = require("../server");
it("return 200 Ok when signup is request", (done) => {
  request(app)
    .post("/api/1.0/users")
    .send({
      firstName: "Linn",
      lastName: "Latt",
      email: "user@gmail.com",
      password: "P455word",
    })
    .then((res) => {
      expect(res.status).toBe(200);
      done();
    });
});
