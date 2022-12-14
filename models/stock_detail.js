"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Stock_Detail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Raw_Product, Product_Ver }) {
            // define association here
            this.belongsTo(Raw_Product, {
                foreignKey: "productID",
                as: "product",
            });
            this.belongsTo(Product_Ver, {
                foreignKey: "version",
            });
            Stock_Detail.addHook("beforeCreate", async (record, options) => {
                // console.log(record);
                const product = await Raw_Product.findByPk(record.productID);
                record.version = product.activeVersion;
            });
            Stock_Detail.addHook("beforeSave", async (record, options) => {
                // console.log(record);
                const product = await Raw_Product.findByPk(record.productID);
                const upQuantity =
                    record.status == 1
                        ? product.totalQuantity + record.quantity
                        : product.totalQuantity - record.quantity;
                product.set({
                    totalQuantity: upQuantity,
                });
                product.save();
            });
        }
    }
    Stock_Detail.init(
        {
            date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            quantity: DataTypes.INTEGER,
            status: {
                type: DataTypes.ENUM,
                values: ["in", "out", "readymade"],
            },
        },
        {
            sequelize,
            timestamps: false,
            modelName: "Stock_Detail",
        }
    );
    return Stock_Detail;
};
