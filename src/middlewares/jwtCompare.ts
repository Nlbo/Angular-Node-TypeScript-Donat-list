import {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken';
import Configs from '../configs';
import UserModel from "../models/UserModel";

const config = new Configs();
module jwtCompare {
    export function compare(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.token + '';
            let user: any = jwt.verify(token, config.jwt_key);
            if (user.exp > (new Date().getTime() + 1) / 1000) {
                next();
            } else {
                return res.status(403).json({
                    message: 'Error: session expired  !!!'
                });
            }
        } catch (e) {
            return res.status(403).json({
                msg: 'Unauthorized ...'
            })
        }
    }
}

export default jwtCompare;
