const { Raw_Product, Product_Ver } = require("../models");

exports.getallProducts = async (req, res) => {
    try {
        const products = await Raw_Product.findAll();
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
    const {} = req.body;
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
            message: "Error at updating",
            error,
        });
    }
};
exports.updateActiveVersion = async (req, res) => {
    try {
        const { id } = req.params;
        const { activeVersion } = req.body;
        const product = await Raw_Product.findByPk(id);
        product.set({
            activeVersion,
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
exports.createdVersion = async (req, res) => {};
