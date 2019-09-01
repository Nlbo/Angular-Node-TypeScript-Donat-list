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
const Project_1 = __importDefault(require("../models/Project"));
const configs_1 = __importDefault(require("../configs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config = new configs_1.default();
var Projects;
(function (Projects) {
    function getProjectsOngoing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield Project_1.default.find(
                // {"started_at":
                //         {
                //             "$lt": new Date()
                //         }
                // }
                )
                    .populate('user', 'firstName lastName img phone email _id');
                res.status(200).json(projects);
            }
            catch (e) {
                res.status(404).json({
                    msg: 'Error: Projects not found ...'
                });
            }
        });
    }
    Projects.getProjectsOngoing = getProjectsOngoing;
    function getProjectsFinished(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield Project_1.default.find(
                // {"finished_at":
                //         {
                //             $gt: new Date().toLocaleDateString()
                //         }
                // }
                )
                    .populate('user', 'firstName lastName img phone email _id');
                res.status(200).json(projects);
            }
            catch (e) {
                res.status(404).json({
                    msg: 'Error: Projects not found ...'
                });
            }
        });
    }
    Projects.getProjectsFinished = getProjectsFinished;
    function getOneProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = req.query.id + '';
            const project = yield Project_1.default.findOne({ _id: candidate });
            if (project) {
                res.status(200).json(project);
            }
            else {
                res.status(404).json({
                    msg: 'Error: Project not found ...'
                });
            }
        });
    }
    Projects.getOneProject = getOneProject;
    function postProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                let token = jsonwebtoken_1.default.verify(req.headers.token, config.jwt_key);
                const project = {
                    location: req.body.location,
                    description: req.body.description,
                    initiator: req.body.initiator,
                    amount: req.body.amount,
                    started_at: req.body.started_at,
                    title: req.body.title,
                    finished_at: req.body.finished_at,
                    img: '/uploads/projects/' + req.file.filename,
                    user: token._id
                };
                yield new Project_1.default(project).save();
                res.status(201).json(project);
            }
            catch (e) {
                console.log(e);
                res.status(500).json({
                    msg: 'Error: Project not added ...'
                });
            }
        });
    }
    Projects.postProject = postProject;
    function changeProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = req.query.id + '';
            console.log(candidate);
            // @ts-ignore
            const project = yield Project_1.default.findOne({ _id: candidate });
            project.donated = +project.donated + +req.body.donat;
            project.sponsors.indexOf(req.body.user_id) < 0 ? project.sponsors.push(req.body.user_id) && ++project.sponsorsCount : null;
            project.updated_at = new Date().toLocaleDateString();
            +project.donated >= project.amount ? project.finished = true : null;
            if (project) {
                try {
                    yield Project_1.default.findByIdAndUpdate({ _id: candidate }, { $set: project }, { new: true });
                    res.status(201).json(project);
                }
                catch (e) {
                    res.status(500).json({
                        msg: 'Error: Project not changed ...'
                    });
                }
            }
            else {
                res.status(404).json({
                    msg: 'Error: Project not found ...'
                });
            }
        });
    }
    Projects.changeProject = changeProject;
    function deleteProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = req.query.id + '';
            const project = yield Project_1.default.findOne({ _id: candidate });
            if (project) {
                try {
                    yield Project_1.default.remove({ _id: candidate });
                    res.status(201).json({
                        msg: 'Project has removed successfully'
                    });
                }
                catch (e) {
                    res.status(500).json({
                        msg: 'Error: Project not removed ...'
                    });
                }
            }
            else {
                res.status(404).json({
                    msg: 'Error: Project not found ...'
                });
            }
        });
    }
    Projects.deleteProject = deleteProject;
})(Projects || (Projects = {}));
exports.default = Projects;
