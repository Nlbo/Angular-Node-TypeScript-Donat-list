"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../controllers/auth"));
const multer_1 = __importDefault(require("../middlewares/multer"));
const router = express_1.Router();
router.route('/register')
    .post(multer_1.default.single('image'), auth_1.default.register);
router.route('/login')
    .post(auth_1.default.login);
exports.default = router;
