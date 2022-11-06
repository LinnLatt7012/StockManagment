const { QueryTypes } = require("sequelize");
const db = require("../models");
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

exports.toalStock = async (req, res) => {
    var { nofDays } = req.query;
    nofDays = nofDays || 7;
    const sql = `SELECT S.date,SUM(S.quantity)*V.unitPrice as TOTAL FROM (SELECT * FROM stock_details as sd WHERE DATE(sd.date) > SUBDATE(CURDATE(), ${nofDays})) AS S LEFT JOIN product_vers as V ON S.version=V.id GROUP BY S.productID,S.version`;
    const result = await sequelize.query(sql, { type: QueryTypes.SELECT });
    return res.send({
        meassage: "",
        result,
    });
};
// SELECT S.date,SUM(S.quantity),V.unitPrice FROM 'stock_details' as S LEFT JOIN 'product_vers' as V ON S.version=V.id GROUP BY S.productID,S.version

// SELECT S.date,SUM(S.quantity)*V.unitPrice as total FROM `stock_details` as S LEFT JOIN `product_vers` as V ON S.version=V.id GROUP BY S.productID,S.version
// 151800
// CURRENT_DATE()
