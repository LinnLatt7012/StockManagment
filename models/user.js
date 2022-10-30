"use strict";
const { Model } = require("sequelize");
const Password = require("../Services/Password");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.addHook("beforeCreate", async (record, options) => {
                record.password = await Password.toHash(record.password);
            });
        }
    }
    User.init(
        {
            userID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                required: true,
            },
            role: {
                type: DataTypes.ENUM,
                values: ["admin", "employee", "manager"],
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
