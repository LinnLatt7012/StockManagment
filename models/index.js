"use strict";
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);

const db = {};
const dbName = process.env.DB_DBNAME || "ayenoodle";
const dbPassword = process.env.DB_PASSWORD || null;
const dbUserName = process.env.DB_USERNAME || "root";

const dialect = process.env.DB_DIALECT || "mysql";
const host = process.env.DB_HOST || "127.0.0.1";
const port = process.env.DB_PORT || 3306;
const logging = process.env.DB_LOGGING == "false" ? false : true || true;
const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        dialect,
        host,
        port,
        logging,
    }
);

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
