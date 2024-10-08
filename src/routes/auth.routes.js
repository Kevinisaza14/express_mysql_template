// TODO: Desarrollar el codigo para las rutas de "/signin", "/signup"
const express = require("express");
const router = express.Router();
// importamos controlador y middleware
const authController = require("../controllers/auth.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
// rutas
router.post("/auth/signup", authController.signUp);
router.post("/auth/signin", authController.signIn);
router.get("/profile", authMiddleware, authController.profile);
// router.get("/privada", authMiddleware, authController.private);

module.exports = router;