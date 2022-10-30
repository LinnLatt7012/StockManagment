require("dotenv").config();

const express = require("express");
const Password = require("./Services/Password");
const authRouter = require("./routers/auth.routes");
const cookieSession = require("cookie-session");
const port = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.set("trust proxy", 1);
app.use(
    cookieSession({
        signed: false,
        secure: false,
    })
);
app.use("/api/users", authRouter);

module.exports = app;
