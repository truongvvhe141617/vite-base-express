"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectMongoDB = () => {
    mongoose_1.default.connect(String(process.env.MONGO_URI)).then(res => {
        console.log('Connected to MongoDB');
    }).catch((error) => console.log('error', error));
};
exports.connectMongoDB = connectMongoDB;
