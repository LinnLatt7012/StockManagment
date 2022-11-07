const express = require("express");
const {
    currentUser,
    signIn,
    signUp,
} = require("../controllers/authController");
const { requiredAuth, setCurrentUser, isAdmin } = require("../middleware/auth");
const authRouter = express.Router();

authRouter.get("/currentuser", setCurrentUser, requiredAuth, currentUser);
authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
// authRouter.post("/signout", setCurrentUser, requiredAuth, signOut);
// authRouter.get("/", setCurrentUser, requiredAuth, isAdmin, allUser);
// authRouter.post("/updateprofile", setCurrentUser, requiredAuth, updateUser);

module.exports = authRouter;
