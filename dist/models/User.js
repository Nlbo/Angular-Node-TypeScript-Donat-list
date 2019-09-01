"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.model('users', UserSchema);
