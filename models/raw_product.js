// "use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Raw_Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Product_Ver, {
                foreignKey: "productID",
                as: "versions",
            });
            this.hasMany(models.Stock_Detail, {
                foreignKey: "productID",
                as: "stocks",
            });
        }
    }
    Raw_Product.init(
        {
            productID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            enName: {
                type: DataTypes.STRING,
                unique: true,
            },
            mmName: {
                type: DataTypes.STRING,
                unique: true,
            },
            activeVersion: DataTypes.INTEGER,
            itemPerPackage: {
                type: DataTypes.INTEGER,
                // defaultValue: 1,
            },
            minStock: DataTypes.INTEGER,
            totalQuantity: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Raw_Product",
        }
    );
    return Raw_Product;
};
