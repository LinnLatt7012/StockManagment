const express = require("express");
const {
    getallProducts,
    updateActiveVersion,
    createdVersion,
    createProduct,
} = require("../controllers/productController");
const { setCurrentUser, requiredAuth } = require("../middleware/auth");
const productRouter = express.Router();
productRouter.get("/", setCurrentUser, requiredAuth, getallProducts);
productRouter.post("/", setCurrentUser, requiredAuth, createProduct);
productRouter.put(
    "/:id/versions/:vid",
    setCurrentUser,
    requiredAuth,
    updateActiveVersion
);
// productRouter.get("/:id/versions", getallVersions);
productRouter.post(
    "/:id/versions",
    setCurrentUser,
    requiredAuth,
    createdVersion
);

module.exports = productRouter;
