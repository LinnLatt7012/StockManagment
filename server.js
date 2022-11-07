require("dotenv").config();

const express = require("express");
const Password = require("./Services/Password");
const authRouter = require("./routers/auth.routes");
const stockRouter = require("./routers/stock.routes");
const productRouter = require("./routers/product.routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", authRouter);
app.use("/api/stocks", stockRouter);
app.use("/api/products", productRouter);

module.exports = app;
