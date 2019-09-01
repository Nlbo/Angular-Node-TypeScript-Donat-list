import express, {Response, Request, NextFunction} from 'express';
import morgan from 'morgan'
import Database from './database';
import Path from 'path';
import Cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

import auth from './routes/auth';
import project from './routes/project';

class Application {
    app: express.Application;
    database = new Database();

    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
        this.database.connect();
    }

    settings(): void {
        this.app.set('port', 3000);
    }

    middlewares(): void {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(Cors());
        this.app.use('/uploads', express.static(__dirname + '/_uploads'));
        this.app.use(express.static(__dirname + '/../client/dist/client'));
        this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    }

    routes(): void {
        this.app.use('/api/auth', auth);
        this.app.use('/api/project', project);


        this.app.get('/', function (req, res) {
            res.sendFile(Path.join(__dirname + '/../client/dist/client/index.html'));
        });

        this.app.get('/*', function (req, res) {
            res.sendFile(Path.join(__dirname + '/../client/dist/client/index.html'));
        });


        this.app.use((req: Request, res: Response, next: NextFunction) => {
            const err = new Error('Not found');
            res.status(404).json({error: err.message})
        });
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            res.status(500).json({error: err.message});
        });
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server has started in ${this.app.get('port')} port ...`)
        });
    }

}

export default Application;


