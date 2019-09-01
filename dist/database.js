"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const configs_1 = __importDefault(require("./configs"));
class Database {
    constructor() {
        this.config = new configs_1.default();
    }
    connect() {
        mongoose_1.default.connect(this.config.mongoURL, { useNewUrlParser: true, useCreateIndex: true })
            .then(() => { console.log('MongoDB has connected'); })
            .catch(() => { console.log('Error: MongoDB has not connected'); });
    }
}
exports.default = Database;
