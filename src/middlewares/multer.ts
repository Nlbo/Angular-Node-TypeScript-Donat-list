import {NextFunction, Request, Response} from 'express'
import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    // @ts-ignore

    destination: function (req: Request, file: any, cb: any) {
        console.log('sssssss')

        if (!fs.existsSync(__dirname + '/../_uploads')) {
            fs.mkdirSync(__dirname + '/../_uploads');
        }
        if (!fs.existsSync(__dirname + '/../_uploads/projects')) {
            fs.mkdirSync(__dirname + '/../_uploads/projects');
        }
        if (!fs.existsSync(__dirname + '/../_uploads/users')) {
            fs.mkdirSync(__dirname + '/../_uploads/users');
        }

        if(req.originalUrl.split('/')[2] === 'project' && req.method === 'POST'){
            cb(null, __dirname + '/../_uploads/projects')
        }

        if(req.originalUrl.split('/')[3] === 'register' && req.method === 'POST'){
            cb(null, __dirname + '/../_uploads/users')
        }
    },
    filename: function (req: Request, file, cb) {
        if (req.method === 'POST') {
            cb(null, new Date().getTime().toString() + file.originalname)
        }
    }
});

function fileFilter (req: Request, file: any, cb: any)  {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}



const upload = multer({
    fileFilter: fileFilter,
    storage: storage
});

export default upload;
