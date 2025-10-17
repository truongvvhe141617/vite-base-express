"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const is_auth_middleware_1 = __importDefault(require("../middelwares/is-auth.middleware"));
const router = (0, express_1.Router)();
router.post('/login', auth_controller_1.default.login);
router.get("/:id", is_auth_middleware_1.default, auth_controller_1.default.getUserDetail);
router.post('/register', auth_controller_1.default.register);
exports.default = router;
