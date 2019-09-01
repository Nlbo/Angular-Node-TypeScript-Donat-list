import {Request, Response, Router} from 'express';
import Controllers from '../controllers/project';
import jwtCompare from '../middlewares/jwtCompare';
import upload from '../middlewares/multer';

const router = Router();

router.use('/', jwtCompare.compare);
router.route('/')
    .get(Controllers.getOneProject)
    .post(upload.single('image'), Controllers.postProject)
    .put(Controllers.changeProject)
    .delete(Controllers.deleteProject);

router.route('/ongoing')
    .get(Controllers.getProjectsOngoing);
router.route('/finished')
    .get(Controllers.getProjectsFinished);




export default router;
