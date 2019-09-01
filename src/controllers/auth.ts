import {Request, Response} from 'express'
import User from '../models/User';
import UserModel from '../models/UserModel';
import JWT from 'jsonwebtoken';
import Config from '../configs';
import Bcrypt, {genSaltSync} from 'bcryptjs'


const config = new Config();

module Auth {

    export async function login(req: Request, res: Response) {
        const candidate: any = await User.findOne({email: req.body.email});
        if (candidate) {
            const password = Bcrypt.compareSync(req.body.password, candidate.password);
            if (password) {
                const token = JWT.sign({
                        firstName: candidate.firstName,
                        lastName: candidate.lastName,
                        email: candidate.email,
                        img: candidate.img,
                        phone: candidate.phone,
                        _id: candidate._id
                    },
                    config.jwt_key, {expiresIn: config.jwt_expires}
                );
                res.status(201).json({
                    token: token,
                    user_id: candidate._id
                })
            } else {
                res.status(401).json({
                    msg: 'Error: Invalid password'
                })
            }
        } else {
            res.status(404).json({
                msg: 'Error: User not found ...'
            })
        }
    }

    export async function register(req: Request, res: Response) {
        const candidate = await User.findOne({email: req.body.email});
        if (!candidate) {
            let user: UserModel = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                password: Bcrypt.hashSync(req.body.password, genSaltSync(10))
            };
            req.file ? user.img = '/uploads/users/' + req.file.filename : null;

            try {
                await new User(user).save();
                res.status(201).json({
                    msg: 'Success: User registered successfully ...'
                })
            } catch (e) {
                res.status(500).json({
                    msg: 'Error: User nor registered ...'
                })
            }

        } else {
            res.status(401).json({
                msg: 'Error: User has already registered ...'
            })
        }

    }

}

export default Auth;
