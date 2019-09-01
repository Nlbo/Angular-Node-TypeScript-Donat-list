import {Request, Response, Router} from 'express';
import Controllers from '../controllers/auth';
import upload from '../middlewares/multer';

const router = Router();

router.route('/register')
    .post(upload.single('image'), Controllers.register);

router.route('/login')
    .post(Controllers.login);




export default router;
