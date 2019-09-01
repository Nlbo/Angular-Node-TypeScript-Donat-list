"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    // @ts-ignore
    destination: function (req, file, cb) {
        console.log('sssssss');
        if (!fs_1.default.existsSync(__dirname + '/../_uploads')) {
            fs_1.default.mkdirSync(__dirname + '/../_uploads');
        }
        if (!fs_1.default.existsSync(__dirname + '/../_uploads/projects')) {
            fs_1.default.mkdirSync(__dirname + '/../_uploads/projects');
        }
        if (!fs_1.default.existsSync(__dirname + '/../_uploads/users')) {
            fs_1.default.mkdirSync(__dirname + '/../_uploads/users');
        }
        if (req.originalUrl.split('/')[2] === 'project' && req.method === 'POST') {
            cb(null, __dirname + '/../_uploads/projects');
        }
        if (req.originalUrl.split('/')[3] === 'register' && req.method === 'POST') {
            cb(null, __dirname + '/../_uploads/users');
        }
    },
    filename: function (req, file, cb) {
        if (req.method === 'POST') {
            cb(null, new Date().getTime().toString() + file.originalname);
        }
    }
});
function fileFilter(req, file, cb) {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
const upload = multer_1.default({
    fileFilter: fileFilter,
    storage: storage
});
exports.default = upload;
