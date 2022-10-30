const request = require("supertest");
const app = require("../server");
const { sequelize, User } = require("../models");
jest.setTimeout(8000);
beforeAll(() => {
    return sequelize.sync();
});
beforeEach(() => {
    return User.destroy({ truncate: true });
});
describe("User Registration", () => {
    it("200 OK in when signup", (done) => {
        request(app)
            .post("/api/users/signup")
            .send({
                firstName: "Linn",
                lastName: "Latt",
                email: "linlatt@gamil.com",
                password: "12345",
                role: 1,
            })
            .then((res) => {
                expect(res.status).toBe(200);
                done();
            });
    });

    it("return 201 Ok when signin is request", (done) => {
        request(app)
            .post("/api/users/signup")
            .send({
                firstName: "Linn",
                lastName: "Latt",
                email: "linlatt@gamil.com",
                password: "12345",
                role: 1,
            })
            .then(() => {
                request(app)
                    .post("/api/users/signin")
                    .send({
                        email: "linlatt@gamil.com",
                        password: "12345",
                    })
                    .then((res) => {
                        expect(res.body.message).toBe(
                            "Accounts successfully Login"
                        );
                        done();
                    });
            });
    });
    it("return 200 Ok when all user is request", (done) => {
        request(app)
            .post("/api/users/signup")
            .send({
                firstName: "Linn",
                lastName: "Latt",
                email: "linlatt@gamil.com",
                password: "12345",
                role: 1,
            })
            .then((cres) => {
                request(app)
                    .get("/api/users/")
                    .set("session", cres.jwt)
                    .then((res) => {
                        expect(res.body.message).toBe("Get all users");
                        done();
                    });
            });
    });
});
