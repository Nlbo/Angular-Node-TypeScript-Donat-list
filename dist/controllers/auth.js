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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = __importDefault(require("../configs"));
const bcryptjs_1 = __importStar(require("bcryptjs"));
const config = new configs_1.default();
var Auth;
(function (Auth) {
    function login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield User_1.default.findOne({ email: req.body.email });
            if (candidate) {
                const password = bcryptjs_1.default.compareSync(req.body.password, candidate.password);
                if (password) {
                    const token = jsonwebtoken_1.default.sign({
                        firstName: candidate.firstName,
                        lastName: candidate.lastName,
                        email: candidate.email,
                        img: candidate.img,
                        phone: candidate.phone,
                        _id: candidate._id
                    }, config.jwt_key, { expiresIn: config.jwt_expires });
                    res.status(201).json({
                        token: token,
                        user_id: candidate._id
                    });
                }
                else {
                    res.status(401).json({
                        msg: 'Error: Invalid password'
                    });
                }
            }
            else {
                res.status(404).json({
                    msg: 'Error: User not found ...'
                });
            }
        });
    }
    Auth.login = login;
    function register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield User_1.default.findOne({ email: req.body.email });
            if (!candidate) {
                let user = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: bcryptjs_1.default.hashSync(req.body.password, bcryptjs_1.genSaltSync(10))
                };
                req.file ? user.img = '/uploads/users/' + req.file.filename : null;
                try {
                    yield new User_1.default(user).save();
                    res.status(201).json({
                        msg: 'Success: User registered successfully ...'
                    });
                }
                catch (e) {
                    res.status(500).json({
                        msg: 'Error: User nor registered ...'
                    });
                }
            }
            else {
                res.status(401).json({
                    msg: 'Error: User has already registered ...'
                });
            }
        });
    }
    Auth.register = register;
})(Auth || (Auth = {}));
exports.default = Auth;
