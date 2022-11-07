const express = require("express");
const {
    addStock,
    allStocks,
    totalStock,
} = require("../controllers/stockController");
const stockRouter = express.Router();

stockRouter.post("/", addStock);
stockRouter.get("/", allStocks);
stockRouter.get("/dashboard", totalStock);

module.exports = stockRouter;
