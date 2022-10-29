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
      });
      this.hasMany(models.Stock_Detail, {
        foreignKey: "productID",
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
      materialName: DataTypes.STRING,
      activeVersion: DataTypes.STRING,
      itemPerPackage: DataTypes.INTEGER,
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