const express = require("express");
const {
    allUser,
    currentUser,
    signIn,
    signOut,
    signUp,
} = require("../controllers/authController");
const { requiredAuth, setCurrentUser, isAdmin } = require("../middleware/auth");
const authRouter = express.Router();

authRouter.get("/currentuser", setCurrentUser, requiredAuth, currentUser);
authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/signout", setCurrentUser, requiredAuth, signOut);
authRouter.get("/", setCurrentUser, requiredAuth, isAdmin, allUser);

module.exports = authRouter;
