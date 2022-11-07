// require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const Password = require("../Services/Password");
exports.currentUser = (req, res) => {
    return res.status(201).send({
        user: req.currentUser,
    });
};

exports.signUp = async (req, res) => {
    let { firstName, lastName, email, password, role } = req.body;
    firstName = firstName || "";
    lastName = lastName || "";
    role = role || 4;
    try {
        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            role: role,
        });
        //   Generate JWT
        const userJwt = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_Key
        );
        return res.send({
            message: `Accounts successfully created`,
            value: {
                email: user.email,
                role: user.role,
                jwt: userJwt,
            },
        });
    } catch (error) {
        return res.send({
            message: "Error at Creating Accounts",
            error,
        });
    }
};

exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({
            message: "You have to provide Email & Password in your request",
            error: { email, password },
        });
    }

    const storedUser = await User.findOne({
        where: {
            email,
        },
    });
    if (!storedUser) {
        return res.status(404).send({
            message: "There is no Such Email",
            error: {
                value: email,
            },
        });
    }
    if (!(await Password.compare(storedUser.password, password))) {
        return res.status(401).send({
            message: "Your Password is Wrong",
            error: {
                password,
            },
        });
    }
    const userJwt = jwt.sign(
        {
            id: storedUser.id,
            email: storedUser.email,
            role: storedUser.role,
        },
        process.env.JWT_Key
    );
    return res.status(201).send({
        message: `Accounts successfully Login`,
        value: {
            email: storedUser.email,
            role: storedUser.role,
            jwt: userJwt,
        },
    });
};

exports.signOut = (req, res) => {
    return res.status(201).send({
        message: `Accounts successfully Logout `,
        value: {
            email: req.currentUser.email,
            role: req.currentUser.role,
        },
    });
};

exports.allUser = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(201).send({
            message: "Get all users",
            users,
        });
    } catch (error) {
        return res.status(400).send({
            message: "Error at getting Users",
            error,
        });
    }
};

exports.updateUser = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    try {
        const oldUser = await User.findOne({
            where: { email: req.currentUser.email },
        });
        const updateUserInfo = {
            firstName: firstName || oldUser.firstName,
            lastName: lastName || oldUser.lastName,
            email: email || oldUser.email,
        };
        await oldUser.set(updateUserInfo);
        const storedUser = await oldUser.save();
        console.log(oldUser);
        const userJwt = jwt.sign(
            {
                id: storedUser.id,
                email: storedUser.email,
                role: storedUser.role,
            },
            process.env.JWT_Key
        );
        return res.status(201).send({
            message: "Success at updating Users",
        });
    } catch (error) {
        return res.status(400).send({
            message: "Error at updating Users",
            error,
        });
    }
};
