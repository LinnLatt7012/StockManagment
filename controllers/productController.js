const { Raw_Product, Product_Ver } = require("../models");

exports.getallProducts = async (req, res) => {
    try {
        const products = await Raw_Product.findAll({
            include: [
                {
                    model: Product_Ver,
                    as: "versions",
                },
            ],
        });
        return res.send({
            message: "Success",
            value: {
                products,
            },
        });
    } catch (error) {
        return res.send({
            message: "Error at Getting Product Data",
            error,
        });
    }
};
exports.createProduct = async (req, res) => {
    try {
        const {
            productName,
            itemPerPackage,
            minStock,
            totalQuantity,
            unitPrice,
        } = req.body;
        json = JSON.stringify(productName);
        const product = await Raw_Product.create({
            productName: json,
            itemPerPackage,
            minStock,
            totalQuantity,
        });
        const version = await Product_Ver.create({
            productID: product.productID,
            unitPrice,
        });
        return res.send({
            message: "Success",
            value: {
                productID: product.productID,
            },
        });
    } catch (error) {
        return res.send({
            message: "Error at Creating Product Data",
            error,
        });
    }
};
exports.getallVersions = async (req, res) => {
    try {
        const { id } = req.params;
        const versions = await Product_Ver.findAll({
            where: {
                productID: id,
            },
        });
        return res.send({
            message: "Success",
            value: {
                versions,
            },
        });
    } catch (error) {
        return res.send({
            message: "Error at getting all versions",
            error,
        });
    }
};
exports.updateActiveVersion = async (req, res) => {
    try {
        const { id, vid } = req.params;
        const product = await Raw_Product.findByPk(id);
        product.set({
            activeVersion: vid,
        });
        product.save();
        return res.send({
            message: "Success at updating version",
        });
    } catch (error) {
        return res.send({
            message: "Error at updating",
            error,
        });
    }
};
exports.createdVersion = async (req, res) => {
    try {
        const { id } = req.params;
        const { unitPrice } = req.body;
        const version = await Product_Ver.create({
            productID: id,
            unitPrice,
        });
        return res.send({
            message: "Success at Creating new version",
        });
    } catch (error) {
        return res.send({
            message: "Error at Creating Product Version",
            error,
        });
    }
};
