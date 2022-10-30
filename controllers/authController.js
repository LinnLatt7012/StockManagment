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
    const { firstName, lastName, email, password, role } = req.body;
    //   console.log(req.body);
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

        req.session = {
            jwt: userJwt,
        };

        return res.status(201).send({
            message: `Accounts successfully created`,
            data: user,
        });
    } catch ({ errors }) {
        const resErr = errors.map((err, index) => {
            return { message: err.message, value: err.value };
        });
        return res.send({
            errors: resErr,
        });
    }
};

exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).send({
            errors: [
                {
                    message: "You have to provide Email in your request",
                },
            ],
        });
    }

    const storedUser = await User.findOne({
        where: {
            email,
        },
    });
    if (!storedUser) {
        return res.status(404).send({
            errors: [
                {
                    message: "There is no Such Email",
                    value: email,
                },
            ],
        });
    }
    if (!(await Password.compare(storedUser.password, password)))
        return res.status(401).send({
            errors: [
                {
                    message: "Your Password is Wrong",
                    value: password,
                },
            ],
        });
    const userJwt = jwt.sign(
        {
            id: storedUser.id,
            email: storedUser.email,
            role: storedUser.role,
        },
        process.env.JWT_Key
    );

    req.session = {
        jwt: userJwt,
    };

    return res.status(201).send({
        message: `Accounts successfully Login `,
        data: {
            email: storedUser.email,
            role: storedUser.role,
        },
    });
};

exports.signOut = (req, res) => {
    req.session = {
        jwt: null,
    };
    return res.status(201).send({
        message: `Accounts successfully Logout `,
        data: {
            email: req.currentUser.email,
            role: req.currentUser.role,
        },
    });
};

exports.allUser = async (req, res) => {
    const users = await User.findAll();
    return res.status(201).send({
        users,
    });
};
