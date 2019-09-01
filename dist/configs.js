"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Configs {
    constructor() {
        this.port = 3000;
        this.mongoURL = 'mongodb://admin:admin123456@ds157459.mlab.com:57459/armboldmine';
        this.jwt_key = 'erik';
        this.jwt_expires = '3h';
    }
}
exports.Configs = Configs;
exports.default = Configs;
