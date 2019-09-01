import {Request, Response} from 'express'
import Project from '../models/Project';
import ProjectModel from '../models/ProjectModel';
import Config from '../configs';
import JWT from 'jsonwebtoken';


const config = new Config();

module Projects {

    export async function getProjectsOngoing(req: Request, res: Response) {
        try {
            const projects = await Project.find(
                // {"started_at":
                //         {
                //             "$lt": new Date()
                //         }
                // }
                )
                .populate('user', 'firstName lastName img phone email _id');
            res.status(200).json(projects)
        } catch (e) {
            res.status(404).json({
                msg: 'Error: Projects not found ...'
            })
        }
    }

    export async function getProjectsFinished(req: Request, res: Response) {
        try {
            const projects = await Project.find(
                // {"finished_at":
                //         {
                //             $gt: new Date().toLocaleDateString()
                //         }
                // }
            )
                .populate('user', 'firstName lastName img phone email _id');
            res.status(200).json(projects)
        } catch (e) {
            res.status(404).json({
                msg: 'Error: Projects not found ...'
            })
        }
    }

    export async function getOneProject(req: Request, res: Response) {
        const candidate = req.query.id + '';
        const project = await Project.findOne({_id: candidate});
        if(project) {
                res.status(200).json(project)
            } else {
            res.status(404).json({
                msg: 'Error: Project not found ...'
            })
        }

    }

    export async function postProject(req: Request, res: Response) {
        try {
            // @ts-ignore
            let token = JWT.verify(req.headers.token, config.jwt_key);
            const project: ProjectModel = {
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
            await new Project(project).save();
            res.status(201).json(project)
        } catch (e) {
            console.log(e)
            res.status(500).json({
                msg: 'Error: Project not added ...'
            })
        }
    }

    export async function changeProject(req: Request, res: Response) {

        const candidate = req.query.id + '';
        console.log(candidate)
        // @ts-ignore
        const project: Project = await Project.findOne({_id: candidate});

        project.donated = +project.donated + +req.body.donat;
        project.sponsors.indexOf(req.body.user_id) < 0 ? project.sponsors.push(req.body.user_id) && ++project.sponsorsCount : null;
        project.updated_at = new Date().toLocaleDateString();
        +project.donated >= project.amount ? project.finished = true : null;


        if (project) {
            try {
                await Project.findByIdAndUpdate(
                    {_id: candidate},
                    {$set: project},
                    {new: true});
                res.status(201).json(project)
            } catch (e) {
                res.status(500).json({
                    msg: 'Error: Project not changed ...'
                })
            }
        } else {
            res.status(404).json({
                msg: 'Error: Project not found ...'
            })
        }

    }

    export async function deleteProject(req: Request, res: Response) {
        const candidate = req.query.id + '';
        const project = await Project.findOne({_id: candidate});

        if (project) {
            try {
                await Project.remove({_id: candidate});
                res.status(201).json({
                    msg: 'Project has removed successfully'
                })
            } catch (e) {
                res.status(500).json({
                    msg: 'Error: Project not removed ...'
                })
            }
        } else {
            res.status(404).json({
                msg: 'Error: Project not found ...'
            })
        }
    }

}

export default Projects;
