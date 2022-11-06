const express = require("express");
const {
    addStock,
    allStocks,
    toalStock,
} = require("../controllers/stockController");
const stockRouter = express.Router();

stockRouter.post("/", addStock);
stockRouter.get("/", allStocks);
stockRouter.get("/dashboard", toalStock);

module.exports = stockRouter;
