require("dotenv").config();

const express = require("express");
const Password = require("./Services/Password");
const authRouter = require("./routers/auth.routes");
const cookieSession = require("cookie-session");
const stockRouter = require("./routers/stock.routes");
const productRouter = require("./routers/product.routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", (ip) => {
    if (ip === "127.0.0.1" || ip === "123.123.123.123")
        return true; // trusted IPs
    else return false;
});
app.use(
    cookieSession({
        name: "session",
        signed: false,
        secure: false,
    })
);
app.use("/api/users", authRouter);
app.use("/api/stocks", stockRouter);
app.use("/api/products", productRouter);

module.exports = app;
