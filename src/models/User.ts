import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    img: {
        type: String,
        default: '/uploads/users/default.jpg',
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
}, { versionKey: false });

export default model('users', UserSchema)
