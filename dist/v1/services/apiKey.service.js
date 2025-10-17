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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Service {
    constructor() {
        this.generateToken = (user) => {
            const secret = process.env.JWT_SECRET || "default_secret";
            const expiresIn = (process.env.JWT_EXPIRES_IN || "15d");
            return jsonwebtoken_1.default.sign({
                id: user.id,
                email: user.email,
            }, secret, { expiresIn });
        };
        this.signApiKeyToken = (user) => __awaiter(this, void 0, void 0, function* () {
            const token = this.generateToken(user);
            return token;
        });
    }
}
const apiKeyService = new Service();
exports.default = apiKeyService;
