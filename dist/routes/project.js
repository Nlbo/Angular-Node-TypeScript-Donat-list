"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_1 = __importDefault(require("../controllers/project"));
const jwtCompare_1 = __importDefault(require("../middlewares/jwtCompare"));
const multer_1 = __importDefault(require("../middlewares/multer"));
const router = express_1.Router();
router.use('/', jwtCompare_1.default.compare);
router.route('/')
    .get(project_1.default.getOneProject)
    .post(multer_1.default.single('image'), project_1.default.postProject)
    .put(project_1.default.changeProject)
    .delete(project_1.default.deleteProject);
router.route('/ongoing')
    .get(project_1.default.getProjectsOngoing);
router.route('/finished')
    .get(project_1.default.getProjectsFinished);
exports.default = router;
