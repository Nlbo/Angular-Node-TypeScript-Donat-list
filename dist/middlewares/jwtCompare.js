"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = __importDefault(require("../configs"));
const config = new configs_1.default();
var jwtCompare;
(function (jwtCompare) {
    function compare(req, res, next) {
        try {
            const token = req.headers.token + '';
            let user = jsonwebtoken_1.default.verify(token, config.jwt_key);
            if (user.exp > (new Date().getTime() + 1) / 1000) {
                next();
            }
            else {
                return res.status(403).json({
                    message: 'Error: session expired  !!!'
                });
            }
        }
        catch (e) {
            return res.status(403).json({
                msg: 'Unauthorized ...'
            });
        }
    }
    jwtCompare.compare = compare;
})(jwtCompare || (jwtCompare = {}));
exports.default = jwtCompare;
