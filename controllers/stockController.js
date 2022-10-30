const { Stock_Detail } = require("../models");

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
