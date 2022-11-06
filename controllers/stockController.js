const { Stock_Detail, Product_Ver, sequelize } = require("../models");

exports.addStock = async (req, res) => {
    try {
        const { productID, quantity, status } = req.body;
        const stock = await Stock_Detail.create({
            productID,
            quantity,
            status,
        });
        return res.send({
            meassage: "Stock added",
        });
    } catch (error) {
        return res.send({
            meassage: "Error at adding and removing Stock",
            error,
        });
    }
};

exports.allStocks = async (req, res) => {
    try {
        const stocks = await Stock_Detail.findAll({
            include: {
                model: Product_Ver,
                as: "ver",
            },
        });
        return res.send({
            meassage: "Success",
            value: {
                stocks,
            },
        });
    } catch (error) {
        return res.send({
            meassage: "Error at getting Stock",
            error,
        });
    }
};
