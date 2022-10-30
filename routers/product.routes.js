const express = require("express");
const {
    getallProducts,
    createProduct,
    getallVersions,
    updateActiveVersion,
    createdVersion,
} = require("../controllers/productController");
const productRouter = express.Router();
productRouter.get("/", getallProducts);
productRouter.post("/", createProduct);
productRouter.get("/:id", getallVersions);
productRouter.put("/:id", updateActiveVersion);
productRouter.post("/:id/versions", createdVersion);

module.exports = productRouter;
