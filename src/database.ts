import mongoose from 'mongoose';
import Configs from './configs';

class Database {
    config = new Configs();
     constructor() {}

     connect() {
         mongoose.connect(this.config.mongoURL, {useNewUrlParser: true, useCreateIndex: true})
             .then(() => {console.log('MongoDB has connected')})
             .catch(() => {console.log('Error: MongoDB has not connected')})
     }
}
export default Database;
