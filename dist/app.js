"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = __importDefault(require("./database"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./swagger.json"));
const auth_1 = __importDefault(require("./routes/auth"));
const project_1 = __importDefault(require("./routes/project"));
class Application {
    constructor() {
        this.database = new database_1.default();
        this.app = express_1.default();
        this.settings();
        this.middlewares();
        this.routes();
        this.database.connect();
    }
    settings() {
        this.app.set('port', 3000);
    }
    middlewares() {
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(cors_1.default());
        this.app.use('/uploads', express_1.default.static(__dirname + '/_uploads'));
        this.app.use(express_1.default.static(__dirname + '/../client/dist/client'));
        this.app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    }
    routes() {
        this.app.use('/api/auth', auth_1.default);
        this.app.use('/api/project', project_1.default);
        this.app.get('/', function (req, res) {
            res.sendFile(path_1.default.join(__dirname + '/../client/dist/client/index.html'));
        });
        this.app.get('/*', function (req, res) {
            res.sendFile(path_1.default.join(__dirname + '/../client/dist/client/index.html'));
        });
        this.app.use((req, res, next) => {
            const err = new Error('Not found');
            res.status(404).json({ error: err.message });
        });
        this.app.use((err, req, res, next) => {
            res.status(500).json({ error: err.message });
        });
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server has started in ${this.app.get('port')} port ...`);
        });
    }
}
exports.default = Application;
