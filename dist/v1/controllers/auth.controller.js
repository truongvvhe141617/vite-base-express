"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const apiKey_service_1 = __importDefault(require("../services/apiKey.service"));
class Controller {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const existedUser = yield user_1.default.findOne({ email });
            if (!existedUser) {
                res.status(500).json({
                    message: 'User is not found!',
                    status: 'error'
                });
                return;
            }
            const passwordExact = bcrypt_1.default.compare(password, existedUser.password);
            const accessToken = yield apiKey_service_1.default.signApiKeyToken(existedUser);
            if (!passwordExact) {
                res.status(500).json({
                    message: 'Wrong password!',
                    status: 'error'
                });
            }
            else {
                res.status(200).json({
                    message: 'Login Success!',
                    data: {
                        accessToken,
                    },
                    status: 'success'
                });
            }
        });
        this.getUserDetail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const existedUser = yield user_1.default.findOne({ _id: req.params.id });
            if (!existedUser) {
                res.status(500).json({
                    message: "User is not found",
                    status: "error",
                });
                return;
            }
            res.status(200).json({
                message: "Get detail user success",
                data: Object.assign({}, existedUser),
                status: "success",
            });
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const existedUser = yield user_1.default.findOne({ email });
            if (existedUser) {
                res.status(500).json({
                    message: 'User is existed!',
                    status: 'error'
                });
                return;
            }
            const passwordEndcryted = yield bcrypt_1.default.hash(password, 12);
            const user = new user_1.default({
                email: email,
                password: passwordEndcryted
            });
            yield user.save();
            res.status(200).json({
                message: 'User registed successfully!',
                status: 'success'
            });
        });
    }
}
const controller = new Controller();
exports.default = controller;
