const express = require("express");
const { addStock } = require("../controllers/stockController");
const stockRouter = express.Router();

stockRouter.post("/", addStock);

module.exports = stockRouter;
