const express = require("express");
const { addStock, allStocks } = require("../controllers/stockController");
const stockRouter = express.Router();

stockRouter.post("/", addStock);
stockRouter.get("/", allStocks);

module.exports = stockRouter;
