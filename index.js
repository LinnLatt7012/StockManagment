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
        await sequelize.sync({ alter: true });
        console.log("Connection has been established successfully.");

        // const product1 = await Raw_Product.create({
        //     materialName: "Bean Sauce",
        //     minStock: 10,
        //     itemPerPackage: 1,
        //     totalQuantity: 10,
        // });
        // const user = await User.create({
        //   firstName: "Linn",
        //   lastName: "Latt",
        //   email: "linlatt@gamil.com",
        //   password: "12345",
        // });
        // const pd_vr = await Product_Ver.create({
        //     productID: product1.productID,
        //     unitPrice: 3500,
        // });
        // const stockrd = await Stock_Detail.create({
        //   productID: 2,
        //   quantity: 50,
        //   status: 1,
        // });
        // // console.log(user.password);
        // console.log(await Password.compare(user.password, "12345"));
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
