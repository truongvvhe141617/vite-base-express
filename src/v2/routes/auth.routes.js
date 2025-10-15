import express from "express";
const router = express.Router();
import authController from "../modules/auth/interfaces/auth.controller";

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
