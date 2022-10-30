const jwt = require("jsonwebtoken");
exports.setCurrentUser = (req, res, next) => {
    if (!req.session?.jwt) return next();

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_Key);
        req.currentUser = payload;
    } catch (err) {}
    next();
};

exports.requiredAuth = (req, res, next) => {
    if (!req.currentUser) {
        // res.set("Content-Type", "text/html");
        return res.status(401).send({
            errors: [{ message: "Unauthorized Access" }],
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    // console.log(`reach`, req.currentUser.role == "admin");
    if (
        !(req.currentUser.role == "admin" || req.currentUser.role == "manager")
    ) {
        return res.status(401).send({
            errors: [{ message: "Unauthorized Access" }],
        });
    }
    next();
};

// exports.setJWt = ()
