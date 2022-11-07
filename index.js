const app = require("./server");
const {
    sequelize,
    Raw_Product,
    User,
    Product_Ver,
    Stock_Detail,
} = require("./models");
const port = process.env.PORT || 4000;
app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
