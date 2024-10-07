// TODO: Desarrollar el codigo para las rutas de "/signin", "/signup"

const express = require("express");
const auth = express.Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller.js");
// rutas
auth.post("/signin", authController.signin);
auth.post("/signup", userController.createUser);

module.exports = auth;  