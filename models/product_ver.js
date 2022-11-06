"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product_Ver extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Raw_Product, Stock_Detail }) {
            // define association here
            this.belongsTo(Raw_Product, {
                foreignKey: "productID",
                as: "product",
            });
            this.hasMany(Stock_Detail, {
                foreignKey: "version",
                as: "stocks",
            });
            this.addHook("afterSave", async (record, options) => {
                const product = await Raw_Product.findByPk(record.productID);
                product.set({
                    activeVersion: record.id,
                });
                product.save();
            });
        }
    }
    Product_Ver.init(
        {
            // version: DataTypes.STRING,
            unitPrice: DataTypes.INTEGER,
            date: {
                type: DataTypes.DATEONLY,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            timestamps: false,
            modelName: "Product_Ver",
        }
    );
    return Product_Ver;
};
