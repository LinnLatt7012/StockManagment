const express = require("express");
const {
    addStock,
    allStocks,
    totalStock,
} = require("../controllers/stockController");
const { setCurrentUser, requiredAuth } = require("../middleware/auth");
const stockRouter = express.Router();

stockRouter.post("/", setCurrentUser, requiredAuth, addStock);
stockRouter.get("/", setCurrentUser, requiredAuth, allStocks);
stockRouter.get("/dashboard", setCurrentUser, requiredAuth, totalStock);

module.exports = stockRouter;
