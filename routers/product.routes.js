const express = require("express");
const {
    getallProducts,
    updateActiveVersion,
    createdVersion,
} = require("../controllers/productController");
const productRouter = express.Router();
productRouter.get("/", getallProducts);
// productRouter.post("/", createProduct);
productRouter.put("/:id/versions/:vid", updateActiveVersion);
// productRouter.get("/:id/versions", getallVersions);
productRouter.post("/:id/versions", createdVersion);

module.exports = productRouter;
