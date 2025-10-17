"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_router_1 = __importDefault(require("../auth/auth.router"));
exports.router = (0, express_1.Router)();
exports.router.use('/auth', auth_router_1.default);
