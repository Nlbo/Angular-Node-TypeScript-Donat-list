
export class Configs {
    port: number;
    mongoURL: string;
    jwt_key: string;
    jwt_expires: string;

    constructor() {
        this.port = 3000;
        this.mongoURL = 'mongodb://admin:admin123456@ds157459.mlab.com:57459/armboldmine';
        this.jwt_key = 'erik';
        this.jwt_expires = '3h';
    }
}
export default Configs;

