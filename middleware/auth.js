const jwt = require("jsonwebtoken");
exports.setCurrentUser = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) return next();
    try {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        const payload = jwt.verify(bearerToken, process.env.JWT_Key);
        req.currentUser = payload;
    } catch (err) {
        res.sendStatus(403);
    }
    next();
};
exports.requiredAuth = (req, res, next) => {
    if (!req.currentUser) {
        return res.status(401).send({
            errors: [{ message: "Unauthorized Access" }],
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
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
